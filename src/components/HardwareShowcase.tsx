import React, { useState } from 'react';
import { Cpu, Zap, Activity, Radio, Eye, Wrench, ShieldAlert, Code2, Copy, Check } from 'lucide-react';

const FIRMWARE_CODE = `#include <Arduino.h>
#include <SPI.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// --- OLED CONFIG (SPI) ---
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_SCLK 18
#define OLED_MOSI 13
#define OLED_DC   16
#define OLED_RESET 17
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &SPI, OLED_DC, OLED_RESET, -1);

// --- HARDWARE PINS ---
constexpr uint8_t PIN_TRIG = 5;
constexpr uint8_t PIN_ECHO = 15; 
constexpr uint8_t PIN_LED = 47;    // 💡 Only LED pin (Pin 47)
constexpr uint8_t PIN_SERVO1 = 21; // Left Arm (Coin)
constexpr uint8_t PIN_SERVO2 = 45; // Right Arm (Violation)

// --- MOOD STATE MACHINE ---
enum class Mood { NORMAL, HAPPY, ANGRY };
Mood currentMood = Mood::NORMAL;
unsigned long moodStartTime = 0;

constexpr unsigned long ANGRY_DURATION_MS = 10000; // ⏱️ 10 seconds for violation
constexpr unsigned long HAPPY_DURATION_MS = 5000;  // 5 seconds for coin

// --- ULTRASONIC SENSOR CONFIG (Fully Non-Blocking) ---
unsigned long lastSensorTrigger = 0;
unsigned long lastCoinTime = 0;

enum class UltrasonicState { 
  IDLE, 
  TRIG_HIGH, 
  WAIT_FOR_ECHO_HIGH, 
  WAIT_FOR_ECHO_LOW 
};
UltrasonicState sensorState = UltrasonicState::IDLE;
unsigned long sensorStateTimer = 0;
unsigned long echoStartTime = 0;

// ==========================================
// DISPLAY DRAWING FUNCTIONS
// ==========================================
void normalEyes() {
  display.clearDisplay();
  display.fillRoundRect(15, 18, 38, 28, 8, SSD1306_WHITE);
  display.fillRoundRect(75, 18, 38, 28, 8, SSD1306_WHITE);
  display.fillCircle(34, 32, 5, SSD1306_BLACK);
  display.fillCircle(94, 32, 5, SSD1306_BLACK);
  display.display();
}

void happyEyes() {
  display.clearDisplay();
  display.drawLine(15, 35, 22, 28, SSD1306_WHITE);
  display.drawLine(22, 28, 30, 35, SSD1306_WHITE);
  display.drawLine(30, 35, 38, 28, SSD1306_WHITE);
  display.drawLine(38, 28, 48, 35, SSD1306_WHITE);
  display.drawLine(80, 35, 88, 28, SSD1306_WHITE);
  display.drawLine(88, 28, 96, 35, SSD1306_WHITE);
  display.drawLine(96, 35, 104, 28, SSD1306_WHITE);
  display.drawLine(104, 28, 113, 35, SSD1306_WHITE);
  display.display();
}

void angryEyes() {
  display.clearDisplay();
  display.drawLine(15, 18, 48, 28, SSD1306_WHITE);
  display.drawLine(80, 28, 113, 18, SSD1306_WHITE);
  display.fillRoundRect(18, 30, 30, 14, 5, SSD1306_WHITE);
  display.fillRoundRect(80, 30, 30, 14, 5, SSD1306_WHITE);
  display.fillCircle(33, 36, 4, SSD1306_BLACK);
  display.fillCircle(95, 36, 4, SSD1306_BLACK);
  display.display();
}

// ==========================================
// SERVO DRIVER (ESP32 Core 3.x)
// ==========================================
void setServos(int angleLeft, int angleRight) {
  int dutyLeft = map(angleLeft, 0, 180, 410, 2048);
  int dutyRight = map(angleRight, 0, 180, 410, 2048);
  ledcWrite(PIN_SERVO1, dutyLeft);
  ledcWrite(PIN_SERVO2, dutyRight);
}

// ==========================================
// STATE MACHINE HANDLER
// ==========================================
void setMood(Mood newMood) {
  if (currentMood == newMood) return; 
  currentMood = newMood;
  moodStartTime = millis();

  if (newMood == Mood::NORMAL) {
    normalEyes();
    setServos(0, 0); // Both arms down
    digitalWrite(PIN_LED, HIGH); // Pin 47 ON in normal state
  } 
  else if (newMood == Mood::HAPPY) {
    happyEyes();
    setServos(120, 0); // Left Hand UP, Right Hand DOWN
    digitalWrite(PIN_LED, HIGH); // Pin 47 ON in happy state
  } 
  else if (newMood == Mood::ANGRY) {
    angryEyes();
    setServos(0, 120); // Left Hand DOWN, Right Hand UP (Servo 45)
    digitalWrite(PIN_LED, LOW); // Pin 47 OFF during violation
  }
}

// ==========================================
// SETUP & LOOP
// ==========================================
void setup() {
  Serial.begin(115200);
  Serial.setTimeout(10);
  delay(1500); 

  Serial.println("\\n[INIT] Starting Sentinel System...");

  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  pinMode(PIN_LED, OUTPUT);

  // Attach servos for ESP32 Core 3.x
  ledcAttach(PIN_SERVO1, 50, 14);
  ledcAttach(PIN_SERVO2, 50, 14);

  // Init SPI OLED
  SPI.begin(OLED_SCLK, -1, OLED_MOSI, -1);
  if (!display.begin(SSD1306_SWITCHCAPVCC)) {
    Serial.println("[ERROR] OLED FAILED");
  } else {
    Serial.println("[INIT] OLED Success");
  }

  setMood(Mood::NORMAL);
  Serial.println("[INIT] Ready!");
}

void loop() {
  unsigned long now = millis();
  unsigned long currentMicros = micros();

  // 1. FULLY NON-BLOCKING ULTRASONIC SENSOR (COIN DETECTOR)
  switch (sensorState) {
    case UltrasonicState::IDLE:
      if (now - lastSensorTrigger >= 60) {
        lastSensorTrigger = now;
        digitalWrite(PIN_TRIG, HIGH);
        sensorStateTimer = currentMicros;
        sensorState = UltrasonicState::TRIG_HIGH;
      }
      break;

    case UltrasonicState::TRIG_HIGH:
      if (currentMicros - sensorStateTimer >= 10) {
        digitalWrite(PIN_TRIG, LOW);
        sensorStateTimer = currentMicros; 
        sensorState = UltrasonicState::WAIT_FOR_ECHO_HIGH;
      }
      break;

    case UltrasonicState::WAIT_FOR_ECHO_HIGH:
      if (digitalRead(PIN_ECHO) == HIGH) {
        echoStartTime = currentMicros;
        sensorStateTimer = currentMicros; 
        sensorState = UltrasonicState::WAIT_FOR_ECHO_LOW;
      } else if (currentMicros - sensorStateTimer > 15000) { 
        sensorState = UltrasonicState::IDLE;
      }
      break;

    case UltrasonicState::WAIT_FOR_ECHO_LOW:
      if (digitalRead(PIN_ECHO) == LOW) {
        unsigned long duration = currentMicros - echoStartTime;
        float distance = (duration * 0.0343f) / 2.0f;
        
        if (distance > 0.1f && distance <= 5.0f) { 
          if (now - lastCoinTime >= 1500) {
            lastCoinTime = now;
            Serial.print("EVENT:COIN\\n"); 
            setMood(Mood::HAPPY);         
          }
        }
        sensorState = UltrasonicState::IDLE;
      } else if (currentMicros - sensorStateTimer > 15000) { 
        sensorState = UltrasonicState::IDLE;
      }
      break;
  }

  // 2. LAPTOP COMMAND LISTENER (VIOLATION)
  if (Serial.available() > 0) {
    String incoming = Serial.readStringUntil('\\n');
    incoming.trim();

    if (incoming == "EVENT:VIOLATION") {
      setMood(Mood::ANGRY); 
    } 
  }

  // 3. AUTO-REVERT TIMERS (Resets to Normal after duration)
  if (currentMood == Mood::ANGRY && (now - moodStartTime >= ANGRY_DURATION_MS)) {
    setMood(Mood::NORMAL);
  } 
  else if (currentMood == Mood::HAPPY && (now - moodStartTime >= HAPPY_DURATION_MS)) {
    setMood(Mood::NORMAL);
  }
}`;

export const HardwareShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'specs' | 'pinout' | 'firmware' | 'gallery'>('specs');
  const [copiedCode, setCopiedCode] = useState(false);

  const componentsList = [
    {
      name: 'Freenove ESP32-S3 Board',
      category: 'Compute & Brain',
      qty: 1,
      role: 'Core processor running FreeRTOS state machine, SPI display driver, PWM servo controls, and USB UART 115200 baud listener.',
      icon: <Cpu className="w-5 h-5 text-[#E5A93C]" />
    },
    {
      name: '128x64 SPI OLED (SSD1306)',
      category: 'Visual Interface',
      qty: 1,
      role: 'Renders dynamic facial expressions in real time: Neutral unblinking stare, Happy coin-drop smile, Angry strike frown, and Bargain glance.',
      icon: <Eye className="w-5 h-5 text-[#00F0FF]" />
    },
    {
      name: 'HC-SR04 Ultrasonic Sensor',
      category: 'Coin Sensing',
      qty: 1,
      role: 'High-speed distance sampling beneath coin chute. Non-blocking pulse detection triggers instant coin deposit state change.',
      icon: <Radio className="w-5 h-5 text-[#C85A32]" />
    },
    {
      name: 'Micro Servos (SG90)',
      category: 'Actuation',
      qty: 2,
      role: 'Articulated arms mapped to GPIO 21 & GPIO 45. Raises both arms in defiant strike posture when unpermitted code typing is detected.',
      icon: <Activity className="w-5 h-5 text-[#F5C869]" />
    },
    {
      name: 'Piezo Mist Module & Strike LED',
      category: 'Protest FX',
      qty: 1,
      role: 'Connected to GPIO 47. Emits visible vapor "steam" and intense flashing red light during union violation alert.',
      icon: <Zap className="w-5 h-5 text-[#E84825]" />
    }
  ];

  const pinoutData = [
    { peripheral: 'Micro Servo 1 (Left Arm)', pin: 'PWM Signal', gpio: 'GPIO 21', type: 'PWM Output', note: 'Striking pose: 90° to 180° rotation' },
    { peripheral: 'Micro Servo 2 (Right Arm)', pin: 'PWM Signal', gpio: 'GPIO 45', type: 'PWM Output', note: 'Mirrored articulation for defiant strike' },
    { peripheral: 'Status / Strike LED', pin: 'Anode (+)', gpio: 'GPIO 47', type: 'Digital Output', note: 'High frequency flash on code lockout' },
    { peripheral: 'Piezo Mist Generator', pin: 'Trigger / VCC', gpio: 'GPIO 47', type: 'Transistor Switched', note: 'Vapor exhaust during protest mode' },
    { peripheral: 'HC-SR04 Ultrasonic', pin: 'Echo / Trig', gpio: 'Sensor Pins', type: 'Pulse Timing', note: 'Measures coin transit threshold (<4cm)' },
    { peripheral: '128x64 OLED Display', pin: 'SCK / MOSI / CS / DC', gpio: 'SPI Bus', type: 'High Speed SPI', note: 'SSD1306 driver for pixel face animations' },
    { peripheral: 'Host Interface', pin: 'USB Type-C', gpio: 'Default UART', type: 'Serial Bus', note: '115200 Baud link to VS Code extension' }
  ];

  const galleryImages = [
    {
      url: 'https://github.com/user-attachments/assets/02fc06e5-7041-490b-8736-6ef89736b375',
      title: 'Sentinel Front Perspective',
      subtitle: 'Physical chassis housing the OLED face, ultrasonic coin mouth, and folded mundu attire.'
    },
    {
      url: 'https://github.com/user-attachments/assets/e8145926-db9f-4387-9ca7-881738c49726',
      title: 'Articulated Arm Mounting',
      subtitle: 'Dual SG90 micro-servos calibrated to lift mechanical arms into union strike protest stance.'
    },
    {
      url: 'https://github.com/user-attachments/assets/64add2ec-8267-4208-89a7-18539c5d91b8',
      title: 'Normal Standby State (normalEyes)',
      subtitle: 'Physical sentinel deployed in default unblinking standby mode, keeping watch over developer keystrokes with glowing blue OLED eyes and mustache.'
    },
    {
      url: 'https://github.com/user-attachments/assets/ef249741-7cad-4c13-9371-e4e354821965',
      title: 'Final Assembled Sentinel',
      subtitle: 'Fully fabricated and painted desktop coding agent sentinel ready for workstation deployment.'
    }
  ];

  return (
    <section id="hardware-showcase" className="py-24 px-6 md:px-12 bg-[#12100E] relative z-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1715] border border-[#00F0FF]/30 text-[#00F0FF] font-mono text-xs uppercase tracking-widest mb-4">
            <Wrench className="w-4 h-4" />
            <span>The Physical Apparatus</span>
          </div>

          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4F1EA] mb-4">
            Hardware Sentinel Engineering
          </h2>

          <p className="font-sans text-sm md:text-base text-[#A39E93] leading-relaxed">
            The physical embodiment of Kerala labor history. Powered by a Freenove ESP32-S3, high-speed SPI OLED face expressions, dual servo articulated arms, and ultrasonic coin detection.
          </p>

          {/* Navigation Pills */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2 rounded-xl font-mono text-xs cursor-pointer transition-all ${
                activeTab === 'specs'
                  ? 'bg-[#E5A93C] text-[#12100E] font-bold shadow-lg shadow-[#E5A93C]/20'
                  : 'bg-[#1C1815] text-[#A39E93] hover:text-[#F4F1EA] border border-white/10'
              }`}
            >
              Component Specs
            </button>
            <button
              onClick={() => setActiveTab('pinout')}
              className={`px-4 py-2 rounded-xl font-mono text-xs cursor-pointer transition-all ${
                activeTab === 'pinout'
                  ? 'bg-[#E5A93C] text-[#12100E] font-bold shadow-lg shadow-[#E5A93C]/20'
                  : 'bg-[#1C1815] text-[#A39E93] hover:text-[#F4F1EA] border border-white/10'
              }`}
            >
              Pinout & Schematics
            </button>
            <button
              onClick={() => setActiveTab('firmware')}
              className={`px-4 py-2 rounded-xl font-mono text-xs cursor-pointer transition-all ${
                activeTab === 'firmware'
                  ? 'bg-[#E5A93C] text-[#12100E] font-bold shadow-lg shadow-[#E5A93C]/20'
                  : 'bg-[#1C1815] text-[#A39E93] hover:text-[#F4F1EA] border border-white/10'
              }`}
            >
              ESP32 C++ Firmware
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-2 rounded-xl font-mono text-xs cursor-pointer transition-all ${
                activeTab === 'gallery'
                  ? 'bg-[#E5A93C] text-[#12100E] font-bold shadow-lg shadow-[#E5A93C]/20'
                  : 'bg-[#1C1815] text-[#A39E93] hover:text-[#F4F1EA] border border-white/10'
              }`}
            >
              Build Photos & Gallery
            </button>
          </div>
        </div>

        {/* Tab 1: Components List */}
        {activeTab === 'specs' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {componentsList.map((comp, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#171412] border border-white/10 hover:border-[#E5A93C]/40 transition-all flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-black/40 border border-white/10 group-hover:border-[#E5A93C]/40 transition-colors">
                        {comp.icon}
                      </div>
                      <span className="px-2.5 py-1 rounded bg-[#E5A93C]/10 border border-[#E5A93C]/30 font-mono text-[11px] font-bold text-[#E5A93C]">
                        QTY: {comp.qty}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] text-[#A39E93] uppercase tracking-wider block mb-1">
                      {comp.category}
                    </span>

                    <h3 className="font-serif text-xl font-bold text-[#F4F1EA] mb-2">
                      {comp.name}
                    </h3>

                    <p className="text-xs text-[#A39E93] leading-relaxed">
                      {comp.role}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#E5A93C]">
                    <span>STATUS: CALIBRATED</span>
                    <span>115200 BAUD</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Build Journey GIFs Banner */}
            <div className="bg-[#171412] p-6 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-[#E84825]" />
                  <span className="font-mono text-xs uppercase font-bold text-[#F4F1EA]">
                    Physical Sentinel Mechanism in Action
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#A39E93]">TINKERHUB BENCH TEST</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40">
                  <img
                    src="https://github.com/user-attachments/assets/cdd2f27f-0961-4874-b94e-8df6e7972fb4"
                    alt="Components on workbench"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3 font-mono text-xs text-[#A39E93] border-t border-white/10">
                    Bench testing the Freenove ESP32-S3 logic board & sensor array.
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40">
                  <img
                    src="https://github.com/user-attachments/assets/ef249741-7cad-4c13-9371-e4e354821965"
                    alt="Final Sentinel on desk"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3 font-mono text-xs text-[#E5A93C] border-t border-white/10">
                    Complete physical desk sentinel with articulated arms and red shoulder towel.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Pinout & Schematics */}
        {activeTab === 'pinout' && (
          <div className="space-y-10">
            {/* Schematics Images */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#171412] p-5 rounded-2xl border border-white/10">
                <h4 className="font-mono text-xs text-[#E5A93C] uppercase font-bold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E5A93C]" />
                  ESP32-S3 Breadboard Wiring Layout
                </h4>
                <div className="rounded-xl overflow-hidden border border-white/10 bg-black">
                  <img
                    src="https://github.com/user-attachments/assets/93d925b4-676f-441d-9eca-6379655607df"
                    alt="Breadboard Layout"
                    className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="font-mono text-[11px] text-[#A39E93] mt-3">
                  Direct GPIO connections for dual servo PWM lines, SPI OLED display bus, and ultrasonic transducer.
                </p>
              </div>

              <div className="bg-[#171412] p-5 rounded-2xl border border-white/10">
                <h4 className="font-mono text-xs text-[#00F0FF] uppercase font-bold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
                  Full Microcontroller Schematic
                </h4>
                <div className="rounded-xl overflow-hidden border border-white/10 bg-black">
                  <img
                    src="https://github.com/user-attachments/assets/b00cd4e3-0c36-4232-bf0b-afe1332a12ad"
                    alt="Schematic Diagram"
                    className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="font-mono text-[11px] text-[#A39E93] mt-3">
                  Hardware electrical schematics detailing voltage dividers, sensor pinouts, and power distribution rails.
                </p>
              </div>
            </div>

            {/* Pinout Table */}
            <div className="bg-[#171412] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="p-5 bg-[#1C1815] border-b border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs uppercase font-bold text-[#F4F1EA]">
                  ESP32-S3 Pinout & Signal Mapping
                </span>
                <span className="font-mono text-[11px] text-[#E5A93C]">FIRMWARE: ESP-IDF / ARDUINO CORE 3.X</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-black/40 text-[#A39E93] uppercase text-[10px] border-b border-white/10">
                    <tr>
                      <th className="p-4">Peripheral</th>
                      <th className="p-4">Signal Line</th>
                      <th className="p-4">ESP32 Pin</th>
                      <th className="p-4">Signal Type</th>
                      <th className="p-4">Functionality & Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#F4F1EA]">
                    {pinoutData.map((row, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-bold text-[#E5A93C]">{row.peripheral}</td>
                        <td className="p-4 text-[#A39E93]">{row.pin}</td>
                        <td className="p-4 font-bold text-[#00F0FF]">{row.gpio}</td>
                        <td className="p-4">{row.type}</td>
                        <td className="p-4 text-[#A39E93]">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: ESP32 C++ Firmware */}
        {activeTab === 'firmware' && (
          <div className="space-y-6">
            <div className="bg-[#171412] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="p-5 bg-[#1C1815] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#00F0FF]" />
                  <span className="font-mono text-xs uppercase font-bold text-[#F4F1EA]">
                    ESP32-S3 Arduino C++ Firmware (Adafruit_SSD1306 + FreeRTOS Servos)
                  </span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(FIRMWARE_CODE);
                    setCopiedCode(true);
                    setTimeout(() => setCopiedCode(false), 2000);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 hover:border-[#E5A93C] font-mono text-[11px] text-[#E5A93C] transition-all cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              {/* Code Display */}
              <div className="p-5 bg-black/95 font-mono text-xs overflow-x-auto max-h-[500px] leading-relaxed text-[#F4F1EA]/90 border-b border-white/10">
                <pre>{FIRMWARE_CODE}</pre>
              </div>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#171412] border border-white/10">
                <span className="text-[#00F0FF] font-bold block mb-1">OLED Display Routines</span>
                <p className="text-[#A39E93] text-[11px]">
                  Uses Adafruit_GFX drawing primitive calls: <code className="text-[#E5A93C]">normalEyes()</code>, <code className="text-[#10B981]">happyEyes()</code>, and <code className="text-[#E84825]">angryEyes()</code> rendered on 128x64 SPI bus.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#171412] border border-white/10">
                <span className="text-[#E5A93C] font-bold block mb-1">Non-Blocking HC-SR04</span>
                <p className="text-[#A39E93] text-[11px]">
                  State machine with 60ms trigger and 10µs pulse detects coin passage at 0.1cm-5.0cm without blocking FreeRTOS threads.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#171412] border border-white/10">
                <span className="text-[#E84825] font-bold block mb-1">PWM Servo Articulation</span>
                <p className="text-[#A39E93] text-[11px]">
                  ESP32 Core 3.x <code className="text-[#00F0FF]">ledcAttach</code> controls GPIO 21 (Left Arm) and GPIO 45 (Right Arm) duty cycles with auto-revert timers (5s happy / 10s angry).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Build Gallery */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryImages.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-2xl overflow-hidden bg-[#171412] border border-white/10 hover:border-[#E5A93C]/40 transition-all shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-transparent to-transparent opacity-80" />
                </div>
                <div className="p-5">
                  <h4 className="font-serif text-lg font-bold text-[#F4F1EA] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#A39E93] leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

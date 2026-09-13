# NOKKUKOOLI 🚩🤖
### The Satirical AI Coding-Agent Sentinel & Watching Wages Enforcer
**TinkerHub Useless Projects 3.0**

![Event](https://img.shields.io/badge/Built_during-Useless_Projects_3.0_by_TinkerHub-E5A93C)
[![Live Site](https://img.shields.io/badge/Live_Site-nokkukooli--live.vercel.app-00F0FF?style=flat&logo=vercel)](https://nokkukooli-live.vercel.app/)
[![ESP32-S3](https://img.shields.io/badge/Microcontroller-ESP32--S3-red)](https://www.espressif.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

<div align="center">
  <img width="1280" height="640" alt="NOKKUKOOLI Banner" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />
  <p><em>"Pay the agent for watching you work, not for doing the work."</em></p>
</div>

---

## 📌 Basic Details

### Team Name: **Union leader**

### Team Members
- **Team Lead:** **Alen Elias Cherian** — *Cochin University College of Engineering Kuttanad (CUCEK)*
- **Member 2:** **Amith Biju** — *Cochin University College of Engineering Kuttanad (CUCEK)*

---

<div align="center">
  <img width="857" height="488" alt="NOKKUKOOLI Sentinel Visual" src="https://github.com/user-attachments/assets/d83026b7-1d0a-44f9-a72e-cf4786e0c7a2" />
</div>

## 💡 Project Description

**NOKKUKOOLI** is a satirical hardware-and-software apparatus inspired by the notorious Kerala concept of **“നോക്കുകൂലി”** (*looking-on charges* or *gawking wages*), transplanted into the 2026 AI developer era.

**NOKKUKOOLI** turns this idea into a ridiculous desktop coding-agent experience: **you pay the agent for watching you work, not for doing the work.**

Instead of a union worker standing by and demanding payment, NOKKUKOOLI uses a **desktop robotic sentinel representing your coding agent**. The sentinel demands **കൂലി (kooli)** simply for allowing you to work:

* **🪙 Drop a coin →** The sentinel becomes happy, lowers its arms, and allows you to continue coding.
* **⚠️ Don't pay →** It enters Angry / Strike Mode, raises its articulated arms, sounds the alarm, and locks down your editor.
* **🤝 Try to bargain →** You can negotiate with the sentinel via **Comrade Conciliator (Gemini AI)** to reduce the demanded amount!

The result is an intentionally ridiculous combination of **AI, physical robotics, and Kerala's Nokkukooli satire**—a coding agent that gets paid for simply watching you code while doing none of the heavy lifting.

---

### The Problem (that doesn't exist)
Modern coding agents are designed to do the work for developers, but nobody has built one that demands payment for simply watching them work.

**Inspired by Kerala's satirical concept of നോക്കുകൂലി (Nokkukooli),** the challenge is to create a playful desktop system where a coding-agent sentinel demands kooli before allowing the developer to continue working. If the payment is skipped, the sentinel becomes angry and demands its due—while giving the developer the opportunity to bargain and negotiate the kooli.

> **The problem:** How can we turn the absurd idea of paying an agent simply for watching you code into an interactive hardware-and-software experience?

### The Solution (that nobody asked for)
A desktop toy that acts as the coding agent's Nokkukooli representative. It collects the agent's കൂലി (kooli) through a physical coin drop and reacts to whether you pay:

* **Pay the kooli** → The sentinel becomes happy and lets you work.
* **Don't pay** → It becomes angry, raises its arms, and demands payment.
* **Try to bargain** → Negotiate with the sentinel to reduce the kooli and get back to work.

It's an unnecessarily physical way of turning നോക്കുകൂലി into a hilarious interaction between you and your coding agent.

---

## 🛠️ Technical Details

### Technologies & Components Used

#### Software Stack
- **Languages:** C++, Arduino, TypeScript, JavaScript, Python (Host-side serial listener)
- **Frameworks & Runtimes:** Node.js, VS Code Extension API, ESP32 Core 3.x / Arduino IDE / PlatformIO
- **Libraries:** Adafruit GFX, Adafruit SSD1306, SPI, Framer Motion, Tailwind CSS
- **AI & Cloud Services:**
  - **Google Gemini API:** *Comrade Conciliator* (Malayalam / English bargaining engine)
  - **GitHub Copilot / vscode.lm:** Proletarian Code Generation
- **Dev Tools:** Git, VS Code, ESP-IDF / PlatformIO

#### Hardware Bill of Materials (BOM)
| Component | Specification | Quantity | Role |
| :--- | :--- | :---: | :--- |
| **Microcontroller** | Freenove ESP32-S3 Board | 1 | Brain, UART serial host, PWM servo control, OLED SPI driver |
| **Display** | 128x64 SPI OLED Display (SSD1306) | 1 | Real-time dynamic facial expressions (Neutral, Angry, Happy, Bargain) |
| **Distance Sensor** | HC-SR04 Ultrasonic Sensor | 1 | Physical coin-drop detection |
| **Actuators** | Micro Servo Motors (SG90) | 2 | Articulated arms (raise in protest / lower upon payment) |
| **Indicators / FX** | Piezo Mist Generator / Status LED | 1 | Strike steam effect / Red violation indicator (GPIO 47) |

---

## 🏗️ System Architecture

```mermaid
flowchart TB

    subgraph Client["VS Code Extension Host - TypeScript (Kammi AI Extension)"]
        direction TB

        subgraph EditorIntercept["Keystroke Interception & Policy Engine"]
            direction TB
            TYPE["Type Command Override"]
            PASTE["Paste Command Override"]
            STATE["Permit State Machine"]
        end

        subgraph UILayer["User Interfaces"]
            direction TB
            MODAL["Constructivist Strike Modal<br/>Webview Audio and Bribe Ledger"]
            SIDEBAR["Soviet Sidebar<br/>Port Selector and Agent Dispatch"]
        end

        subgraph CoreServices["Background Services"]
            direction TB
            AGENT["AgentService<br/>vscode.lm / Copilot"]
            CONCIL["ConciliatorService<br/>Gemini API"]
            SERIAL["SerialManager<br/>115200 Baud UART"]
        end
    end

    subgraph CloudAI["Cloud AI Infrastructure"]
        direction TB
        GEMINI["Google Gemini API<br/>Comrade Conciliator"]
        COPILOT["GitHub Copilot LLM<br/>Proletarian Code Generation"]
    end

    subgraph HardwareSentinel["Physical ESP32-S3 Desk Sentinel"]
        direction TB
        MCU["ESP32-S3 Microcontroller"]
        HCSR04["HC-SR04 Ultrasonic Sensor<br/>Coin Detection"]
        LED["Status / Violation LED<br/>GPIO 47"]
        SERVO1["Micro Servo 1 - Left Arm<br/>GPIO 21"]
        SERVO2["Micro Servo 2 - Right Arm<br/>GPIO 45"]
        OLED["SPI OLED Display<br/>SSD1306"]
    end

    USER(["Developer"]) -->|Typing / Paste| TYPE
    USER -->|Typing / Paste| PASTE

    TYPE -->|Check Locked State| STATE
    PASTE -->|Check Locked State| STATE

    STATE -->|Locked - Block Input| MODAL
    STATE -->|Violation| SERIAL

    USER -->|Voice Plea| MODAL
    MODAL -->|Audio / Text Plea| CONCIL
    CONCIL -->|Negotiate Kooli| GEMINI
    CONCIL -->|Return Ruling| MODAL

    USER -->|Commission Agent| SIDEBAR
    SIDEBAR -->|Coding Prompt| AGENT
    AGENT -->|Generate Code| COPILOT

    SERIAL <-->|USB Serial - 115200 Baud| MCU

    HCSR04 -->|Coin Detected| MCU
    MCU -->|EVENT:COIN| SERIAL
    SERIAL -->|Update Kooli Balance| STATE

    MCU -->|LED Control| LED
    MCU -->|PWM Control| SERVO1
    MCU -->|PWM Control| SERVO2
    MCU -->|Display Expression| OLED
```

---

## ⚡ Circuit Schematic & Wiring Connections

<div align="center">
  <img width="682" height="491" alt="Circuit Breadboard Layout" src="https://github.com/user-attachments/assets/93d925b4-676f-441d-9eca-6379655607df" />
  <p><em>Freenove ESP32-S3 Microcontroller Pinout and Breadboard Wiring</em></p>
</div>

<div align="center">
  <img width="1060" height="500" alt="Detailed Schematic Diagram" src="https://github.com/user-attachments/assets/b00cd4e3-0c36-4232-bf0b-afe1332a12ad" />
  <p><em>Complete Hardware Schematic: Pinout layout of the ESP32-S3 and interconnected sensors/actuators</em></p>
</div>

### Pin Connection Summary
| Peripheral | Pin / Line | ESP32-S3 GPIO | Function |
| :--- | :--- | :---: | :--- |
| **Left Arm Servo** | PWM Signal | `GPIO 21` | Raise/lower left arm on strike |
| **Right Arm Servo** | PWM Signal | `GPIO 45` | Raise/lower right arm on strike |
| **Status / Strike LED** | Anode (+) | `GPIO 47` | Flashes during strike violation |
| **Piezo Mist Module** | Control Signal | `GPIO 47` | Emits steam/mist during protest |
| **HC-SR04 Sensor** | Trigger / Echo | Configured GPIOs | Measures coin clearance distance |
| **128x64 OLED Display** | SPI Interface | SCK / MOSI / CS / DC / RST | Renders dynamic expressions |
| **Host Communication** | USB UART | Default UART | 115200 Baud serial communication |

---

## 🖥️ VS Code Extension: Kammi AI Extension

The companion VS Code extension acts as the digital union enforcer on localhost:

1. **Keystroke Interceptor:** Intercepts every keystroke in active text editors. If the Kooli permit has expired, your input is locked!
2. **Constructivist Strike Modal:** Pops up an unclosable warning demanding tribute.
3. **Bargaining with Comrade Conciliator:** Developers can speak or type pleas to Gemini AI to reduce their dues.

<div align="center">
  <img width="1533" height="817" alt="VS Code Extension in Action" src="https://github.com/user-attachments/assets/4f4dc750-c2b9-4ff5-97d9-5f0ae741ed3c" />
  <p><em>Constructivist Strike Modal locking the editor until tribute is rendered</em></p>
</div>

<div align="center">
  <img width="718" height="302" alt="Soviet Sidebar Port Selector" src="https://github.com/user-attachments/assets/e2f96f5b-e310-411c-adea-d78f424e93f4" />
  <p><em>Soviet Sidebar: COM Port Selector and Agent Dispatch</em></p>
</div>

---

## 🤖 Physical Toy & Build Gallery

<table align="center">
  <tr>
    <td><img width="400" alt="Sentinel Front View" src="https://github.com/user-attachments/assets/02fc06e5-7041-490b-8736-6ef89736b375" /></td>
    <td><img width="400" alt="Sentinel Arm Assembly" src="https://github.com/user-attachments/assets/e8145926-db9f-4387-9ca7-881738c49726" /></td>
  </tr>
  <tr>
    <td><img width="400" alt="Sentinel Normal Standby State" src="https://github.com/user-attachments/assets/64add2ec-8267-4208-89a7-18539c5d91b8" /></td>
    <td><img width="400" alt="Sentinel Side Profile" src="https://github.com/user-attachments/assets/8cdcc844-1259-4575-9291-8171a450e21d" /></td>
  </tr>
</table>

### Build Journey & Electronics Assembly
<div align="center">
  <img width="396" height="520" alt="Chassis Assembly" src="https://github.com/user-attachments/assets/7d162d0e-011b-4206-9d91-78dc20768a69" />
  <img width="406" height="550" alt="Wiring Bench" src="https://github.com/user-attachments/assets/85adead1-e89b-4450-97e5-671e247557f4" />
</div>

<div align="center">
  <img width="987" height="557" alt="Components Laid Out" src="https://github.com/user-attachments/assets/cdd2f27f-0961-4874-b94e-8df6e7972fb4" />
  <p><em>Electronic components bench testing</em></p>
</div>

### Final Build
<div align="center">
  <img width="697" height="527" alt="Final Assembled Sentinel" src="https://github.com/user-attachments/assets/ef249741-7cad-4c13-9371-e4e354821965" />
</div>

---

## 🎬 Working Demos & Video Journey

### Working Demo 1
![NOKKUKOOLI Build Journey](ezgif.com-video-to-gif-converter_1.gif)

### Working Demo 2
![NOKKUKOOLI Build Journey](working_demo_2-ezgif.com-video-to-gif-converter.gif)

- 📁 **Build Journey Video Folder:** [Google Drive Link](https://drive.google.com/drive/folders/10kj9D-wRr1ZJJ6Q2odVD12QUhY3tBbYD?usp=sharing)
- 🎥 **Full Project Demo Video:** [Google Drive Link](https://drive.google.com/drive/folders/1n8Yt4mt-epqzKZ2gL3_OR2DlSLlJ87M2?usp=sharing)
- 🌐 **Interactive Documentation Website:** [nokkukooli-live.vercel.app](https://nokkukooli-live.vercel.app/)

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v18+ & npm
- VS Code (for running the Extension Development Host)
- Arduino IDE with ESP32 Board package OR PlatformIO / ESP-IDF
- ESP32-S3 Microcontroller connected via USB-C

### 1. Firmware Setup
1. Open the `firmware/` directory in Arduino IDE or PlatformIO.
2. Select board: **ESP32S3 Dev Module**.
3. Install required libraries:
   - `Adafruit GFX Library`
   - `Adafruit SSD1306`
4. Flash the code to the ESP32-S3.

### 2. VS Code Extension Setup
1. Navigate to the `extension/` folder:
   ```bash
   cd extension
   npm install
   npm run compile
   ```
2. Configure API keys in `.env.local`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
3. Press **`F5`** in VS Code to launch the **Extension Development Host**.
4. In the Soviet Sidebar, select your ESP32-S3 COM/Serial Port at **115200 baud**.
5. Start coding! Pay your kooli via coin drop to avoid strikes.

---

## 👥 Team Contributions

- **Amith Biju:** Software architecture, state machine logic, keystroke interception engine, non-blocking sensor integration, Gemini AI negotiation pipelines, and serial interface.  
  [![GitHub](https://img.shields.io/badge/GitHub-amith--exe-181717?style=flat&logo=github)](https://github.com/amith-exe)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-Amith%20Biju-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/amith-biju-a70813327/)

- **Alen Elias Cherian:** Hardware assembly, circuit schematics, physical chassis construction, 3D printing, servo calibration, and OLED facial animation programming.  
  [![GitHub](https://img.shields.io/badge/GitHub-alenelias123-181717?style=flat&logo=github)](https://github.com/alenelias123)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-Alen%20Elias-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/alen-elias-bb3812327/)

---

<div align="center">
  <p>Built during <strong>Useless Projects 3.0 by TinkerHub</strong></p>
</div>

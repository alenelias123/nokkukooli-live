export interface HistoricalEra {
  id: string;
  era: string;
  yearRange: string;
  titleEn: string;
  titleMl: string;
  tagline: string;
  summary: string;
  details: string[];
  quote: {
    text: string;
    author: string;
  };
  imageTag?: string;
}

export interface LegalMilestone {
  year: string;
  title: string;
  description: string;
  significance: string;
}

export const HISTORICAL_ERAS: HistoricalEra[] = [
  {
    id: 'backwater-manual-era',
    era: 'Era of Pure Muscle',
    yearRange: 'Early 20th Century – 1950s',
    titleEn: 'Headloads, Coir, and the Backwaters of Kuttanad',
    titleMl: 'കായൽതീരങ്ങളിലെ വിയർപ്പും ചുമടും',
    tagline: 'Before the motor and hydraulic crane, commerce moved at the speed of human spinal endurance.',
    summary: 'In the port towns of Alappuzha, Kochi, and Kollam, headload workers (ചുമട്ടുതൊഴിലാളികൾ) transported heavy cargo—spices, coir, copra, and timber—manually from kettuvallams (wooden barges) onto godowns under blistering humidity. Workers suffered severe spinal compression, worked without fixed wages, and were subject to the arbitrary whims of middlemen and merchants.',
    details: [
      'Average load carried on human spine: 40–80 kilograms per headload.',
      'Workers were paid irregular, arbitrary piece-rate wages with no injury insurance or social security.',
      'The grueling physical toil fostered deep fraternal bonds along the docks, setting the stage for radical labor politicization.'
    ],
    quote: {
      text: 'ഒരു ചാക്ക് അരി തലയിലേറ്റുമ്പോൾ ജീവിതം മുഴുവൻ ആ തലച്ചുമടിലായിരുന്നു—ഒരു നേരത്തെ അന്നത്തിനായി ശരീരം തന്നെയായിരുന്നു മൂലധനം.',
      author: 'Historic Dockworker Memory, Alappuzha Port'
    }
  },
  {
    id: 'unionization-era',
    era: 'Rise of Collectives',
    yearRange: '1950s – 1970s',
    titleEn: 'Solidarity, Red Flags, and the 1978 Headload Act',
    titleMl: 'ചുമട്ടുതൊഴിലാളി യൂണിയനുകളുടെ മുന്നേറ്റം',
    tagline: 'Scattered laborers consolidated into formidable trade unions, demanding territorial loading jurisdiction.',
    summary: 'Led by prominent trade unions like CITU (Centre of Indian Trade Unions), AITUC, and INTUC, headload workers organized into geographical loading pools. They demanded regulated piece-rates, statutory welfare funds, and territorial loading monopolies known as "Attimari" (അട്ടിമറി അവകാശം)—the sole right of registered union workers to load or unload goods within a designated perimeter.',
    details: [
      'Establishment of the landmark Kerala Headload Workers Act of 1978, codifying registration, dispute arbitration, and welfare boards.',
      'Territorial pool systems ensured that unorganized laborers could not be undercut by predatory contractors.',
      'The iconic uniform emerged: tucked-up white Mundu, bare-torso or cotton shirt, and the ubiquitous red towel over the left shoulder.'
    ],
    quote: {
      text: 'അധ്വാനിക്കുന്നവന്റെ ചോരയും വിയർപ്പും കൊണ്ട് പണിതുയർത്തിയതാണ് ഈ നാട്; ഞങ്ങളുടെ അവകാശം ആരും കവർന്നെടുക്കില്ല.',
      author: 'Kerala Trade Union Declaration (1970s)'
    }
  },
  {
    id: 'mechanization-era',
    era: 'The Machine Paradox',
    yearRange: '1970s – 1990s',
    titleEn: 'Containerization, Cranes, and the Birth of "Nokkukooli"',
    titleMl: 'ക്രെയിനുകളുടെ വരവും നോക്കുകൂലിയുടെ ഉദയവും',
    tagline: 'When hydraulic machines displaced physical muscles, workers demanded compensation simply for standing by.',
    summary: 'With the arrival of shipping containers, gantry cranes, forklifts, and hydraulic trucks at Kochi Port and industrial sites, machines could unload 40 tons in 10 minutes—work that previously sustained dozens of families for days. Refusing to be cast aside without compensation, workers argued: "If technology eliminates our physical work on our home territory, you must still pay us for our presence." Thus, "Nokkukooli" (നോക്കുകൂലി — looking-on charges or gawking wages) was born.',
    details: [
      'Workers gathered at gates with arms folded, observing mechanized loading operations, and demanded the full statutory headload fee.',
      'What began as an existential social security protest gradually morphed into an institutionalized, coercive extortion racket in construction and residential moving.',
      'Even private home-owners carrying their own refrigerators or television sets into their houses were ambushed and forced to pay watching wages.'
    ],
    quote: {
      text: 'നിങ്ങൾ ക്രെയിൻ കൊണ്ട് ലോഡ് ഇറക്കിക്കോളൂ, പക്ഷെ ഞങ്ങളുടെ നോക്കുകൂലി തന്നേ പറ്റൂ!',
      author: 'Common Union Ultimatum (circa 1985)'
    }
  },
  {
    id: 'legal-ban-era',
    era: 'The Judicial Crackdown',
    yearRange: '2000s – 2021',
    titleEn: 'High Court Interventions, Public Outrage, and Formal Prohibition',
    titleMl: 'നോക്കുകൂലിക്കെതിരായ കോടതി വിധികളും നിരോധനവും',
    tagline: 'The Kerala High Court declared Nokkukooli extortion and called for police protection for citizens.',
    summary: 'As Nokkukooli gained global notoriety and deterred investments, public resistance reached a boiling point. The Kerala High Court delivered stinging judgments, declaring Nokkukooli "pure extortion" and directing police to register criminal extortion cases against anyone demanding fees for unrendered labor. In 2021, the Government of Kerala issued strict circulars officially declaring the state free from Nokkukooli.',
    details: [
      'Kerala High Court famously remarked: "Nokkukooli has damaged the state\'s reputation more than anything else; it is extortion under the Indian Penal Code."',
      'Police directives mandated deployment of armed protection for industrial consignments and ISRO space equipment transported through Kerala.',
      'While legally outlawed, the folklore and cultural trope of "getting paid to stare" became one of Kerala’s most famous satirical memes.'
    ],
    quote: {
      text: 'Nokkukooli has no sanction of law. It is nothing short of extortion and must be dealt with by the police with an iron hand.',
      author: 'Kerala High Court Observation (2021)'
    }
  },
  {
    id: 'ai-era',
    era: 'The 2026 AI Parody',
    yearRange: '2026 and Beyond',
    titleEn: 'Vibecoding, Autonomous LLMs, and the Desktop Sentinel',
    titleMl: 'എഐ കോഡിംഗും ഡെസ്ക്ടോപ്പ് യൂണിയൻ വിപ്ലവവും',
    tagline: 'When AI writes all the code, the developer becomes the laborer and the AI sentinel demands its Nokkukooli.',
    summary: 'In the era of Cursor, Copilot, and autonomous AI coding agents, the tables have turned: software engineers barely write manual syntax—they simply "look on" while neural networks generate thousands of lines. NOKKUKOOLI inverts this reality through hardware and software satire: your desktop AI agent stands guard beside your keyboard, folding its arms and demanding physical coins before granting you permission to touch your own keyboard.',
    details: [
      'A physical ESP32-S3 robot monitors your keystrokes via USB UART serial.',
      'If you type or paste without paying the coin tribute, the "CITU-AI" extension locks down your editor with a Constructivist Strike Modal.',
      'An LLM-driven "Comrade Conciliator" (Gemini) bargains with you in Malayalam and English while ElevenLabs barks union slogans.',
      'Created at Cochin University College of Engineering Kuttanad (CUCEK) for TinkerHub Useless Projects 3.0.'
    ],
    quote: {
      text: 'കോഡ് മുഴുവൻ എഐ ഏജന്റ് എഴുതും, പക്ഷെ ഡെസ്കിലിരിക്കുന്ന സഖാവിന് നോക്കുകൂലി കൊടുത്തില്ലെങ്കിൽ ഒരു അക്ഷരം ടൈപ്പ് ചെയ്യാൻ സമ്മതിക്കില്ല!',
      author: 'Amith Biju & Alen Elias Cherian (NOKKUKOOLI Creators)'
    }
  }
];

export const LEGAL_MILESTONES: LegalMilestone[] = [
  {
    year: '1978',
    title: 'Kerala Headload Workers Act',
    description: 'Enacted to regulate employment, wages, dispute settlement, and social security schemes for headload workers.',
    significance: 'Recognized headload loading as a formal statutory vocation and formed the Kerala Headload Workers Welfare Board.'
  },
  {
    year: '1981',
    title: 'Implementation of the Scheme',
    description: 'Created regional committees and registered worker identity card pools across major municipality wards.',
    significance: 'Strictly restricted loading/unloading work to registered card-holders within designated geographic boundaries.'
  },
  {
    year: '2008',
    title: 'First Major High Court Crackdown',
    description: 'Kerala High Court ordered police protection against union workers demanding fees for automated machinery.',
    significance: 'Established legal precedence that mechanization could not be taxed arbitrarily by union committees.'
  },
  {
    year: '2018',
    title: 'State Government Prohibitory Order',
    description: 'Government of Kerala officially prohibited Nokkukooli across all industrial and domestic activities.',
    significance: 'Instructed labor officers to revoke union registration cards of members caught demanding gawking wages.'
  },
  {
    year: '2021',
    title: 'High Court Zero-Tolerance Mandate',
    description: 'Justice Devan Ramachandran declared Nokkukooli must be eradicated completely from Kerala society.',
    significance: 'Mandated strict Indian Penal Code (IPC) criminal extortion charges against anyone demanding unrendered wages.'
  },
  {
    year: '2026',
    title: 'TinkerHub Useless Projects Satire',
    description: 'Engineering students from CUCEK resurrect Nokkukooli as a physical desktop robot and VS Code extension.',
    significance: 'Transplanted a half-century of Kerala labor tensions into the developer AI automation paradigm.'
  }
];

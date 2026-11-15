import React, { useState, useEffect } from 'react';
import { generateDirectorDeck } from './utils/directorDeck';
import { 
  Film, Sparkles, Clapperboard, Camera, BookOpen, Layers, 
  Download, Play, RefreshCw, CheckCircle2, ChevronRight, Eye, 
  Sliders, Video, Mic, Compass, Zap, UserCheck, ShieldAlert, ArrowUpRight
} from 'lucide-react';

// Sample pre-configured cinematic blueprints for instant demo exploration
const SAMPLE_BLUEPRINTS = {
  clockmaker: {
    title: "The Temporal Chronometer",
    logline: "A burnt-out clockmaker discovers a pocket watch that reverses time by 10 seconds, but every use ages him by a day.",
    genre: "Sci-Fi Thriller",
    style: "Cinematic 35mm Dark Noir",
    pace: "Slow Burn",
    loglineShort: "A burnt-out clockmaker discovers a time-reversing watch...",
    characters: [
      {
        name: "Elias Vance",
        role: "Protagonist (Clockmaker)",
        age: "58 (Chronologically)",
        archetype: "Obsessive Artisan",
        traits: "Weary eyes, brass-stained fingers, hunched composure, ticking pocket watch attached to silver chain.",
        arc: "Trades remaining lifespan for tiny moments of un-doing past mistakes.",
        avatarBg: "from-amber-900/40 to-yellow-950/60",
        accent: "border-amber-500/40"
      },
      {
        name: "Clara Vance",
        role: "Memory / Deceased Daughter",
        age: "12 (In memories)",
        archetype: "The Catalyzing Ghost",
        traits: "Ethereal backlight, vibrant red coat standing out against muted grey monochrome world.",
        arc: "The anchor locking Elias in his unending temporal spiral.",
        avatarBg: "from-rose-900/40 to-red-950/60",
        accent: "border-rose-500/40"
      }
    ],
    scenes: [
      {
        id: 1,
        slug: "INT. ELIAS'S WORKSHOP - NIGHT",
        summary: "Rain hammers the fogged glass. Ticking clocks create a rhythmic frenzy.",
        mood: "Claustrophobic & Atmospheric",
        script: [
          { type: "action", text: "Dust motes dance in the harsh amber light of a desk lamp. ELIAS VANCE (50s) crouches over an ornate brass pocket watch with triple gear balance." },
          { type: "character", text: "ELIAS" },
          { type: "parenthetical", text: "(whispering to the gearwork)" },
          { type: "dialogue", text: "Just ten seconds back. Just enough to fix the spring..." },
          { type: "action", text: "He depresses the crown button. A heavy LOW FREQUENCY HUM resonates. The ticking STOPS." },
          { type: "action", text: "A droplet of rain falling outside the window STOPS mid-air and slowly moves UPWARD." },
          { type: "character", text: "ELIAS" },
          { type: "parenthetical", text: "(gasping, clutches his heart)" },
          { type: "dialogue", text: "It... it actually rewound." }
        ]
      },
      {
        id: 2,
        slug: "EXT. COBBLESTONE ALLEY - RAIN - NIGHT",
        summary: "Elias tests the device in the cold city street with unexpected consequences.",
        mood: "High Voltage & Tense",
        script: [
          { type: "action", text: "Elias stumbles out into the neon-slicked alleyway. He looks at his reflection in a rainwater puddle." },
          { type: "action", text: "A new patch of stark white hair spreads across his temple. His skin shows deeper wrinkles." },
          { type: "character", text: "ELIAS" },
          { type: "dialogue", text: "The toll isn't paid in time... it's paid in life." }
        ]
      }
    ],
    shots: [
      {
        id: "SHOT-101",
        scene: "INT. WORKSHOP - NIGHT",
        type: "Macro / Extreme Close-Up",
        lens: "90mm Tilt-Shift",
        movement: "Static / Micro-drift",
        lighting: "Warm Tungsten Key (3200K), Harsh Shadow Ratio 4:1",
        audio: "Exaggerated mechanical ticking, heartbeat sub-bass pulses",
        description: "Focus on brass clockwork gears as tweezers lower micro-spring into place."
      },
      {
        id: "SHOT-102",
        scene: "INT. WORKSHOP - NIGHT",
        type: "Low-Angle Dutch Angle",
        lens: "24mm Ultra-Wide",
        movement: "Slow Track In",
        lighting: "High Contrast Emerald & Amber Neon Spill",
        audio: "Temporal distortion warp sound effect, sudden silent vacuum",
        description: "Elias pushes crown button. Frame tilts sideways to indicate temporal instability."
      },
      {
        id: "SHOT-103",
        scene: "EXT. ALLEYWAY - NIGHT",
        type: "Medium Tracking Shot",
        lens: "50mm Anamorphic",
        movement: "Steadicam Follow",
        lighting: "Cold Cyan Neon Rim Light with Wet Puddle Reflections",
        audio: "Heavy rain patter, echoey footsteps, breathing heavy",
        description: "Elias walks backward as time reverses around him. Raindrops rise into clouds."
      },
      {
        id: "SHOT-104",
        scene: "EXT. ALLEYWAY - NIGHT",
        type: "Over-the-Shoulder Close-Up",
        lens: "85mm Prime f/1.4",
        movement: "Push-In Zoom",
        lighting: "Soft Sodium Vapour Streetlamp Diffused",
        audio: "High pitched ringing noise building up",
        description: "Reflection in puddle showing instant physical aging on Elias's face."
      }
    ],
    storyboard: [
      {
        id: "SB-01",
        shotId: "SHOT-101",
        title: "The Heart of the Chronometer",
        camera: "Macro 90mm | Eye Level",
        prompt: "Extreme close up film screenshot, intricate brass clock movement gears, glowing chronometer spring, macro photography, 35mm grain, dark moody atmospheric cinematic lighting --ar 16:9",
        visualStyle: "Vintage Sci-Fi Amber",
        sketchColor: "#d97706"
      },
      {
        id: "SB-02",
        shotId: "SHOT-102",
        title: "Temporal Rupture Trigger",
        camera: "24mm Wide | Dutch Tilt",
        prompt: "Cinematic low angle wide shot of old clockmaker pressing silver watch crown in dark cluttered workshop, neon light distortion effect, time warp lens flare, 8k movie freeze-frame --ar 16:9",
        visualStyle: "High-contrast Neo-Noir",
        sketchColor: "#06b6d4"
      },
      {
        id: "SB-03",
        shotId: "SHOT-103",
        title: "Reversed Rainfall",
        camera: "50mm Anamorphic | Track",
        prompt: "Cinematic wide shot, elderly man standing in wet alleyway at night, raindrops suspended in air glowing under blue neon signage, anamorphic streak lens flare --ar 16:9",
        visualStyle: "Cyberpunk Rain",
        sketchColor: "#8b5cf6"
      },
      {
        id: "SB-04",
        shotId: "SHOT-104",
        title: "The Mortality Reflection",
        camera: "85mm Prime | OTS",
        prompt: "Over the shoulder close up of old man looking down at water puddle reflection, seeing himself aging rapidly, moody cinematic lighting, shallow depth of field --ar 16:9",
        visualStyle: "Dark Psychological",
        sketchColor: "#ec4899"
      }
    ]
  }
};
// IndexedDB storage for generated storyboard images
const openStoryboardDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('FrameForgeDB', 1);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains('storyboardImages')) {
        db.createObjectStore('storyboardImages');
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const saveStoryboardImages = async (images) => {
  const db = await openStoryboardDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction('storyboardImages', 'readwrite');

    transaction.objectStore('storyboardImages').put(images, 'allImages');

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
};

const loadStoryboardImages = async () => {
  const db = await openStoryboardDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction('storyboardImages', 'readonly');
    const request = transaction.objectStore('storyboardImages').get('allImages');

    request.onsuccess = () => {
      db.close();
      resolve(request.result || {});
    };

    request.onerror = () => {
      db.close();
      reject(request.error);
    };
  });
};
export default function App() {
  // Input State
  const [logline, setLogline] = useState(SAMPLE_BLUEPRINTS.clockmaker.logline);
  const [genre, setGenre] = useState("Sci-Fi Thriller");
  const [visualStyle, setVisualStyle] = useState("Cinematic 35mm Dark Noir");
  const [pace, setPace] = useState("Slow Burn Drama");
  
  // Generation & Active View State
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [genStep, setGenStep] = useState("");
  const [activeTab, setActiveTab] = useState("script"); // script, shotlist, storyboard, bible
  const [currentBlueprint, setCurrentBlueprint] = useState(SAMPLE_BLUEPRINTS.clockmaker);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedShotForModal, setSelectedShotForModal] = useState(null);
  // AI Storyboard Image Generation
const [storyboardImages, setStoryboardImages] = useState({});
const [generatingImages, setGeneratingImages] = useState({});
const [imageErrors, setImageErrors] = useState({});
const [imagesLoaded, setImagesLoaded] = useState(false);

// Restore storyboard images when the app opens
useEffect(() => {
  let cancelled = false;

  loadStoryboardImages()
    .then((images) => {
      if (!cancelled) {
        setStoryboardImages(images);
        setImagesLoaded(true);
      }
    })
    .catch((error) => {
      console.error('Could not load storyboard images:', error);
      if (!cancelled) setImagesLoaded(true);
    });

  return () => {
    cancelled = true;
  };
}, []);

// Save storyboard images whenever they change
useEffect(() => {
  if (!imagesLoaded) return;

  saveStoryboardImages(storyboardImages).catch((error) => {
    console.error('Could not save storyboard images:', error);
  });
}, [storyboardImages, imagesLoaded]);
  // Dynamic AI Blueprint Generation Simulator
  

const handleGenerateBlueprint = async () => {
  setIsGenerating(true);
  setGenProgress(10);
  setGenStep("Connecting to FrameForge AI...");

  try {
    setGenProgress(25);
    setGenStep("Analyzing your film concept with AI...");

    const response = await fetch(
      'http://localhost:5000/api/generate-story',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          concept: logline,
          genre: genre,
          visualStyle: visualStyle,
          pace: pace,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success || !data.blueprint) {
      throw new Error(data.error || 'AI story generation failed.');
    }

    const ai = data.blueprint;

    setGenProgress(65);
    setGenStep("Building characters and screenplay...");

    const generatedCharacters = (ai.characters || []).map((character, index) => ({
      name: character.name,
      role: character.role || "Supporting",
      age: "Not specified",
      archetype: character.role || "Character",
      traits: character.description || "",
      arc: character.arc || "",
      motivation: character.motivation || "",
      avatarBg: index % 2 === 0
        ? "from-purple-900/40 to-indigo-950/60"
        : "from-cyan-900/40 to-blue-950/60",
      accent: index % 2 === 0
        ? "border-purple-500/40"
        : "border-cyan-500/40",
    }));

    const generatedScenes = (ai.scenes || []).map((scene) => {
      const script = [];

      if (scene.action) {
        script.push({
          type: "action",
          text: scene.action,
        });
      }

      (scene.dialogue || []).forEach((line) => {
        script.push({
          type: "character",
          text: line.character,
        });

        script.push({
          type: "dialogue",
          text: line.line,
        });
      });

      return {
        id: scene.sceneNumber,
        slug: scene.heading || scene.location || `SCENE ${scene.sceneNumber}`,
        summary: scene.description || "",
        mood: "Cinematic",
        script,
      };
    });

    const generatedShots = (ai.shots || []).map((shot, index) => ({
      id: `SHOT-${String(shot.shotNumber || index + 1).padStart(3, "0")}`,
      scene: generatedScenes.find(
        (scene) => scene.id === shot.sceneNumber
      )?.slug || `Scene ${shot.sceneNumber}`,
      type: shot.shotType || "Cinematic Shot",
      lens: "AI selected",
      movement: shot.movement || "Static",
      lighting: visualStyle,
      audio: "To be developed",
      description: shot.description || "",
      cameraAngle: shot.cameraAngle || "Eye Level",
    }));

    const generatedStoryboard = (ai.storyboard || []).map((frame, index) => {
      const relatedShot = generatedShots.find(
        (shot) => Number(shot.id.replace("SHOT-", "")) === frame.sceneNumber
      ) || generatedShots[index];

      return {
        id: `SB-${String(frame.frameNumber || index + 1).padStart(2, "0")}`,
        shotId: relatedShot?.id || `SHOT-${String(index + 1).padStart(3, "0")}`,
        title: frame.title || `Storyboard Frame ${index + 1}`,
        camera: relatedShot
          ? `${relatedShot.type} | ${relatedShot.cameraAngle}`
          : "Cinematic",
        prompt: frame.imagePrompt || frame.visualDescription || "",
        visualStyle: visualStyle,
        sketchColor: ["#8b5cf6", "#06b6d4", "#d97706", "#ec4899"][index % 4],
      };
    });

    setGenProgress(90);
    setGenStep("Finalizing your cinematic blueprint...");

    setCurrentBlueprint({
      title: ai.title || "Untitled Film",
      logline: ai.logline || logline,
      loglineShort: ai.logline || logline,
      genre: genre,
      style: visualStyle,
      pace: pace,
      synopsis: ai.synopsis || "",
      acts: ai.acts || [],
      directorNotes: ai.directorNotes || "",
      aiStory: ai.synopsis || "",
      characters: generatedCharacters,
      scenes: generatedScenes,
      shots: generatedShots,
      storyboard: generatedStoryboard,
    });

    setStoryboardImages({});
    setImageErrors({});
    setGenProgress(100);
    setGenStep("AI cinematic blueprint successfully generated!");

  } catch (error) {
    console.error("Blueprint generation error:", error);
    alert(error.message || "Unable to generate your AI story.");
  } finally {
    setIsGenerating(false);
  }
};




// Generate an AI storyboard image
const handleGenerateStoryboardImage = async (frame) => {
  const frameId = frame.id;

  setGeneratingImages((prev) => ({
    ...prev,
    [frameId]: true,
  }));

  setImageErrors((prev) => ({
    ...prev,
    [frameId]: '',
  }));

  try {
    const response = await fetch(
      'http://localhost:5000/api/generate-image',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: frame.prompt,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Image generation failed.');
    }

    setStoryboardImages((prev) => ({
      ...prev,
      [frameId]: data.image,
    }));

  } catch (error) {
    console.error('Storyboard image error:', error);

    setImageErrors((prev) => ({
      ...prev,
      [frameId]: error.message,
    }));

  } finally {
    setGeneratingImages((prev) => ({
      ...prev,
      [frameId]: false,
    }));
  }
};

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans antialiased flex flex-col selection:bg-purple-500 selection:text-white">
      {/* GLOW BACKGROUND EFFECT */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] left-1/4 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-[10%] w-[500px] h-[500px] bg-cyan-900/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[400px] bg-indigo-950/20 rounded-full blur-[160px]" />
      </div>

      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 bg-[#0a0d14]/85 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 p-0.5 shadow-lg shadow-purple-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center">
              <Film className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                FRAMEFORGE <span className="text-purple-400">AI</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 uppercase tracking-widest">
                v2.6 Pro
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">From Imagination to Cinematic Blueprint</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Hackathon Edition: <strong>GenNarrative Clash</strong></span>
          </div>

          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-xl shadow-lg shadow-purple-900/40 border border-purple-400/30 transition-all duration-200 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Export Director's Deck</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">

        {/* TOP SECTION: AI INPUT & CONFIGURATION PANEL */}
        <section className="bg-[#0e121b]/90 border border-slate-800/90 rounded-2xl p-5 lg:p-6 shadow-2xl shadow-black/60 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>Story Concept & Cinematic Directions</span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Input your raw logline or film premise. AI Engine breaks it into scripts, shot lists & storyboards.
              </p>
            </div>

            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Multi-Agent Engine Ready</span>
            </div>
          </div>

          {/* INPUT FORM */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Film Logline / Story Concept
              </label>
              <div className="relative">
                <textarea
                  value={logline}
                  onChange={(e) => setLogline(e.target.value)}
                  placeholder="Describe your story idea, main character conflict, world setting..."
                  className="w-full bg-[#07090e] border border-slate-700/80 rounded-xl p-3.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition duration-150 resize-y min-h-[85px]"
                />
                <button 
                  onClick={() => setLogline(SAMPLE_BLUEPRINTS.clockmaker.logline)}
                  className="absolute right-3 bottom-3 text-[11px] text-purple-400 hover:text-purple-300 bg-purple-950/60 border border-purple-800/50 px-2 py-1 rounded-md transition"
                >
                  Load Clockmaker Preset
                </button>
              </div>
            </div>

            {/* OPTIONS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Target Genre</label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full bg-[#07090e] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="Sci-Fi Thriller">Sci-Fi Thriller</option>
                  <option value="Neo-Noir Crime">Neo-Noir Crime</option>
                  <option value="Cyberpunk Distopia">Cyberpunk Dystopia</option>
                  <option value="Psychological Horror">Psychological Horror</option>
                  <option value="Indie Drama">Indie Drama</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Visual Aesthetic</label>
                <select
                  value={visualStyle}
                  onChange={(e) => setVisualStyle(e.target.value)}
                  className="w-full bg-[#07090e] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="Cinematic 35mm Dark Noir">Cinematic 35mm Dark Noir</option>
                  <option value="High-Contrast Anamorphic">High-Contrast Anamorphic</option>
                  <option value="Gritty Handheld Realism">Gritty Handheld Realism</option>
                  <option value="Symmetrical Wes Anderson-esque">Symmetrical Aesthetic</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Narrative Pace</label>
                <select
                  value={pace}
                  onChange={(e) => setPace(e.target.value)}
                  className="w-full bg-[#07090e] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="Slow Burn Drama">Slow Burn Drama</option>
                  <option value="Fast-Paced Action">Fast-Paced Action</option>
                  <option value="Non-Linear Mystery">Non-Linear Mystery</option>
                  <option value="Episodic Arc">Episodic Arc</option>
                </select>
              </div>
            </div>

            {/* GENERATE BUTTON & PROGRESS BAR */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={handleGenerateBlueprint}
                disabled={isGenerating}
                className="w-full sm:w-auto flex items-center justify-center space-x-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:opacity-95 text-white font-semibold text-sm px-7 py-3 rounded-xl shadow-lg shadow-purple-900/30 transition-all duration-200 active:scale-95 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-cyan-300" />
                    <span>Synthesizing Blueprint...</span>
                  </>
                ) : (
                  <>
                    <Clapperboard className="w-4 h-4 text-cyan-300" />
                    <span>Generate Production Blueprint</span>
                  </>
                )}
              </button>

              {isGenerating && (
                <div className="w-full sm:flex-1 max-w-md bg-slate-900 p-2.5 rounded-lg border border-slate-800 space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span className="truncate pr-2 font-mono">{genStep}</span>
                    <span className="font-bold text-cyan-400">{genProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full transition-all duration-300 ease-out"
                      style={{ width: `${genProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* WORKSPACE CONTENT AREA */}
        <div className="space-y-4">
          
          {/* TAB NAVIGATION BAR */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 overflow-x-auto">
            <div className="flex items-center space-x-1 min-w-max">
              <button
                onClick={() => setActiveTab("script")}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activeTab === "script"
                    ? "bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-md shadow-purple-900/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Script & Scenes</span>
                <span className="ml-1 bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded text-[10px]">
                  {currentBlueprint.scenes.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("shotlist")}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activeTab === "shotlist"
                    ? "bg-cyan-600/20 text-cyan-300 border border-cyan-500/40 shadow-md shadow-cyan-900/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Cinematography & Shots</span>
                <span className="ml-1 bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded text-[10px]">
                  {currentBlueprint.shots.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("storyboard")}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activeTab === "storyboard"
                    ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-md shadow-indigo-900/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Visual Storyboard</span>
                <span className="ml-1 bg-indigo-950 text-indigo-300 px-1.5 py-0.5 rounded text-[10px]">
                  {currentBlueprint.storyboard.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("bible")}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  activeTab === "bible"
                    ? "bg-amber-600/20 text-amber-300 border border-amber-500/40 shadow-md shadow-amber-900/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Character & Lore Bible</span>
                <span className="ml-1 bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded text-[10px]">
                  {currentBlueprint.characters.length}
                </span>
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-2 text-xs text-slate-400">
              <Sliders className="w-3.5 h-3.5" />
              <span>Style: <strong className="text-slate-300">{currentBlueprint.style}</strong></span>
            </div>
          </div>

          {/* TAB 1: SCREENPLAY & SCENE BREAKDOWN */}
          {activeTab === "script" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* SCRIPT EDITOR SIMULATOR */}
              <div className="lg:col-span-2 bg-[#0a0d14] border border-slate-800 rounded-2xl p-6 shadow-xl relative font-mono text-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80 text-xs font-sans text-slate-400">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-2 font-mono text-slate-500">Screenplay_Draft_Final.fountain</span>
                  </div>
                  <span className="bg-slate-900 px-2 py-1 rounded text-slate-400 border border-slate-800">
                    Standard Courier Screenplay Format
                  </span>
                </div>
{currentBlueprint.aiStory && (
  <div className="mb-6 rounded-xl border border-purple-500/30 bg-purple-950/20 p-5">
    <h3 className="mb-3 text-lg font-bold text-purple-300">
      AI-Generated Story
    </h3>

    <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-200">
      {currentBlueprint.aiStory}
    </div>
  </div>
)}
                <div className="space-y-6 max-h-[580px] overflow-y-auto pr-2 custom-scrollbar">
                  {currentBlueprint.scenes.map((scene) => (
                    <div key={scene.id} className="space-y-3 p-4 rounded-xl bg-slate-900/30 border border-slate-800/40">
                      <div className="flex items-center justify-between font-bold text-yellow-400 bg-yellow-950/20 px-3 py-1.5 rounded-md border border-yellow-800/30">
                        <span>{scene.slug}</span>
                        <span className="text-[10px] font-sans text-yellow-500/80 bg-yellow-950 px-2 py-0.5 rounded">
                          SCENE #{scene.id}
                        </span>
                      </div>

                      <div className="pl-2 space-y-3">
                        {scene.script.map((line, idx) => {
                          if (line.type === 'action') {
                            return <p key={idx} className="text-slate-300 leading-relaxed text-xs sm:text-sm">{line.text}</p>;
                          }
                          if (line.type === 'character') {
                            return (
                              <p key={idx} className="text-center font-bold text-cyan-300 tracking-wider pt-2 text-xs">
                                {line.text}
                              </p>
                            );
                          }
                          if (line.type === 'parenthetical') {
                            return (
                              <p key={idx} className="text-center text-slate-400 italic text-xs">
                                {line.text}
                              </p>
                            );
                          }
                          if (line.type === 'dialogue') {
                            return (
                              <p key={idx} className="max-w-md mx-auto text-center text-slate-200 text-xs sm:text-sm leading-normal">
                                "{line.text}"
                              </p>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SCENE DIRECTORY & METADATA */}
              <div className="space-y-4">
                <div className="bg-[#0e121b] border border-slate-800 rounded-2xl p-5 shadow-xl">
                  <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center space-x-2">
                    <Compass className="w-4 h-4 text-purple-400" />
                    <span>Scene Breakdown Analysis</span>
                  </h3>
                  
                  <div className="space-y-3">
                    {currentBlueprint.scenes.map((scene) => (
                      <div key={scene.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs space-y-2">
                        <div className="flex items-center justify-between font-semibold text-purple-300">
                          <span>Scene #{scene.id}</span>
                          <span className="text-[10px] bg-purple-950 text-purple-400 px-2 py-0.5 rounded border border-purple-800/40">
                            {scene.mood}
                          </span>
                        </div>
                        <p className="text-slate-400 leading-normal">{scene.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-950/30 to-indigo-950/30 border border-purple-800/30 rounded-2xl p-5 shadow-xl">
                  <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
                    Director Notes (AI Generated)
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Main narrative emphasis placed on audio-visual contrast. The ticking clock sounds should build in cadence to simulate panic before cutting to complete silence during temporal rewind events.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CINEMATOGRAPHY & SHOT LIST */}
          {activeTab === "shotlist" && (
            <div className="bg-[#0a0d14] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 bg-[#0e121b] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-200">Cinematography Shot Matrix</h3>
                  <p className="text-xs text-slate-400">Structured camera framing, lens specs, lighting ratios, and sound design</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono bg-cyan-950 text-cyan-300 px-3 py-1 rounded-lg border border-cyan-800/40">
                    Total Shots: {currentBlueprint.shots.length}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Shot ID</th>
                      <th className="py-3.5 px-4 font-semibold">Scene / Location</th>
                      <th className="py-3.5 px-4 font-semibold">Shot Type & Lens</th>
                      <th className="py-3.5 px-4 font-semibold">Camera Movement</th>
                      <th className="py-3.5 px-4 font-semibold">Lighting & Atmosphere</th>
                      <th className="py-3.5 px-4 font-semibold">Audio / Sound Design</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {currentBlueprint.shots.map((shot) => (
                      <tr key={shot.id} className="hover:bg-slate-900/40 transition">
                        <td className="py-4 px-4 font-mono font-bold text-cyan-400">
                          {shot.id}
                        </td>
                        <td className="py-4 px-4 text-slate-200 font-medium">
                          {shot.scene}
                        </td>
                        <td className="py-4 px-4">
                          <span className="block font-semibold text-purple-300">{shot.type}</span>
                          <span className="text-[11px] text-slate-400 font-mono">{shot.lens}</span>
                        </td>
                        <td className="py-4 px-4 text-slate-300">
                          {shot.movement}
                        </td>
                        <td className="py-4 px-4 max-w-xs text-slate-400">
                          {shot.lighting}
                        </td>
                        <td className="py-4 px-4 max-w-xs text-slate-400">
                          <div className="flex items-start space-x-1.5">
                            <Mic className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                            <span>{shot.audio}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: VISUAL STORYBOARD */}
          {activeTab === "storyboard" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentBlueprint.storyboard.map((sb) => (
                  <div key={sb.id} className="bg-[#0e121b] border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-purple-500/40 transition duration-300">
                    
                    {/* SIMULATED CINEMATIC VISUAL FRAME */}
                    <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden group">
                      
                     
{storyboardImages[sb.id] ? (
  <img
    src={storyboardImages[sb.id]}
    alt={`AI storyboard frame: ${sb.title}`}
    className="absolute inset-0 w-full h-full object-cover"
  />
) : (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 text-center">
    <div
      className="w-16 h-16 rounded-2xl flex items-center justify-center border shadow-2xl"
      style={{
        borderColor: sb.sketchColor,
        backgroundColor: `${sb.sketchColor}15`,
      }}
    >
      {generatingImages[sb.id] ? (
        <RefreshCw
          className="w-8 h-8 animate-spin"
          style={{ color: sb.sketchColor }}
        />
      ) : (
        <Video
          className="w-8 h-8"
          style={{ color: sb.sketchColor }}
        />
      )}
    </div>

    <h4 className="mt-4 font-bold text-sm text-slate-100">
      {generatingImages[sb.id]
        ? "Generating Cinematic Frame..."
        : "AI Storyboard Preview"}
    </h4>

    <p className="mt-2 text-xs text-slate-400">
      {generatingImages[sb.id]
        ? "Your visual is being rendered."
        : "Generate an original cinematic image from this prompt."}
    </p>

    {!generatingImages[sb.id] && (
      <button
        onClick={() => handleGenerateStoryboardImage(sb)}
        className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-xs font-semibold hover:opacity-90 transition"
      >
        Generate AI Image
      </button>
    )}

    {imageErrors[sb.id] && (
      <p className="mt-3 text-xs text-red-400">
        {imageErrors[sb.id]}
      </p>
    )}
  </div>
)}


                      {/* Camera Viewfinder Overlay */}
                      <div className="absolute inset-3 border border-white/10 rounded-lg pointer-events-none flex flex-col justify-between p-2 text-[10px] font-mono text-slate-500">
                        <div className="flex justify-between">
                          <span>[REC] 4K RAW</span>
                          <span>24 FPS</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{sb.shotId}</span>
                          <span>ASPECT 16:9</span>
                        </div>
                      </div>

                      {/* Hover Overlay with Prompt */}
                      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm p-4 flex flex-col justify-between hidden transition-opacity duration-200">
                        <div>
                          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block mb-1">
                            Midjourney / Stable Diffusion Prompt
                          </span>
                          <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
                            {sb.prompt}
                          </p>
                        </div>
                        <div className="flex justify-end">
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(sb.prompt);
                            }}
                            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                          >
                            <span>Copy Prompt</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* STORYBOARD CARD METADATA */}
                    <div className="p-4 flex items-center justify-between border-t border-slate-800/80 bg-[#0a0d14]">
                      <div>
                        <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40 mr-2">
                          {sb.shotId}
                        </span>
                        <span className="text-xs font-semibold text-slate-200">{sb.title}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{sb.visualStyle}</span>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CHARACTER & LORE BIBLE */}
          {activeTab === "bible" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentBlueprint.characters.map((char, index) => (
                <div key={index} className={`bg-[#0e121b] border ${char.accent} rounded-2xl p-6 shadow-xl relative overflow-hidden space-y-4`}>
                  
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${char.avatarBg} border border-slate-700 flex items-center justify-center font-bold text-lg text-slate-200 shadow-inner`}>
                        {char.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-100">{char.name}</h3>
                        <p className="text-xs text-purple-400 font-medium">{char.role}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-slate-900 text-slate-400 px-2.5 py-1 rounded-full border border-slate-800">
                      Age: {char.age}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-slate-500 font-semibold uppercase text-[10px] block mb-0.5">Character Archetype</span>
                      <p className="text-slate-300 font-medium">{char.archetype}</p>
                    </div>

                    <div>
                      <span className="text-slate-500 font-semibold uppercase text-[10px] block mb-0.5">Visual Traits & Costume Notes</span>
                      <p className="text-slate-400 leading-relaxed">{char.traits}</p>
                    </div>

                    <div>
                      <span className="text-slate-500 font-semibold uppercase text-[10px] block mb-0.5">Dramatic Arc</span>
                      <p className="text-slate-400 leading-relaxed">{char.arc}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* EXPORT DIRECTOR'S DECK MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e121b] border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 relative animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <Film className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-slate-100">Export Production Package</h3>
              </div>
              <button 
                onClick={() => setShowExportModal(false)}
                className="text-slate-400 hover:text-white text-xs bg-slate-900 px-2 py-1 rounded"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between font-mono text-purple-300">
                  <span>PROJECT: {currentBlueprint.title}</span>
                  <span>GENRE: {currentBlueprint.genre}</span>
                </div>
                <p className="text-slate-400 italic">"{currentBlueprint.logline}"</p>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <span className="font-semibold block text-slate-400">Deck Components Included in Package:</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Formatted Screenplay PDF</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Camera & Lighting Shot List</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>High-Res Storyboard Grid</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Character & Costume Bible</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => {
                  console.log("Storyboard images being exported:", Object.keys(storyboardImages));
console.log(
  "Image data lengths:",
  Object.fromEntries(
    Object.entries(storyboardImages).map(([id, image]) => [
      id,
      image?.length || 0
    ])
  )
);
  generateDirectorDeck(currentBlueprint, storyboardImages);
  setShowExportModal(false);
}}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-purple-900/40 transition"
              >
                <Download className="w-4 h-4" />
                <span>Download Compiled Director's Deck (.PDF)</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER BAR */}
      <footer className="mt-12 border-t border-slate-800/60 bg-[#07090e] py-6 px-4 lg:px-8 text-center text-xs text-slate-500">
        <p>FrameForge AI — Generative Film Pre-Production Assistant • Created for GenNarrative Clash Hackathon 2026</p>
      </footer>
    </div>
  );
}
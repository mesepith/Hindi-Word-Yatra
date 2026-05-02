(() => {
  "use strict";

  const WORLD = { width: 1280, height: 720 };
  const PLAYER_SPEED = 260;
  const INTERACT_RADIUS = 92;
  const PORTAL_RADIUS = 118;
  const MAX_FOCUS = 3;
  const HINDI_LANG = "hi-IN";
  const BEST_KEY = "hindi-word-yatra-best";
  const AUDIO_DIR = "assets/audio";
  const AUDIO_FORMATS = [
    { ext: "m4a", type: "audio/mp4" },
    { ext: "mp3", type: "audio/mpeg" },
    { ext: "ogg", type: 'audio/ogg; codecs="opus"' },
  ];

  const WORDS = [
    { id: "namaste", hindi: "नमस्ते", translit: "namaste", english: "hello", sentence: "नमस्ते, आप कैसे हैं?", sentenceEnglish: "Hello, how are you?" },
    { id: "dhanyavaad", hindi: "धन्यवाद", translit: "dhanyavaad", english: "thank you", sentence: "धन्यवाद, माँ।", sentenceEnglish: "Thank you, Mom." },
    { id: "haan", hindi: "हाँ", translit: "haan", english: "yes", sentence: "हाँ, मुझे खेलना है।", sentenceEnglish: "Yes, I want to play." },
    { id: "nahi", hindi: "नहीं", translit: "nahi", english: "no", sentence: "नहीं, धन्यवाद।", sentenceEnglish: "No, thank you." },
    { id: "kripya", hindi: "कृपया", translit: "kripya", english: "please", sentence: "कृपया पानी दीजिए।", sentenceEnglish: "Please give water." },
    { id: "maa", hindi: "माँ", translit: "maa", english: "mother", sentence: "माँ घर में हैं।", sentenceEnglish: "Mother is at home." },
    { id: "pita", hindi: "पिता", translit: "pita", english: "father", sentence: "पिता किताब पढ़ते हैं।", sentenceEnglish: "Father reads a book." },
    { id: "bhai", hindi: "भाई", translit: "bhai", english: "brother", sentence: "भाई स्कूल जाता है।", sentenceEnglish: "Brother goes to school." },
    { id: "behan", hindi: "बहन", translit: "behan", english: "sister", sentence: "बहन गाना गाती है।", sentenceEnglish: "Sister sings a song." },
    { id: "dost", hindi: "दोस्त", translit: "dost", english: "friend", sentence: "मेरा दोस्त यहाँ है।", sentenceEnglish: "My friend is here." },
    { id: "ghar", hindi: "घर", translit: "ghar", english: "home", sentence: "मेरा घर सुंदर है।", sentenceEnglish: "My home is beautiful." },
    { id: "kamra", hindi: "कमरा", translit: "kamra", english: "room", sentence: "कमरा साफ है।", sentenceEnglish: "The room is clean." },
    { id: "darwaza", hindi: "दरवाज़ा", translit: "darwaza", english: "door", sentence: "दरवाज़ा खोलिए।", sentenceEnglish: "Open the door." },
    { id: "paani", hindi: "पानी", translit: "paani", english: "water", sentence: "मुझे पानी चाहिए।", sentenceEnglish: "I want water." },
    { id: "khaana", hindi: "खाना", translit: "khaana", english: "food", sentence: "खाना स्वादिष्ट है।", sentenceEnglish: "The food is tasty." },
    { id: "doodh", hindi: "दूध", translit: "doodh", english: "milk", sentence: "दूध ठंडा है।", sentenceEnglish: "The milk is cold." },
    { id: "seb", hindi: "सेब", translit: "seb", english: "apple", sentence: "सेब लाल है।", sentenceEnglish: "The apple is red." },
    { id: "kitaab", hindi: "किताब", translit: "kitaab", english: "book", sentence: "मेरी किताब नई है।", sentenceEnglish: "My book is new." },
    { id: "school", hindi: "स्कूल", translit: "school", english: "school", sentence: "स्कूल पास में है।", sentenceEnglish: "The school is nearby." },
    { id: "patang", hindi: "पतंग", translit: "patang", english: "kite", sentence: "पतंग ऊपर उड़ती है।", sentenceEnglish: "The kite flies high." },
    { id: "gaadi", hindi: "गाड़ी", translit: "gaadi", english: "car", sentence: "गाड़ी नीली है।", sentenceEnglish: "The car is blue." },
    { id: "suraj", hindi: "सूरज", translit: "suraj", english: "sun", sentence: "सूरज चमक रहा है।", sentenceEnglish: "The sun is shining." },
    { id: "chaand", hindi: "चाँद", translit: "chaand", english: "moon", sentence: "चाँद रात में आता है।", sentenceEnglish: "The moon comes at night." },
    { id: "phool", hindi: "फूल", translit: "phool", english: "flower", sentence: "फूल पीला है।", sentenceEnglish: "The flower is yellow." },
    { id: "laal", hindi: "लाल", translit: "laal", english: "red", sentence: "सेब लाल है।", sentenceEnglish: "The apple is red." },
    { id: "neela", hindi: "नीला", translit: "neela", english: "blue", sentence: "आसमान नीला है।", sentenceEnglish: "The sky is blue." },
    { id: "hara", hindi: "हरा", translit: "hara", english: "green", sentence: "पत्ता हरा है।", sentenceEnglish: "The leaf is green." },
    { id: "peela", hindi: "पीला", translit: "peela", english: "yellow", sentence: "फूल पीला है।", sentenceEnglish: "The flower is yellow." },
    { id: "ek", hindi: "एक", translit: "ek", english: "one", sentence: "एक किताब है।", sentenceEnglish: "There is one book." },
    { id: "do", hindi: "दो", translit: "do", english: "two", sentence: "दो सेब हैं।", sentenceEnglish: "There are two apples." },
    { id: "teen", hindi: "तीन", translit: "teen", english: "three", sentence: "तीन फूल हैं।", sentenceEnglish: "There are three flowers." },
    { id: "paanch", hindi: "पाँच", translit: "paanch", english: "five", sentence: "पाँच तारे हैं।", sentenceEnglish: "There are five stars." },
  ];

  const WORD_BY_ID = new Map(WORDS.map((word) => [word.id, word]));

  const CHAPTERS = [
    {
      id: "courtyard",
      hindi: "घर आँगन",
      english: "Home Courtyard",
      line: "The first path glows near home.",
      start: { x: 210, y: 548 },
      portal: { x: 1130, y: 148 },
      palette: { skyTop: "#9bdcff", skyBottom: "#fff4ba", land: "#93d09a", path: "#f2d29a", water: "#68c7d5" },
      nodes: [
        { id: "courtyard-namaste", wordId: "namaste", mode: "word", x: 260, y: 512 },
        { id: "courtyard-ghar", wordId: "ghar", mode: "meaning", x: 495, y: 390 },
        { id: "courtyard-maa", wordId: "maa", mode: "sentence", x: 750, y: 462 },
        { id: "courtyard-paani", wordId: "paani", mode: "listen", x: 970, y: 290 },
      ],
    },
    {
      id: "bazaar",
      hindi: "रंग बाज़ार",
      english: "Color Bazaar",
      line: "Bright stalls hold food, color, and counting clues.",
      start: { x: 128, y: 560 },
      portal: { x: 1125, y: 565 },
      palette: { skyTop: "#a8e6e6", skyBottom: "#ffe0b2", land: "#e8cd7f", path: "#f6e3b1", water: "#60bdc8" },
      nodes: [
        { id: "bazaar-seb", wordId: "seb", mode: "meaning", x: 240, y: 280 },
        { id: "bazaar-khaana", wordId: "khaana", mode: "word", x: 480, y: 512 },
        { id: "bazaar-laal", wordId: "laal", mode: "sentence", x: 725, y: 302 },
        { id: "bazaar-paanch", wordId: "paanch", mode: "listen", x: 935, y: 480 },
      ],
    },
    {
      id: "school",
      hindi: "स्कूल पथ",
      english: "School Path",
      line: "The study road opens with books, friends, and numbers.",
      start: { x: 130, y: 180 },
      portal: { x: 1120, y: 164 },
      palette: { skyTop: "#b6d8ff", skyBottom: "#e7f6ff", land: "#91c989", path: "#d9c29a", water: "#72b9e6" },
      nodes: [
        { id: "school-kitaab", wordId: "kitaab", mode: "word", x: 300, y: 210 },
        { id: "school-dost", wordId: "dost", mode: "sentence", x: 510, y: 515 },
        { id: "school-school", wordId: "school", mode: "meaning", x: 770, y: 260 },
        { id: "school-teen", wordId: "teen", mode: "listen", x: 970, y: 500 },
      ],
    },
    {
      id: "festival",
      hindi: "उत्सव आसमान",
      english: "Festival Sky",
      line: "The final trail shines with sky words and celebration lights.",
      start: { x: 120, y: 585 },
      portal: { x: 1130, y: 160 },
      palette: { skyTop: "#596bb7", skyBottom: "#ffd2a6", land: "#6ab37f", path: "#efd083", water: "#64c5d8" },
      nodes: [
        { id: "festival-patang", wordId: "patang", mode: "word", x: 285, y: 510 },
        { id: "festival-suraj", wordId: "suraj", mode: "meaning", x: 520, y: 310 },
        { id: "festival-chaand", wordId: "chaand", mode: "listen", x: 775, y: 494 },
        { id: "festival-phool", wordId: "phool", mode: "sentence", x: 976, y: 298 },
      ],
    },
  ];

  const MODES = {
    word: {
      label: "Word Gate",
      title: (word) => `Find "${titleCase(word.english)}"`,
      hint: () => "Choose the matching Hindi word.",
      prompt: (word) => `Find the Hindi word for ${titleCase(word.english)}.`,
      main: (word) => word.hindi,
      sub: (word) => `${word.translit} · ${titleCase(word.english)}`,
    },
    meaning: {
      label: "Meaning Gate",
      title: (word) => word.hindi,
      hint: (word) => `Sounds like: ${word.translit}`,
      prompt: (word) => `What does ${word.hindi} mean?`,
      main: (word) => titleCase(word.english),
      sub: (word) => word.hindi,
    },
    listen: {
      label: "Sound Gate",
      title: () => "Listen and choose",
      hint: () => "Hear the word, then pick it.",
      prompt: () => "Which Hindi word did you hear?",
      main: (word) => word.hindi,
      sub: (word) => `${word.translit} · ${titleCase(word.english)}`,
    },
    sentence: {
      label: "Story Gate",
      title: (word) => word.sentence.replace(word.hindi, "____"),
      hint: (word) => word.sentenceEnglish,
      prompt: (word) => `Complete: ${word.sentence.replace(word.hindi, "____")}`,
      main: (word) => word.hindi,
      sub: (word) => `${word.translit} · ${titleCase(word.english)}`,
    },
  };

  const els = {
    best: document.querySelector("#bestValue"),
    canvas: document.querySelector("#gameCanvas"),
    challengeArt: document.querySelector("#challengeArt"),
    challengeFeedback: document.querySelector("#challengeFeedback"),
    challengeHint: document.querySelector("#challengeHint"),
    challengeMode: document.querySelector("#challengeMode"),
    challengeOverlay: document.querySelector("#challengeOverlay"),
    challengePrompt: document.querySelector("#challengePrompt"),
    challengeTitle: document.querySelector("#challengeTitle"),
    chapterProgress: document.querySelector("#chapterProgressBar"),
    chapterSubtitle: document.querySelector("#chapterSubtitle"),
    chapterTitle: document.querySelector("#chapterTitle"),
    choiceGrid: document.querySelector("#choiceGrid"),
    closeChallenge: document.querySelector("#closeChallengeButton"),
    focusRow: document.querySelector("#focusRow"),
    gem: document.querySelector("#gemValue"),
    interact: document.querySelector("#interactButton"),
    journalCount: document.querySelector("#journalCount"),
    journalList: document.querySelector("#journalList"),
    keepExploring: document.querySelector("#keepExploringButton"),
    listen: document.querySelector("#listenButton"),
    nearbyChip: document.querySelector("#nearbyChip"),
    nearbyTitle: document.querySelector("#nearbyTitle"),
    nearbyWord: document.querySelector("#nearbyWord"),
    phraseEnglish: document.querySelector("#phraseEnglish"),
    phraseHindi: document.querySelector("#phraseHindi"),
    playAgain: document.querySelector("#playAgainButton"),
    questLine: document.querySelector("#questLine"),
    restart: document.querySelector("#restartButton"),
    score: document.querySelector("#scoreValue"),
    sound: document.querySelector("#soundButton"),
    touchInteract: document.querySelector("#touchInteractButton"),
    victoryCopy: document.querySelector("#victoryCopy"),
    victoryOverlay: document.querySelector("#victoryOverlay"),
    voiceAudio: document.querySelector("#voiceAudio"),
  };

  const ctx = els.canvas.getContext("2d");
  const state = {
    best: readBest(),
    chapterIndex: 0,
    challenge: null,
    completed: new Set(),
    focus: MAX_FOCUS,
    gems: 0,
    keys: new Set(),
    learned: new Map(),
    message: "",
    messageTimer: 0,
    particles: [],
    player: { x: CHAPTERS[0].start.x, y: CHAPTERS[0].start.y, facing: 1 },
    score: 0,
    streak: 0,
    tapTarget: null,
    time: 0,
    touchVector: { x: 0, y: 0 },
  };

  let canvasRect = null;
  let lastFrame = 0;
  let audioContext = null;
  let preferredAudioFormat = null;
  let cachedVoices = [];

  function boot() {
    preferredAudioFormat = chooseAudioFormat();
    resetAdventure();
    bindEvents();
    resizeCanvas();
    window.requestAnimationFrame(loop);
  }

  function bindEvents() {
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", (event) => {
      state.keys.delete(event.key.toLowerCase());
    });

    els.canvas.addEventListener("pointerdown", handleCanvasPointer);
    els.interact.addEventListener("click", interactWithNearby);
    els.touchInteract.addEventListener("click", interactWithNearby);
    els.restart.addEventListener("click", resetAdventure);
    els.playAgain.addEventListener("click", resetAdventure);
    els.keepExploring.addEventListener("click", () => {
      els.victoryOverlay.hidden = true;
      setMessage("The completed trail is ready to roam.");
    });
    els.closeChallenge.addEventListener("click", closeChallenge);
    els.listen.addEventListener("click", () => {
      if (state.challenge) playWord(state.challenge.word, els.listen);
    });
    els.sound.addEventListener("click", () => {
      const word = state.challenge?.word || latestWord();
      if (word) playWord(word, els.sound);
    });

    document.querySelectorAll(".move-pad button").forEach((button) => {
      const dir = button.dataset.dir;
      button.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        button.setPointerCapture?.(event.pointerId);
        setTouchDirection(dir);
      });
      button.addEventListener("pointerup", clearTouchDirection);
      button.addEventListener("pointercancel", clearTouchDirection);
      button.addEventListener("lostpointercapture", clearTouchDirection);
    });

    if ("speechSynthesis" in window) {
      cachedVoices = window.speechSynthesis.getVoices();
      window.speechSynthesis.addEventListener("voiceschanged", () => {
        cachedVoices = window.speechSynthesis.getVoices();
      });
    }
  }

  function handleKeyDown(event) {
    const key = event.key.toLowerCase();
    const movementKeys = ["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"];
    if (movementKeys.includes(key)) {
      state.keys.add(key);
      state.tapTarget = null;
      event.preventDefault();
      return;
    }

    if ((key === "e" || key === "enter" || key === " ") && !state.challenge) {
      event.preventDefault();
      interactWithNearby();
      return;
    }

    const choiceNumber = Number(event.key);
    if (state.challenge && Number.isInteger(choiceNumber)) {
      const option = state.challenge.options[choiceNumber - 1];
      if (option) chooseOption(option.id);
    }
  }

  function handleCanvasPointer(event) {
    if (state.challenge || !canvasRect) return;
    const x = ((event.clientX - canvasRect.left) / canvasRect.width) * WORLD.width;
    const y = ((event.clientY - canvasRect.top) / canvasRect.height) * WORLD.height;
    state.tapTarget = { x: clamp(x, 42, WORLD.width - 42), y: clamp(y, 72, WORLD.height - 46) };
  }

  function setTouchDirection(dir) {
    state.tapTarget = null;
    const vectors = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
    };
    state.touchVector = vectors[dir] || { x: 0, y: 0 };
  }

  function clearTouchDirection() {
    state.touchVector = { x: 0, y: 0 };
  }

  function resetAdventure() {
    state.chapterIndex = 0;
    state.completed = new Set();
    state.focus = MAX_FOCUS;
    state.gems = 0;
    state.learned = new Map();
    state.particles = [];
    state.score = 0;
    state.streak = 0;
    state.tapTarget = null;
    state.player = { x: CHAPTERS[0].start.x, y: CHAPTERS[0].start.y, facing: 1 };
    state.challenge = null;
    els.challengeOverlay.hidden = true;
    els.victoryOverlay.hidden = true;
    setMessage(CHAPTERS[0].line);
    syncPanels();
  }

  function loop(timestamp) {
    const dt = Math.min((timestamp - lastFrame) / 1000 || 0, 0.05);
    lastFrame = timestamp;
    state.time += dt;
    update(dt);
    draw();
    syncNearby();
    window.requestAnimationFrame(loop);
  }

  function update(dt) {
    if (state.challenge) return;

    let moveX = 0;
    let moveY = 0;

    if (state.keys.has("arrowleft") || state.keys.has("a")) moveX -= 1;
    if (state.keys.has("arrowright") || state.keys.has("d")) moveX += 1;
    if (state.keys.has("arrowup") || state.keys.has("w")) moveY -= 1;
    if (state.keys.has("arrowdown") || state.keys.has("s")) moveY += 1;

    moveX += state.touchVector.x;
    moveY += state.touchVector.y;

    if (!moveX && !moveY && state.tapTarget) {
      const dx = state.tapTarget.x - state.player.x;
      const dy = state.tapTarget.y - state.player.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 8) {
        state.tapTarget = null;
      } else {
        moveX = dx / dist;
        moveY = dy / dist;
      }
    }

    if (moveX || moveY) {
      const mag = Math.hypot(moveX, moveY);
      const nx = moveX / mag;
      const ny = moveY / mag;
      state.player.x = clamp(state.player.x + nx * PLAYER_SPEED * dt, 44, WORLD.width - 44);
      state.player.y = clamp(state.player.y + ny * PLAYER_SPEED * dt, 78, WORLD.height - 42);
      if (Math.abs(nx) > 0.1) state.player.facing = nx > 0 ? 1 : -1;
    }

    state.messageTimer = Math.max(0, state.messageTimer - dt);
    state.particles = state.particles
      .map((particle) => ({
        ...particle,
        x: particle.x + particle.vx * dt,
        y: particle.y + particle.vy * dt,
        life: particle.life - dt,
      }))
      .filter((particle) => particle.life > 0);
  }

  function draw() {
    const chapter = currentChapter();
    ctx.clearRect(0, 0, WORLD.width, WORLD.height);
    drawBackdrop(chapter);
    drawPath(chapter);
    drawLandmarks(chapter);
    drawNodes(chapter);
    drawPortal(chapter);
    drawTapTarget();
    drawParticles();
    drawPlayer();
    drawChapterBanner(chapter);
  }

  function drawBackdrop(chapter) {
    const gradient = ctx.createLinearGradient(0, 0, 0, WORLD.height);
    gradient.addColorStop(0, chapter.palette.skyTop);
    gradient.addColorStop(0.48, chapter.palette.skyBottom);
    gradient.addColorStop(0.49, chapter.palette.land);
    gradient.addColorStop(1, shade(chapter.palette.land, -12));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WORLD.width, WORLD.height);

    ctx.fillStyle = "rgba(255,255,255,0.72)";
    drawCloud(168, 95, 1);
    drawCloud(640, 86, 0.74);
    drawCloud(1030, 118, 0.9);

    ctx.fillStyle = chapter.id === "festival" ? "rgba(255,236,177,0.86)" : "#ffd957";
    ctx.beginPath();
    ctx.arc(chapter.id === "festival" ? 1030 : 1080, chapter.id === "festival" ? 86 : 82, 42, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = chapter.palette.water;
    ctx.globalAlpha = 0.75;
    ctx.beginPath();
    ctx.ellipse(111, 677, 230, 42, -0.08, 0, Math.PI * 2);
    ctx.ellipse(1162, 696, 230, 44, 0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function drawCloud(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.arc(-42, 14, 25, 0, Math.PI * 2);
    ctx.arc(-13, 0, 35, 0, Math.PI * 2);
    ctx.arc(26, 9, 29, 0, Math.PI * 2);
    ctx.arc(58, 18, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawPath(chapter) {
    const points = [chapter.start, ...chapter.nodes, chapter.portal];
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "rgba(92, 64, 42, 0.28)";
    ctx.lineWidth = 56;
    drawCurvedLine(points);
    ctx.stroke();
    ctx.strokeStyle = chapter.palette.path;
    ctx.lineWidth = 45;
    drawCurvedLine(points);
    ctx.stroke();
    ctx.setLineDash([18, 18]);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(120, 83, 50, 0.34)";
    drawCurvedLine(points);
    ctx.stroke();
    ctx.restore();
  }

  function drawCurvedLine(points) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i += 1) {
      const midX = (points[i].x + points[i + 1].x) / 2;
      const midY = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
    }
    const last = points[points.length - 1];
    ctx.lineTo(last.x, last.y);
  }

  function drawLandmarks(chapter) {
    if (chapter.id === "courtyard") drawHomeScene();
    if (chapter.id === "bazaar") drawBazaarScene();
    if (chapter.id === "school") drawSchoolScene();
    if (chapter.id === "festival") drawFestivalScene();
  }

  function drawHomeScene() {
    drawHouse(166, 236, 210, "#fff8ec", "#d34f45");
    drawTree(1040, 370, 1.04);
    drawWell(875, 588);
    drawSign(382, 610, "घर");
  }

  function drawBazaarScene() {
    drawStall(126, 430, "#df5267", "सेब");
    drawStall(560, 204, "#f3b23c", "खाना");
    drawStall(878, 160, "#047c86", "लाल");
    drawSign(1088, 405, "५");
  }

  function drawSchoolScene() {
    drawBuilding(132, 418, 250, 132, "#f9fafb", "#4457a6", "स्कूल");
    drawBuilding(855, 92, 250, 118, "#fff8e4", "#df5267", "किताब");
    drawSign(620, 628, "दोस्त");
  }

  function drawFestivalScene() {
    drawKite(238, 172, "#df5267");
    drawKite(420, 94, "#f3b23c");
    drawKite(754, 132, "#047c86");
    drawLanterns();
    drawSign(875, 615, "फूल");
  }

  function drawHouse(x, y, size, bodyColor, roofColor) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = bodyColor;
    ctx.strokeStyle = "#2f4058";
    ctx.lineWidth = 5;
    fillRoundRect(0, 72, size, 142, 8);
    strokeRoundRect(0, 72, size, 142, 8);
    ctx.fillStyle = roofColor;
    ctx.beginPath();
    ctx.moveTo(-20, 78);
    ctx.lineTo(size / 2, 0);
    ctx.lineTo(size + 20, 78);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#7b4f2f";
    ctx.fillRect(size / 2 - 24, 140, 48, 74);
    ctx.fillStyle = "#87cfef";
    ctx.fillRect(28, 118, 42, 38);
    ctx.fillRect(size - 70, 118, 42, 38);
    ctx.restore();
  }

  function drawTree(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#7a4c2f";
    ctx.fillRect(-14, 82, 28, 116);
    ctx.fillStyle = "#2f9b70";
    [-50, -12, 34].forEach((offset, index) => {
      ctx.beginPath();
      ctx.arc(offset, 62 - index * 12, 56, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  function drawWell(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "#d9e2ed";
    ctx.strokeStyle = "#66748a";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.ellipse(0, 0, 62, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillRect(-58, 0, 116, 62);
    ctx.strokeRect(-58, 0, 116, 62);
    ctx.fillStyle = "#047c86";
    ctx.beginPath();
    ctx.ellipse(0, 0, 44, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawStall(x, y, color, label) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "#fffaf0";
    ctx.strokeStyle = "#2f4058";
    ctx.lineWidth = 4;
    ctx.fillRect(0, 70, 176, 118);
    ctx.strokeRect(0, 70, 176, 118);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(-12, 74);
    ctx.lineTo(22, 8);
    ctx.lineTo(156, 8);
    ctx.lineTo(188, 74);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#172033";
    ctx.font = "900 30px 'Noto Sans Devanagari', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, 88, 136);
    ctx.restore();
  }

  function drawBuilding(x, y, w, h, bodyColor, roofColor, label) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = bodyColor;
    ctx.strokeStyle = "#2f4058";
    ctx.lineWidth = 5;
    fillRoundRect(0, 42, w, h, 8);
    strokeRoundRect(0, 42, w, h, 8);
    ctx.fillStyle = roofColor;
    ctx.fillRect(-12, 8, w + 24, 44);
    ctx.strokeRect(-12, 8, w + 24, 44);
    ctx.fillStyle = "#87cfef";
    for (let i = 0; i < 3; i += 1) {
      ctx.fillRect(28 + i * 70, 82, 38, 34);
    }
    ctx.fillStyle = "#172033";
    ctx.font = "900 30px 'Noto Sans Devanagari', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, w / 2, 38);
    ctx.restore();
  }

  function drawKite(x, y, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.strokeStyle = "#2f4058";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -42);
    ctx.lineTo(42, 0);
    ctx.lineTo(0, 54);
    ctx.lineTo(-42, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 54);
    ctx.quadraticCurveTo(20, 92, 0, 128);
    ctx.quadraticCurveTo(-18, 156, 18, 186);
    ctx.stroke();
    ctx.restore();
  }

  function drawLanterns() {
    ctx.save();
    ctx.strokeStyle = "rgba(23,32,51,0.46)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(80, 250);
    ctx.quadraticCurveTo(640, 180, 1200, 250);
    ctx.stroke();
    for (let i = 0; i < 10; i += 1) {
      const x = 130 + i * 112;
      const y = 238 + Math.sin(i * 0.8) * 22;
      ctx.fillStyle = i % 2 ? "#f3b23c" : "#df5267";
      fillRoundRect(x - 18, y, 36, 42, 8);
    }
    ctx.restore();
  }

  function drawSign(x, y, label) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "#7b4f2f";
    ctx.fillRect(-7, 35, 14, 58);
    ctx.fillStyle = "#fff8e4";
    ctx.strokeStyle = "#2f4058";
    ctx.lineWidth = 4;
    fillRoundRect(-52, -8, 104, 52, 8);
    strokeRoundRect(-52, -8, 104, 52, 8);
    ctx.fillStyle = "#172033";
    ctx.font = "900 27px 'Noto Sans Devanagari', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, 0, 19);
    ctx.restore();
  }

  function drawNodes(chapter) {
    chapter.nodes.forEach((node, index) => {
      const word = WORD_BY_ID.get(node.wordId);
      const done = state.completed.has(node.id);
      const pulse = 1 + Math.sin(state.time * 4 + index) * 0.06;
      ctx.save();
      ctx.translate(node.x, node.y);
      ctx.scale(pulse, pulse);
      ctx.fillStyle = done ? "rgba(47,155,112,0.28)" : "rgba(243,178,60,0.24)";
      ctx.beginPath();
      ctx.arc(0, 0, 48, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = done ? "#2f9b70" : "#f3b23c";
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, -36);
      ctx.lineTo(32, -8);
      ctx.lineTo(20, 34);
      ctx.lineTo(-20, 34);
      ctx.lineTo(-32, -8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#172033";
      ctx.font = "900 25px 'Noto Sans Devanagari', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(done ? firstGlyph(word.hindi) : "?", 0, 0);
      ctx.restore();

      ctx.save();
      ctx.fillStyle = "rgba(23,32,51,0.72)";
      ctx.font = "850 17px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(done ? word.hindi : "Lesson", node.x, node.y + 66);
      ctx.restore();
    });
  }

  function drawPortal(chapter) {
    const open = chapterComplete(chapter);
    const pulse = open ? Math.sin(state.time * 5) * 0.08 + 1 : 1;
    ctx.save();
    ctx.translate(chapter.portal.x, chapter.portal.y);
    ctx.scale(pulse, pulse);
    ctx.fillStyle = open ? "rgba(122,79,177,0.22)" : "rgba(100,112,132,0.18)";
    ctx.beginPath();
    ctx.arc(0, 0, 70, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 12;
    ctx.strokeStyle = open ? "#7a4fb1" : "#7d8797";
    ctx.beginPath();
    ctx.arc(0, 10, 50, Math.PI, Math.PI * 2);
    ctx.lineTo(50, 70);
    ctx.lineTo(-50, 70);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = open ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.38)";
    fillRoundRect(-35, 14, 70, 56, 8);
    ctx.fillStyle = open ? "#172033" : "#66748a";
    ctx.font = "900 26px 'Noto Sans Devanagari', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(open ? "ज्ञान" : "बंद", 0, 52);
    ctx.restore();
  }

  function drawTapTarget() {
    if (!state.tapTarget) return;
    ctx.save();
    ctx.strokeStyle = "rgba(68,87,166,0.72)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(state.tapTarget.x, state.tapTarget.y, 18 + Math.sin(state.time * 8) * 4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawParticles() {
    state.particles.forEach((particle) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, particle.life));
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  function drawPlayer() {
    const bob = Math.sin(state.time * 10) * 2;
    ctx.save();
    ctx.translate(state.player.x, state.player.y + bob);
    ctx.scale(state.player.facing, 1);
    ctx.fillStyle = "rgba(23,32,51,0.18)";
    ctx.beginPath();
    ctx.ellipse(0, 28, 30, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f0b985";
    ctx.beginPath();
    ctx.arc(0, -32, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#172033";
    ctx.beginPath();
    ctx.arc(0, -42, 20, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#4457a6";
    fillRoundRect(-19, -12, 38, 48, 8);
    ctx.fillStyle = "#f3b23c";
    ctx.fillRect(-22, -10, 44, 9);
    ctx.strokeStyle = "#172033";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-12, 36);
    ctx.lineTo(-18, 58);
    ctx.moveTo(12, 36);
    ctx.lineTo(18, 58);
    ctx.moveTo(-20, 3);
    ctx.lineTo(-36, 18);
    ctx.moveTo(20, 3);
    ctx.lineTo(36, 14);
    ctx.stroke();
    ctx.restore();
  }

  function drawChapterBanner(chapter) {
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.86)";
    ctx.strokeStyle = "rgba(217,226,237,0.88)";
    ctx.lineWidth = 2;
    fillRoundRect(28, 24, 306, 70, 8);
    strokeRoundRect(28, 24, 306, 70, 8);
    ctx.fillStyle = "#075b66";
    ctx.font = "900 17px Inter, sans-serif";
    ctx.fillText(chapter.english, 48, 50);
    ctx.fillStyle = "#172033";
    ctx.font = "950 30px 'Noto Sans Devanagari', sans-serif";
    ctx.fillText(chapter.hindi, 48, 82);
    ctx.restore();
  }

  function interactWithNearby() {
    const action = nearbyAction();
    if (!action) return;

    if (action.type === "node") {
      openChallenge(action.node);
      return;
    }

    if (action.type === "portal") {
      advanceChapter();
    }
  }

  function openChallenge(node) {
    const word = WORD_BY_ID.get(node.wordId);
    const mode = MODES[node.mode];
    const options = buildOptions(word);
    state.challenge = {
      accepting: true,
      disabledIds: new Set(),
      lastWrong: "",
      mode,
      node,
      options,
      word,
    };
    renderChallenge();
    els.challengeOverlay.hidden = false;
    window.setTimeout(() => els.listen.focus(), 0);
    if (node.mode === "listen") {
      playWord(word, els.listen);
    }
  }

  function renderChallenge() {
    const challenge = state.challenge;
    if (!challenge) return;

    const { mode, word } = challenge;
    els.challengeMode.textContent = mode.label;
    els.challengeTitle.textContent = mode.title(word);
    els.challengePrompt.textContent = mode.prompt(word);
    els.challengeHint.textContent = mode.hint(word);
    els.challengeArt.textContent = firstGlyph(word.hindi);
    els.choiceGrid.textContent = "";

    challenge.options.forEach((option, index) => {
      const button = document.createElement("button");
      const isDisabled = challenge.disabledIds.has(option.id) || !challenge.accepting;
      button.className = "choice-button";
      button.type = "button";
      button.dataset.id = option.id;
      button.disabled = isDisabled;
      button.innerHTML = `
        <span>
          <span class="choice-main">${mode.main(option)}</span>
          <span class="choice-sub">${mode.sub(option)}</span>
        </span>
        <span class="choice-index" aria-hidden="true">${index + 1}</span>
      `;
      if (challenge.lastWrong === option.id) button.classList.add("wrong");
      button.addEventListener("click", () => chooseOption(option.id));
      els.choiceGrid.append(button);
    });
  }

  function chooseOption(id) {
    const challenge = state.challenge;
    if (!challenge || !challenge.accepting || challenge.disabledIds.has(id)) return;

    const correct = id === challenge.word.id;
    if (correct) {
      challenge.accepting = false;
      completeNode(challenge.node, challenge.word);
      renderChallengeResult(id, true);
      playTone(true);
      window.setTimeout(closeChallenge, 900);
      return;
    }

    state.focus -= 1;
    state.streak = 0;
    challenge.disabledIds.add(id);
    challenge.lastWrong = id;
    challenge.accepting = false;
    renderChallengeResult(id, false);
    playTone(false);
    syncPanels();

    window.setTimeout(() => {
      if (!state.challenge) return;
      if (state.focus <= 0) {
        closeChallenge();
        resetFocus();
        return;
      }
      state.challenge.accepting = true;
      renderChallenge();
      els.challengeFeedback.textContent = "Try the glowing answer.";
      els.challengeFeedback.className = "challenge-feedback careful";
    }, 900);
  }

  function renderChallengeResult(id, correct) {
    const challenge = state.challenge;
    if (!challenge) return;

    [...els.choiceGrid.querySelectorAll(".choice-button")].forEach((button) => {
      const isCorrect = button.dataset.id === challenge.word.id;
      if (isCorrect) button.classList.add("correct");
      if (!correct && button.dataset.id === id) button.classList.add("wrong");
      button.disabled = true;
    });

    if (correct) {
      els.challengeFeedback.textContent = `सही! ${challenge.word.hindi} means ${titleCase(challenge.word.english)}.`;
      els.challengeFeedback.className = "challenge-feedback good";
    } else {
      els.challengeFeedback.textContent = `${challenge.word.hindi} means ${titleCase(challenge.word.english)}.`;
      els.challengeFeedback.className = "challenge-feedback careful";
    }
  }

  function closeChallenge() {
    state.challenge = null;
    els.challengeOverlay.hidden = true;
    syncPanels();
  }

  function completeNode(node, word) {
    if (state.completed.has(node.id)) return;

    state.completed.add(node.id);
    state.learned.set(word.id, word);
    state.gems += 1;
    state.streak += 1;
    state.score += 80 + Math.min(40, state.streak * 8);
    if (state.streak > 0 && state.streak % 3 === 0) {
      state.focus = Math.min(MAX_FOCUS, state.focus + 1);
    }
    saveBest();
    burst(node.x, node.y);

    if (chapterComplete(currentChapter())) {
      setMessage("ज्ञान द्वार खुल गया!");
    } else {
      setMessage(`${word.hindi} joined your journal.`);
    }

    syncPanels();
  }

  function resetFocus() {
    state.focus = MAX_FOCUS;
    state.player.x = currentChapter().start.x;
    state.player.y = currentChapter().start.y;
    state.tapTarget = null;
    setMessage("Fresh focus for this chapter.");
    syncPanels();
  }

  function advanceChapter() {
    const chapter = currentChapter();
    if (!chapterComplete(chapter)) {
      setMessage("More Hindi gems are waiting.");
      return;
    }

    if (state.chapterIndex >= CHAPTERS.length - 1) {
      showVictory();
      return;
    }

    state.chapterIndex += 1;
    const next = currentChapter();
    state.player.x = next.start.x;
    state.player.y = next.start.y;
    state.tapTarget = null;
    state.focus = MAX_FOCUS;
    burst(next.start.x, next.start.y);
    setMessage(next.line);
    syncPanels();
  }

  function showVictory() {
    saveBest();
    els.victoryCopy.textContent = `You found ${state.gems} Hindi gems and scored ${state.score} stars.`;
    els.victoryOverlay.hidden = false;
    burst(state.player.x, state.player.y);
  }

  function buildOptions(target) {
    const chapterWordIds = currentChapter().nodes.map((node) => node.wordId);
    const nearWords = chapterWordIds.map((id) => WORD_BY_ID.get(id)).filter((word) => word.id !== target.id);
    const pool = shuffle([...nearWords, ...WORDS.filter((word) => word.id !== target.id && !chapterWordIds.includes(word.id))]);
    return shuffle([target, ...pool.slice(0, 3)]);
  }

  function syncPanels() {
    const chapter = currentChapter();
    const doneCount = chapter.nodes.filter((node) => state.completed.has(node.id)).length;
    const progress = (doneCount / chapter.nodes.length) * 100;
    const latest = latestWord();

    els.score.textContent = state.score;
    els.gem.textContent = state.gems;
    els.best.textContent = state.best;
    els.chapterTitle.textContent = chapter.hindi;
    els.chapterSubtitle.textContent = chapter.english;
    els.questLine.textContent = state.message || chapter.line;
    els.chapterProgress.style.width = `${progress}%`;
    els.phraseHindi.textContent = latest?.sentence || "नमस्ते";
    els.phraseEnglish.textContent = latest?.sentenceEnglish || "Hello";

    els.focusRow.textContent = "";
    for (let i = 0; i < MAX_FOCUS; i += 1) {
      const heart = document.createElement("span");
      heart.className = `focus-heart${i >= state.focus ? " empty" : ""}`;
      els.focusRow.append(heart);
    }

    renderJournal();
  }

  function renderJournal() {
    const learned = [...state.learned.values()].slice(-9).reverse();
    els.journalCount.textContent = state.learned.size;
    els.journalList.textContent = "";

    if (!learned.length) {
      const empty = document.createElement("li");
      empty.innerHTML = `
        <span class="journal-icon" aria-hidden="true">य</span>
        <span>
          <span class="journal-word">यात्रा</span>
          <span class="journal-meaning">journey · yatra</span>
        </span>
      `;
      els.journalList.append(empty);
      return;
    }

    learned.forEach((word) => {
      const item = document.createElement("li");
      item.innerHTML = `
        <span class="journal-icon" aria-hidden="true">${firstGlyph(word.hindi)}</span>
        <span>
          <span class="journal-word">${word.hindi}</span>
          <span class="journal-meaning">${titleCase(word.english)} · ${word.translit}</span>
        </span>
      `;
      els.journalList.append(item);
    });
  }

  function syncNearby() {
    const action = nearbyAction();
    if (!action) {
      els.nearbyChip.hidden = true;
      return;
    }

    els.nearbyChip.hidden = false;
    if (action.type === "portal") {
      els.nearbyTitle.textContent = "Path open";
      els.nearbyWord.textContent = "ज्ञान द्वार";
      return;
    }

    const word = WORD_BY_ID.get(action.node.wordId);
    els.nearbyTitle.textContent = "Lesson found";
    els.nearbyWord.textContent = `${word.hindi} · ${titleCase(word.english)}`;
  }

  function nearbyAction() {
    const chapter = currentChapter();
    const node = chapter.nodes.find((candidate) => {
      return !state.completed.has(candidate.id) && distance(state.player, candidate) <= INTERACT_RADIUS;
    });
    if (node) return { type: "node", node };

    if (chapterComplete(chapter) && distance(state.player, chapter.portal) <= PORTAL_RADIUS) {
      return { type: "portal" };
    }

    return null;
  }

  function currentChapter() {
    return CHAPTERS[state.chapterIndex];
  }

  function chapterComplete(chapter) {
    return chapter.nodes.every((node) => state.completed.has(node.id));
  }

  function latestWord() {
    const words = [...state.learned.values()];
    if (state.challenge) return state.challenge.word;
    if (words.length) return words[words.length - 1];
    const firstNode = currentChapter().nodes.find((node) => !state.completed.has(node.id)) || currentChapter().nodes[0];
    return WORD_BY_ID.get(firstNode.wordId);
  }

  function setMessage(message) {
    state.message = message;
    state.messageTimer = 4;
    syncPanels();
  }

  function burst(x, y) {
    const colors = ["#f3b23c", "#df5267", "#047c86", "#2f9b70", "#7a4fb1"];
    for (let i = 0; i < 24; i += 1) {
      const angle = (Math.PI * 2 * i) / 24;
      const speed = 70 + Math.random() * 130;
      state.particles.push({
        color: colors[i % colors.length],
        life: 0.55 + Math.random() * 0.55,
        size: 4 + Math.random() * 4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 40,
        x,
        y,
      });
    }
  }

  function chooseAudioFormat() {
    const probe = document.createElement("audio");
    return AUDIO_FORMATS.find((format) => probe.canPlayType(format.type))?.ext || "mp3";
  }

  function playWord(word, button) {
    if (!word) return;
    pulse(button);

    const format = preferredAudioFormat || "mp3";
    els.voiceAudio.pause();
    els.voiceAudio.currentTime = 0;
    els.voiceAudio.src = `${AUDIO_DIR}/${word.id}.${format}`;
    const playPromise = els.voiceAudio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => speakHindi(word.hindi));
    }
  }

  function speakHindi(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = HINDI_LANG;
    utterance.rate = 0.82;
    const hindiVoice = cachedVoices.find((voice) => voice.lang && voice.lang.toLowerCase().startsWith("hi"));
    if (hindiVoice) utterance.voice = hindiVoice;
    window.speechSynthesis.speak(utterance);
  }

  function playTone(success) {
    try {
      const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextCtor) return;
      audioContext = audioContext || new AudioContextCtor();
      const now = audioContext.currentTime;
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = success ? "triangle" : "sawtooth";
      osc.frequency.setValueAtTime(success ? 640 : 190, now);
      osc.frequency.exponentialRampToValueAtTime(success ? 980 : 130, now + 0.18);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start(now);
      osc.stop(now + 0.24);
    } catch {
      // Audio feedback is optional; pronunciation remains available.
    }
  }

  function pulse(button) {
    if (!button) return;
    button.classList.remove("is-playing");
    void button.offsetWidth;
    button.classList.add("is-playing");
    window.setTimeout(() => button.classList.remove("is-playing"), 500);
  }

  function resizeCanvas() {
    canvasRect = els.canvas.getBoundingClientRect();
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    els.canvas.width = Math.round(canvasRect.width * dpr);
    els.canvas.height = Math.round(canvasRect.height * dpr);
    ctx.setTransform(els.canvas.width / WORLD.width, 0, 0, els.canvas.height / WORLD.height, 0, 0);
  }

  function readBest() {
    const stored = Number(window.localStorage.getItem(BEST_KEY));
    return Number.isFinite(stored) ? stored : 0;
  }

  function saveBest() {
    state.best = Math.max(state.best, state.score);
    window.localStorage.setItem(BEST_KEY, String(state.best));
    els.best.textContent = state.best;
  }

  function shuffle(items) {
    const list = [...items];
    for (let i = list.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function titleCase(value) {
    return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function firstGlyph(value) {
    return Array.from(value)[0] || value;
  }

  function shade(hex, amount) {
    const normalized = hex.replace("#", "");
    const n = Number.parseInt(normalized, 16);
    const r = clamp((n >> 16) + amount, 0, 255);
    const g = clamp(((n >> 8) & 255) + amount, 0, 255);
    const b = clamp((n & 255) + amount, 0, 255);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function roundedRectPath(x, y, width, height, radius) {
    const r = Math.min(radius, Math.abs(width) / 2, Math.abs(height) / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function fillRoundRect(x, y, width, height, radius) {
    roundedRectPath(x, y, width, height, radius);
    ctx.fill();
  }

  function strokeRoundRect(x, y, width, height, radius) {
    roundedRectPath(x, y, width, height, radius);
    ctx.stroke();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.HindiWordYatra = {
    chapters: CHAPTERS,
    words: WORDS,
    test: {
      buildOptions,
      chapterComplete,
      currentChapter,
      latestWord,
      state,
    },
  };
})();

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const js = readFileSync(join(root, "game.js"), "utf8");

class FakeClassList {
  constructor(owner) {
    this.owner = owner;
    this.names = new Set();
  }

  add(...names) {
    names.forEach((name) => this.names.add(name));
    this.owner.className = [...this.names].join(" ");
  }

  remove(...names) {
    names.forEach((name) => this.names.delete(name));
    this.owner.className = [...this.names].join(" ");
  }

  contains(name) {
    return this.names.has(name);
  }
}

class FakeElement {
  constructor(tagName = "div") {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.className = "";
    this.classList = new FakeClassList(this);
    this.dataset = {};
    this.disabled = false;
    this.hidden = false;
    this.style = {};
    this.listeners = {};
    this.textContent = "";
    this.width = 1280;
    this.height = 720;
  }

  addEventListener(type, handler) {
    this.listeners[type] = handler;
  }

  append(...children) {
    this.children.push(...children);
  }

  focus() {}

  getBoundingClientRect() {
    return { left: 0, top: 0, width: 1280, height: 720 };
  }

  getContext() {
    return fakeCanvasContext();
  }

  pause() {}

  play() {
    return Promise.resolve();
  }

  canPlayType(type) {
    return type.includes("mp4") ? "probably" : "maybe";
  }

  querySelectorAll(selector) {
    if (selector === ".choice-button") {
      return this.children.filter((child) => String(child.className).includes("choice-button"));
    }
    return [];
  }

  set innerHTML(value) {
    this._innerHTML = value;
  }

  get innerHTML() {
    return this._innerHTML || "";
  }
}

function fakeCanvasContext() {
  const noop = () => {};
  return {
    arc: noop,
    beginPath: noop,
    clearRect: noop,
    closePath: noop,
    createLinearGradient: () => ({ addColorStop: noop }),
    ellipse: noop,
    fill: noop,
    fillRect: noop,
    fillText: noop,
    lineTo: noop,
    moveTo: noop,
    quadraticCurveTo: noop,
    restore: noop,
    rotate: noop,
    save: noop,
    scale: noop,
    setLineDash: noop,
    setTransform: noop,
    stroke: noop,
    strokeRect: noop,
    translate: noop,
  };
}

const ids = [
  "bestValue",
  "challengeArt",
  "challengeFeedback",
  "challengeHint",
  "challengeMode",
  "challengeOverlay",
  "challengePrompt",
  "challengeTitle",
  "chapterProgressBar",
  "chapterSubtitle",
  "chapterTitle",
  "choiceGrid",
  "closeChallengeButton",
  "focusRow",
  "gameCanvas",
  "gemValue",
  "interactButton",
  "journalCount",
  "journalList",
  "keepExploringButton",
  "listenButton",
  "nearbyChip",
  "nearbyTitle",
  "nearbyWord",
  "phraseEnglish",
  "phraseHindi",
  "playAgainButton",
  "questLine",
  "restartButton",
  "scoreValue",
  "soundButton",
  "touchInteractButton",
  "victoryCopy",
  "victoryOverlay",
  "voiceAudio",
];

const elements = new Map(ids.map((id) => [id, new FakeElement(id === "gameCanvas" ? "canvas" : "div")]));
const moveButtons = ["up", "left", "down", "right"].map((dir) => {
  const button = new FakeElement("button");
  button.dataset.dir = dir;
  return button;
});

let frameCount = 0;
const sandbox = {
  AudioContext: undefined,
  SpeechSynthesisUtterance: class SpeechSynthesisUtterance {
    constructor(text) {
      this.text = text;
    }
  },
  console,
  document: {
    addEventListener: () => {},
    createElement: (tagName) => new FakeElement(tagName),
    querySelector: (selector) => elements.get(selector.replace("#", "")) || new FakeElement(),
    querySelectorAll: (selector) => (selector === ".move-pad button" ? moveButtons : []),
    readyState: "complete",
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {},
  },
  requestAnimationFrame: (callback) => {
    frameCount += 1;
    if (frameCount <= 2) callback(frameCount * 16);
    return frameCount;
  },
  setTimeout: (callback) => {
    if (typeof callback === "function") callback();
    return 1;
  },
  window: null,
};

sandbox.window = sandbox;
sandbox.window.devicePixelRatio = 1;
sandbox.window.localStorage = sandbox.localStorage;
sandbox.window.speechSynthesis = {
  addEventListener: () => {},
  cancel: () => {},
  getVoices: () => [],
  speak: () => {},
};
sandbox.window.addEventListener = () => {};

vm.runInNewContext(js, sandbox, { filename: "game.js" });

const game = sandbox.window.HindiWordYatra;
assert(game, "Game did not expose test hooks");
assert(game.words.length === 32, "Unexpected word count");
assert(game.chapters.length === 4, "Unexpected chapter count");
assert(game.test.currentChapter().nodes.length === 4, "Unexpected lesson node count");
assert(game.test.latestWord().id === "namaste", "Unexpected first learning word");

console.log("Hindi Word Yatra runtime smoke passed.");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

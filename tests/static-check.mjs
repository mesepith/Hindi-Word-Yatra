import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const html = readFileSync(join(root, "index.html"), "utf8");
const css = readFileSync(join(root, "styles.css"), "utf8");
const js = readFileSync(join(root, "game.js"), "utf8");

const requiredIds = [
  "gameCanvas",
  "scoreValue",
  "gemValue",
  "bestValue",
  "chapterTitle",
  "chapterSubtitle",
  "questLine",
  "phraseHindi",
  "phraseEnglish",
  "journalList",
  "challengeOverlay",
  "choiceGrid",
  "pathOverlay",
  "tutorialButton",
  "tutorialOverlay",
  "voiceAudio",
];

for (const id of requiredIds) {
  assert(html.includes(`id="${id}"`), `Missing #${id} in index.html`);
}

assert(html.includes("styles.css?v=2"), "Stylesheet link is missing cache version");
assert(html.includes("game.js?v=2"), "Script link is missing cache version");
assert(html.includes('href="favicon.svg"'), "Favicon link missing");
assert(existsSync(join(root, "favicon.svg")), "Favicon file missing");
assert(css.includes("@media (max-width: 720px)"), "Mobile layout media query missing");
assert(css.includes("touch-action: none"), "Canvas touch action guard missing");

new Function(js);

const wordIds = [...js.matchAll(/id: "([a-z0-9-]+)", hindi:/g)].map((match) => match[1]);
assert(wordIds.length >= 30, "Expected at least 30 Hindi words");

const chapterWordIds = [...js.matchAll(/wordId: "([a-z0-9-]+)"/g)].map((match) => match[1]);
assert(chapterWordIds.length === 16, "Expected 16 adventure lesson nodes");

for (const id of chapterWordIds) {
  assert(wordIds.includes(id), `Chapter references missing word: ${id}`);
}

for (const id of wordIds) {
  for (const ext of ["m4a", "mp3", "ogg"]) {
    assert(existsSync(join(root, "assets", "audio", `${id}.${ext}`)), `Missing audio: ${id}.${ext}`);
  }
}

console.log(`Hindi Word Yatra static check passed: ${wordIds.length} words, ${chapterWordIds.length} lesson nodes.`);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

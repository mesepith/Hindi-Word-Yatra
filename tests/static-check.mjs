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

assert(html.includes("styles.css?v=11"), "Stylesheet link is missing cache version");
assert(html.includes("game.js?v=11"), "Script link is missing cache version");
assert(html.includes('href="favicon.svg"'), "Favicon link missing");
assert(existsSync(join(root, "favicon.svg")), "Favicon file missing");
assert(css.includes("@media (max-width: 720px)"), "Mobile layout media query missing");
assert(css.includes("touch-action: none"), "Canvas touch action guard missing");
assert(html.includes('<button class="nearby-chip"'), "Nearby lesson chip should be one large button");
assert(!html.includes('<div class="nearby-chip"'), "Nearby lesson chip must not be a nested clickable panel");
assert(!html.includes("move-pad"), "Mobile arrow pad should not be rendered");
assert(!html.includes("touch arrows"), "Tutorial should not mention removed touch arrows");
assert(html.includes("The Hindi word plays automatically"), "Tutorial should explain automatic word audio");
assert(html.includes("answer a memory question"), "Tutorial should explain the Gyan memory question");
assert(!html.includes("touchInteractButton"), "Mobile action overlay should not be rendered");
assert(!css.includes(".move-pad"), "Mobile arrow pad CSS should be removed");
assert(!js.includes("touchVector"), "Mobile movement should use tap-to-move instead of arrow overlay state");
assert(css.includes(".nearby-chip > *") && css.includes("pointer-events: none"), "Nearby chip children should not intercept Safari taps");
assert(js.includes('addEventListener("pointerup", handleNearbyChipActivate)'), "Nearby chip needs pointerup tap fallback");
assert(!js.includes("els.nearbyWord.textContent = `${word.hindi}"), "Nearby chip must not reveal lesson answers");
assert(js.includes("stageNumberFor"), "Nearby chip should use stage labels instead of word previews");
assert(js.includes('drawStall(418, 78, "#f3b23c", "खाना")'), "Bazaar food stall should stay clear of lesson markers");
assert(js.includes("guideToTarget(first, \"Tap Stage 1\""), "Tutorial close should guide the first stage");
assert(js.includes("showPendingGuide();"), "Quiz close should reveal the next-stage guide");
assert(js.includes('hint: () => "Choose the English meaning."'), "Meaning questions should not reveal transliteration hints");
assert(js.includes("showVisualLabel: false"), "Meaning options should hide Hindi labels in visuals");
assert(js.includes('sub: () => ""'), "Meaning options should not show transliteration subtitles");
assert(!js.includes("Sounds like:"), "No question hint should reveal the answer transliteration");
assert(!js.includes("flashUnlock(target, title, color);"), "Guide callout should not duplicate unlock text");
assert(!css.includes("width: min(100%, 390px)"), "Mobile layout should not create a fixed narrow gutter");
assert(js.includes('kind: "gyan"'), "Gyan gate should ask a memory quiz before travel");
assert(js.includes("Memory gate cleared"), "Correct Gyan answer should show a memory success reveal");
assert(css.includes(".challenge-card.is-complete"), "Correct answers should use a centered reveal state");
assert(css.includes("height: calc(100vh - 118px)"), "Desktop game canvas should fill the play viewport");
assert(css.includes("height: calc(100dvh - 98px)"), "Mobile game canvas should fill the visible play viewport");
assert(css.includes(".side-panel {\n    display: none;"), "Mobile play view should hide journal panels");
assert(css.includes(".adventure-layout") && css.includes("grid-template-columns: 1fr"), "Map should occupy the full play width");
assert(!js.includes('if (node.mode === "listen")'), "Lesson modal should auto-play every word, not only listen mode");
assert(!js.includes("state.portalTarget = false;\n            advanceChapter();"), "Portal arrival should open the Gyan memory quiz");
assert(!js.includes("state.portalTarget = false;\n          advanceChapter();"), "Direct portal tap should open the Gyan memory quiz");
assert(!js.includes("word.translit} · ${titleCase(word.english)"), "Choice subtitles must not reveal English answers");
assert(js.includes("choice-visual"), "Choice options should include visual illustrations");

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

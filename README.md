# Hindi Word Yatra

An HTML5 Hindi learning adventure for Indian American kids. Players move through four colorful chapters, collect Hindi word gems, hear pronunciation, and unlock the final ज्ञान द्वार.

## Run

Open `index.html` directly, or visit:

```text
http://localhost/panya/games/hindi-word-yatra/
```

No build step or network access is required.

## Gameplay

- Explore the map with keyboard movement, touch controls, or tap-to-move.
- Start glowing lessons to learn Hindi words, meanings, sounds, and sentence usage.
- Correct answers add words to the journal and open the chapter gate.
- Pronunciation uses packaged `.m4a`, `.mp3`, and `.ogg` files with Web Speech fallback.

## Local Smoke Test

```sh
node tests/static-check.mjs
node tests/runtime-smoke.mjs
```

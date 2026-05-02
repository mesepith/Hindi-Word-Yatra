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
- First-time players see a short tutorial, and the help button can reopen it.
- The title carries the by Zahir credit in the header.
- Start the single glowing lesson; later lessons stay locked until the current one is completed.
- Question dialogs include a small visual card for the current Hindi word.
- Correct answers stay on screen briefly, add words to the journal, and animate the next unlock.
- Tap the ज्ञान द्वार after all chapter words are complete to open the next level.
- Pronunciation uses packaged `.m4a`, `.mp3`, and `.ogg` files with Web Speech fallback.

## Local Smoke Test

```sh
node tests/static-check.mjs
node tests/runtime-smoke.mjs
```

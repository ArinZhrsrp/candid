# CANDID — Prompt Engine · POV Affiliate

A single-page web app that generates ready-to-paste AI image/video prompts for affiliate/UGC-style product content (TikTok, IG Reels/Feed, Facebook, Shopee/Lazada, YouTube Shorts). Built for Malay-speaking affiliate/content creators — the UI copy is in Bahasa Melayu, and the generated prompts are in English (for best results with tools like Midjourney, Nano Banana/Gemini, Kling, Runway, DALL-E, Seedance, etc).

The core idea: same settings should never produce the same prompt twice. Every generation randomizes lighting, pose, and scene details so batches of prompts don't look templated.

## Features

- **Platform & aspect ratio presets** — auto-sets image/video size and platform-specific styling for TikTok, IG Reels/Feed, Facebook, Shopee/Lazada, YouTube Shorts.
- **Product-aware scene suggestions** — describe the product and let the engine auto-suggest scenes, or write your own; category auto-detection informs background/mood suggestions.
- **Image & video prompt generation** — narrative (sentence) or structured (`[LABEL]`) format, the latter suited for AI image-editors that need to preserve a reference product exactly.
- **Multi-image composite mode** — prompts for AI tools that accept multiple reference images (product / background / extra elements).
- **Storyboard mode** — multi-scene/panel prompts (grid, shot list, single sheet, branded social studio, or UGC hook→CTA structure), with configurable scene count and duration.
- **Video mode** — standalone video prompts with auto-divided camera movements, optionally based on an uploaded storyboard sheet.
- **Detailed visual controls** — POV type, camera angle/shot, product placement/hold style, visual style, model (woman/man/mascot/none), outfit + color, hijab, skin tone, age range, camera style, hand accessories, location, ambience/mood, weather, custom backgrounds, text banners, and a "Kawaii" aesthetic pack (doodles, props).
- **History** — generated prompts are saved locally (`localStorage`) so you can revisit past batches. History and preferences are device/browser-local only — no backend, no cloud sync.
- **Copy & regenerate** — one-click copy of all generated prompts, or regenerate variations with the same settings.

## Tech stack

Plain HTML/CSS/JavaScript — no build step, no dependencies, no backend.

```
index.html                  # landing/showcase page (marketing site)
candid-prompt-studio.html   # the tool itself — markup/UI
css/landing.css             # landing page styling
css/styles.css              # tool styling
js/script.js                 # all app logic (state, prompt generation, storage)
media/                       # result images shown on the landing page (see media/README.md)
```

## Running locally

Open `index.html` for the landing page, or `candid-prompt-studio.html` to go straight to the tool — no server or install required.

```bash
# optional: serve locally instead of using file://
npx serve .
```

## Usage

1. Pick a platform and aspect ratio (Section 01).
2. Describe the product — type, brand, short description — and optionally pick/auto-detect a category (Section 02).
3. Choose output type (image/video), format, and any storyboard/multi-image/composite options (Section 03).
4. Fine-tune visual settings — POV, angle, styling, model, outfit, location, mood, etc. (Section 04).
5. Click **JANA PROMPT** to generate. Copy the result or regenerate for new variations.
6. Past generations are listed under **Riwayat** (History) and can be cleared at any time.

# CANDID — Prompt Engine · POV Affiliate

A single-page web app that generates ready-to-paste AI image/video prompts for affiliate/UGC-style product content (TikTok, IG Reels/Feed, Facebook, Shopee/Lazada, YouTube Shorts). Built for Malay-speaking affiliate/content creators — the UI copy is in Bahasa Melayu, and the generated prompts are in English (for best results with tools like Midjourney, Nano Banana/Gemini, Kling, Runway, DALL-E, Seedance, etc).

The core idea: same settings should never produce the same prompt twice. Every generation randomizes lighting, pose, and scene details so batches of prompts don't look templated.

## Features

- **Platform & aspect ratio presets** — auto-sets image/video size and platform-specific styling for TikTok, IG Reels/Feed, Facebook, Shopee/Lazada, YouTube Shorts.
- **AI-assisted scene suggestions** — describe the product and get contextual scene ideas tailored to the product *and* the location/ambience you've already picked, or write your own. Tiered fallback (Gemini → Groq → in-browser WebLLM → local template) means it degrades gracefully instead of failing outright; a status toast shows which tier is being tried.
- **AI-enhanced prompt generation** — "Jana Prompt"/"Regenerate Variasi" can rewrite the generated prompt into more natural, less templated language using the same tiered fallback. Only applied to narrative single-image/video output — structured (`[LABEL]`), storyboard, UGC, and multi-image composite prompts always stay fully deterministic, since those formats are parsed by other AI tools and must not be reworded.
- **Image & video prompt generation** — narrative (sentence) or structured (`[LABEL]`) format, the latter suited for AI image-editors that need to preserve a reference product exactly.
- **Multi-image composite mode** — prompts for AI tools that accept multiple reference images (product / background / extra elements).
- **Storyboard mode** — multi-scene/panel prompts (grid, shot list, single sheet, branded social studio, or UGC hook→CTA structure), with configurable scene count and duration.
- **Video mode** — standalone video prompts with auto-divided camera movements, optionally based on an uploaded storyboard sheet.
- **Detailed visual controls** — POV type, camera angle/shot, product placement/hold style, visual style, model (woman/man/mascot/none), outfit + color, hijab, skin tone, age range, camera style, hand accessories, location, ambience/mood, weather, custom backgrounds, text banners, and a "Kawaii" aesthetic pack (doodles, props).
- **History** — generated prompts are saved locally (`localStorage`) so you can revisit past batches. History and preferences are device/browser-local only — no cloud sync.
- **Copy & regenerate** — one-click copy of all generated prompts, or regenerate variations with the same settings.

See [CHANGELOG.md](CHANGELOG.md) for version history.

## Tech stack

Plain HTML/CSS/JavaScript on the frontend — no build step, no framework. AI features are backed by a couple of small Vercel serverless functions (no database, no persistent backend state).

```
index.html                  # landing/showcase page (marketing site)
candid-prompt-studio.html   # the tool itself — markup/UI
css/landing.css             # landing page styling
css/styles.css              # tool styling
js/script.js                 # all app logic (state, prompt generation, AI tiers, storage)
api/ai-suggest.js           # serverless: AI scene suggestions (Gemini/Groq)
api/ai-enhance-prompt.js    # serverless: AI prompt rewriting (Gemini/Groq)
media/                       # result images shown on the landing page (see media/README.md)
```

## Running locally

Open `index.html` for the landing page, or `candid-prompt-studio.html` to go straight to the tool. The core prompt-generation tool works with no server at all — for the AI features, see below.

```bash
# optional: serve the static files instead of using file://
npx serve .
```

### AI features (optional)

AI Mode (scene suggestions + prompt enhancement) needs the two `api/` serverless functions to actually run, which only happens via Vercel — a plain static server will 404 on `/api/*` and the app falls back to its local/offline behavior automatically (no crash, just less creative output).

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/apikey) (Gemini) and/or [Groq Console](https://console.groq.com/keys).
2. Copy `.env.example` to `.env` and fill in `GEMINI_API_KEY` / `GROQ_API_KEY`.
3. Run `npx vercel dev` instead of a plain static server, then open the tool at the URL it prints.
4. For a real deployment, add the same two variables under the Vercel project's **Settings → Environment Variables**.

If neither key is available (or both providers fail/rate-limit), the app automatically falls back to an in-browser WebLLM model, then to the fully offline local generator — AI Mode never blocks you from generating a prompt.

## Usage

1. Pick a platform and aspect ratio (Section 01).
2. Describe the product — type, brand, short description — and optionally pick/auto-detect a category (Section 02).
3. Choose output type (image/video), format, and any storyboard/multi-image/composite options (Section 03).
4. Fine-tune visual settings — POV, angle, styling, model, outfit, location, mood, etc. (Section 04).
5. Optionally get AI-assisted scene suggestions, now that location/ambience are already set (Section 05).
6. Click **JANA PROMPT** to generate. Copy the result or regenerate for new variations.
7. Past generations are listed under **Riwayat** (History) and can be cleared at any time (Section 06).

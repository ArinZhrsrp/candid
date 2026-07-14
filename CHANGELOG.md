# Changelog

All notable changes to this project are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.1.0] - 2026-07-15

### Added
- AI-powered scene suggestions for "Auto Cadangkan Scene" — tiered Gemini → Groq → in-browser WebLLM → local template fallback, so cadangan scene are contextual to the actual product instead of fixed phrasing (`api/ai-suggest.js`).
- AI-powered prompt rewriting for "Jana Prompt" / "Regenerate Variasi" — same tiered fallback, applied only to narrative single-image and video output (`api/ai-enhance-prompt.js`). Structured `[LABEL]` prompts, storyboards, UGC sheets, and multi-image composites are left untouched to protect the machine-parsed contracts other AI tools depend on.
- Bottom-corner status toast ("Running server 1/2/3...") shown while an AI tier is being attempted, without naming the underlying provider.
- "AI Mode" toggle to switch AI-assisted generation on/off; state persists across sessions.

### Changed
- "Cadangan Scene" moved to its own section after "Tetapan Visual", so scene suggestions respect the location/ambience/style already chosen instead of contradicting it (e.g. suggesting a beach scene after picking Bathroom Counter).
- Scene suggestions now generate one at a time on each click, reacting live to whatever product/setting was just changed, instead of batch-generating 10 upfront from a single snapshot of the inputs.

### Fixed
- The in-browser WebLLM fallback tier had no timeout and could leave the UI looking stuck indefinitely on a slow connection or when cloud API keys weren't configured; now bounded (25s model load, 20s inference) with a clean fallback.
- Large, asymmetric gap below the footer version tag; the gap above and below "Version" are now the same size.

## [1.0.1] - 2026-07-12

### Added
- PWA installability (`manifest.json`, install prompt handling).

### Changed
- Removed the version tag from the page header.

### Fixed
- Corrected category-detection logic ("candid logic").

## [1.0.0] - 2026-07-12

### Added
- Initial release of the CANDID prompt engine: platform/size selection, product info + category detection, output type & quantity (image/video, storyboard, UGC, multi-image composite), full visual settings (POV, angle, location, ambience, props, etc.), prompt generation with narrative/structured formats, history, and watermark.

# Result Images

Drop actual AI-generated result images here (outputs from running CANDID's prompts
through tools like Midjourney, Nano Banana/Gemini, Kling, Runway, etc.) so they show
up in the "Hasil Sebenar Dari Pengguna" gallery on the landing page (`index.html`).

Expected filenames (referenced directly in `index.html`):

- `result-1.png` — bag, outdoor hand shot ✅
- `result-2.jpg` — kawaii doodle tumbler, bedroom — still pending
- `result-3.png` — kawaii sticker pack phone case ✅
- `result-4.png` — UGC storyboard sheet ✅

Recommended: roughly 4:5 portrait aspect ratio, JPG/WebP/PNG, reasonably compressed for
web (a few hundred KB each is plenty — `result-4.png` is ~2.2MB, worth compressing when
you get a chance). Until a file exists, that gallery slot shows a placeholder
automatically — no other changes needed once you add the image.

Want more than 4, or different filenames? Add/edit the corresponding `<figure class="result-card">`
block in `index.html`.

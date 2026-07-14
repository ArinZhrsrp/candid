// Serverless proxy: generates product-specific scene suggestions.
// Accepts a single `provider` per request ("gemini" or "groq") so the client
// can drive each tier one at a time and reflect real progress in its UI.
// Never throws a 5xx to the client — always resolves so the browser can
// degrade to its own WebLLM/local fallback tiers.

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

function buildPrompt({ productType, productName, productDesc, category, count, locationContext }) {
  const product = [productName, productType].filter(Boolean).join(" - ") || "the product";
  const desc = productDesc ? ` Product details: ${productDesc}.` : "";
  const cat = category && category !== "Umum" ? ` Category: ${category}.` : "";
  const setting = locationContext
    ? ` All ${count} scenes must take place in this exact setting, chosen by the user: ${locationContext}. Do not suggest a different location or background — only vary the action, angle, and mood within that same setting.`
    : "";
  return (
    `You are a creative director for UGC/affiliate product photography and video prompts. ` +
    `Write ${count} distinct, vivid, single-sentence camera/action scene descriptions for a photo or video ` +
    `featuring this product: "${product}".${cat}${desc}${setting} ` +
    `Each sentence should describe a natural human action/pose with the product, plus mood/lighting cues, ` +
    `in the style of: "casually sipping from the bottle while relaxing at home, the tumbler catching soft light". ` +
    `Vary the angle, action, and mood across all ${count}. Write in English, one per line, no numbering, no extra commentary.`
  );
}

function parseScenes(text, count) {
  if (!text) return [];
  const lines = text
    .split("\n")
    .map((l) => l.replace(/^[\s\-*\d.)]+/, "").trim())
    .filter(Boolean);
  return lines.slice(0, count);
}

async function tryGemini(prompt, count) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  const res = await fetch(`${GEMINI_URL}?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const scenes = parseScenes(text, count);
  return scenes.length ? scenes : null;
}

async function tryGroq(prompt, count) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return null;
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
    }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content || "";
  const scenes = parseScenes(text, count);
  return scenes.length ? scenes : null;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ scenes: null, unavailable: true });
    return;
  }

  try {
    const { productType, productName, productDesc, category, count, locationContext, provider } =
      req.body || {};
    const n = Math.max(1, Math.min(20, parseInt(count, 10) || 10));
    const prompt = buildPrompt({
      productType,
      productName,
      productDesc,
      category,
      count: n,
      locationContext,
    });

    let scenes = null;
    try {
      scenes = provider === "groq" ? await tryGroq(prompt, n) : await tryGemini(prompt, n);
    } catch (e) {
      scenes = null;
    }

    if (scenes) {
      res.status(200).json({ scenes });
    } else {
      res.status(200).json({ scenes: null, unavailable: true });
    }
  } catch (e) {
    res.status(200).json({ scenes: null, unavailable: true });
  }
};

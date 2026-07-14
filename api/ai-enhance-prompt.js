// Serverless proxy: rewrites a single deterministic prompt into more vivid,
// natural language while preserving every stated fact and hard instruction.
// Accepts a single `provider` per request ("gemini" or "groq") so the client
// can drive each tier one at a time and reflect real progress in its UI.
// Never throws a 5xx to the client — always resolves so the browser can
// degrade to its own WebLLM/local fallback tiers.

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

function buildPrompt({ promptText }) {
  return (
    `You are a prompt-polishing assistant for AI image/video generation prompts. ` +
    `Rewrite the following prompt into more vivid, natural, less templated language, ` +
    `while preserving every stated fact exactly: camera angle, framing, subject action, ` +
    `visual style, background/location, lighting, mood, camera gear, and platform context. ` +
    `Critically, preserve any explicit instruction about keeping a background, product, or ` +
    `reference image unchanged, locked, or identical, and any panel/sequence references — ` +
    `do not drop or soften these. Do not mention aspect ratio; that line is handled separately. ` +
    `Return ONLY the rewritten prompt text, no commentary, no markdown, no surrounding quotes.\n\n` +
    `Original prompt:\n${promptText}`
  );
}

function cleanText(text) {
  if (!text) return "";
  return text
    .trim()
    .replace(/^```[a-z]*\n?/i, "")
    .replace(/```$/, "")
    .replace(/^"(.*)"$/s, "$1")
    .trim();
}

async function tryGemini(prompt) {
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
  const text = cleanText(data?.candidates?.[0]?.content?.parts?.[0]?.text);
  return text || null;
}

async function tryGroq(prompt) {
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
  const text = cleanText(data?.choices?.[0]?.message?.content);
  return text || null;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ text: null, unavailable: true });
    return;
  }

  try {
    const { promptText, provider } = req.body || {};
    if (!promptText || typeof promptText !== "string") {
      res.status(200).json({ text: null, unavailable: true });
      return;
    }
    const prompt = buildPrompt({ promptText });

    let text = null;
    try {
      text = provider === "groq" ? await tryGroq(prompt) : await tryGemini(prompt);
    } catch (e) {
      text = null;
    }

    if (text) {
      res.status(200).json({ text });
    } else {
      res.status(200).json({ text: null, unavailable: true });
    }
  } catch (e) {
    res.status(200).json({ text: null, unavailable: true });
  }
};

// Node 22+; server-side only. Never expose this key through Vite or browser code.
const key = process.env.VENICE_API_KEY;
if (!key) {
  console.error("VENICE_API_KEY is missing. Configure it in your environment or GitHub Actions secrets.");
  process.exit(1);
}
const response = await fetch("https://api.venice.ai/api/v1/chat/completions", {
  method: "POST",
  headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
  body: JSON.stringify({ model: "zai-org-glm-5-2", messages: [{ role: "user", content: "Reply with OK." }], max_tokens: 32 }),
});
if (!response.ok) {
  console.error(`Venice API failed (HTTP ${response.status})`);
  process.exit(1);
}
const data = await response.json();
console.log("Venice API response:", data.choices?.[0]?.message?.content ?? "(empty response)");

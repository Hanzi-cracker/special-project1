export default async function generateTripPrompt(destination, days) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing VITE_GEMINI_API_KEY");

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `Plan a ${days}-day trip to ${destination}. Return day-by-day activities, budget, and tips as JSON.`
          }
        ]
      }
    ]
  };

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": apiKey
      },
      body: JSON.stringify(payload)
    }
  );

  if (!res.ok) throw new Error(`Gemini error ${res.status}`);
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

  try {
    return JSON.stringify(JSON.parse(text), null, 2);
  } catch {
    return text; // fallback if Gemini doesn’t return valid JSON
  }
}

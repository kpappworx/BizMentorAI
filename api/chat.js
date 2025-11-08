import { OpenAI } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  if (!messages) {
    return res.status(400).json({ error: "Missing messages" });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
    });

    const responseMessage = completion.choices[0].message;
    res.status(200).json({ message: responseMessage });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "OpenAI request failed" });
  }
}

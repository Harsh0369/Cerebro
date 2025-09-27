import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenAI({ apiKey });

// Default model to use
const DEFAULT_MODEL = "gemini-2.5-flash";

/**
 * Get LLM response from Google Gemini
 * @param {string} prompt - User query or message
 * @param {string} model - Optional model, defaults to DEFAULT_MODEL
 * @returns {string} - LLM generated response
 */
export const LLMResponse = async (prompt, model = DEFAULT_MODEL) => {
  try {
    if (!prompt || !prompt.trim()) {
      return "Please provide a valid query.";
    }

    // Construct clear, concise, and instructive prompt
    const structuredPrompt = `
You are a highly knowledgeable assistant. Solve the following query clearly and concisely:
- Keep the answer short (2–3 sentences maximum)
- Provide examples if necessary
- Avoid unnecessary explanation
Query: ${prompt}
    `.trim();

    const response = await genAI.models.generateContent({
      model,
      contents: structuredPrompt,
    });

    // Return trimmed response text or fallback
    return (
      (response?.text || "").trim() ||
      "I'm sorry, I couldn't generate a response."
    );
  } catch (err) {
    console.error("LLM error:", err);
    return "I'm sorry, I couldn't generate a response due to a server error.";
  }
};

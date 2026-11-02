
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

async function testGemini() {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: "Reply with: SchemeSaathi Gemini connection successful!",
    });

    console.log("Gemini response:");
    console.log(response.output_text);
  } catch (error) {
    console.error("Gemini connection failed:");
    console.error(error.message);
  }
}

testGemini();

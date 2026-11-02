
require("dotenv").config();

async function testAI() {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
      model: "nvidia/nemotron-3.5-lightning:free",
          messages: [
            {
              role: "system",
              content:
                "You are SchemeSaathi, a friendly Indian government scheme assistance AI. Speak naturally and help users understand their eligibility. Never invent government scheme details.",
            },
            {
              role: "user",
              content:
                "Hi! My name is Vignesh. I am 22 years old, from Andhra Pradesh. I completed B.Sc and I am looking for a job. My family income is 3 lakh per year. I have a locomotor disability. What information would you like to know next?",
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log("API Error:", data);
      return;
    }

    console.log("\n🤖 SchemeSaathi AI Response:\n");
    console.log(data.choices?.[0]?.message?.content);
    console.log("\nModel:", data.model);
    console.log("Usage:", data.usage);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testAI();

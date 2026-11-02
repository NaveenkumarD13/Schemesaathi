
require("dotenv").config();

async function testOpenRouter() {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    console.log("❌ API key not found. Check backend/.env");
    return;
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/key", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("❌ Authentication failed:", data);
      return;
    }

    console.log("✅ OpenRouter authentication successful!");
    console.log("Key information:", {
      label: data.data?.label,
      limit: data.data?.limit,
      usage: data.data?.usage,
    });
  } catch (error) {
    console.error("❌ Connection error:", error.message);
  }
}

testOpenRouter();

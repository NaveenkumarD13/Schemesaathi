const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const MODEL =
  process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
const MAX_OUTPUT_TOKENS = Number(
  process.env.GEMINI_MAX_OUTPUT_TOKENS || 1024
);
const GEMINI_TIMEOUT_MS = Number(
  process.env.GEMINI_TIMEOUT_MS || 30000
);
const SUPPORTED_LANGUAGES = [
  "English",
  "Telugu",
  "Tamil",
  "Hindi",
  "Kannada",
  "Malayalam",
  "Marathi",
  "Bengali",
  "Gujarati",
  "Punjabi",
  "Odia",
  "Assamese",
  "Konkani",
  "Manipuri",
  "Mizo",
  "Nepali",
  "Urdu",
];
const LANGUAGE = "English";

function normalizeLanguage(value) {
  if (!value) return LANGUAGE;

  const requested = String(value).trim().toLowerCase();

  return (
    SUPPORTED_LANGUAGES.find(
      (language) => language.toLowerCase() === requested
    ) || LANGUAGE
  );
}

const gemini = GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: GEMINI_API_KEY })
  : null;

// --------------------------------------------------
// PROFILE CONFIGURATION
// --------------------------------------------------

const REQUIRED_FIELDS = [
  "fullName",
  "age",
  "gender",
  "state",
  "district",
  "education",
  "studyStatus",
  "occupation",
  "annualFamilyIncome",
];

const OPTIONAL_FIELDS = [
  "category",
  "disability",
  "minority",
  "bplCard",
  "graduationYear",
];

const PROFILE_FIELDS = [
  ...REQUIRED_FIELDS,
  ...OPTIONAL_FIELDS,
];

const STATES_AND_UTS = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const FIELD_QUESTIONS = {
  fullName: "May I know your full name?",
  age: "What is your age?",
  gender: "What is your gender?",
  state: "Which state or Union Territory do you live in?",
  district: "Which district do you live in?",
  education: "What is your highest educational qualification?",
  studyStatus:
    "Are you currently studying, pursuing a course, or have you completed your education?",
  occupation: "What is your current occupation?",
  annualFamilyIncome:
    "What is your approximate annual family income in INR?",
};

const ALLOWED_INTENTS = [
  "profile_collection",
  "scheme_discovery",
  "eligibility_check",
  "document_guidance",
  "application_guidance",
  "application_status",
  "renewal_guidance",
  "grievance_guidance",
  "general_question",
];

// --------------------------------------------------
// PROFILE HELPERS
// --------------------------------------------------

function sanitizeProfile(profile = {}) {
  const cleanProfile = {};

  if (
    !profile ||
    typeof profile !== "object" ||
    Array.isArray(profile)
  ) {
    return cleanProfile;
  }

  for (const field of PROFILE_FIELDS) {
    if (
      profile[field] !== undefined &&
      profile[field] !== null
    ) {
      cleanProfile[field] = profile[field];
    }
  }

  cleanProfile.preferredLanguage = normalizeLanguage(
    profile.preferredLanguage
  );

  return cleanProfile;
}

function getMissingField(profile) {
  return REQUIRED_FIELDS.find((field) => {
    const value = profile[field];

    return (
      value === undefined ||
      value === null ||
      String(value).trim() === ""
    );
  });
}

function normalizeState(value) {
  if (!value) return null;

  const normalized = String(value).trim().toLowerCase();

  return (
    STATES_AND_UTS.find(
      (state) => state.toLowerCase() === normalized
    ) || null
  );
}

function normalizeGender(value) {
  if (!value) return null;

  const normalized = String(value).trim().toLowerCase();

  const genders = {
    male: "Male",
    man: "Male",
    female: "Female",
    woman: "Female",
    other: "Other",
    "prefer not to say": "Prefer not to say",
  };

  return genders[normalized] || null;
}

function normalizeBoolean(value) {
  if (typeof value === "boolean") return value;
  if (typeof value !== "string") return null;

  const normalized = value.trim().toLowerCase();

  if (
    ["yes", "true", "eligible", "available"].includes(
      normalized
    )
  ) {
    return true;
  }

  if (
    ["no", "false", "not applicable", "unavailable"].includes(
      normalized
    )
  ) {
    return false;
  }

  return null;
}

function normalizeIncome(value) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return NaN;

  const cleaned = value
    .replace(/₹/g, "")
    .replace(/rs\.?/gi, "")
    .replace(/inr/gi, "")
    .replace(/,/g, "")
    .replace(/\s/g, "")
    .trim()
    .toLowerCase();

  const multiplier =
    cleaned.endsWith("l") || cleaned.endsWith("lakh")
      ? 100000
      : cleaned.endsWith("k")
        ? 1000
        : 1;

  const numericValue = cleaned.replace(/lakh$|[lk]$/i, "");

  return Number(numericValue) * multiplier;
}

// --------------------------------------------------
// PROFILE UPDATE VALIDATION
// --------------------------------------------------

function validateProfileUpdates(updates = {}) {
  const validated = {};

  if (
    !updates ||
    typeof updates !== "object" ||
    Array.isArray(updates)
  ) {
    return validated;
  }

  for (const field of PROFILE_FIELDS) {
    const value = updates[field];

    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      continue;
    }

    if (field === "fullName") {
      if (
        typeof value === "string" &&
        value.trim().length >= 2
      ) {
        validated.fullName = value.trim().slice(0, 100);
      }
    }

    if (field === "age") {
      const age = Number(value);

      if (
        Number.isInteger(age) &&
        age >= 1 &&
        age <= 120
      ) {
        validated.age = age;
      }
    }

    if (field === "gender") {
      const gender = normalizeGender(value);
      if (gender) validated.gender = gender;
    }

    if (field === "state") {
      const state = normalizeState(value);
      if (state) validated.state = state;
    }

    if (field === "district") {
      if (
        typeof value === "string" &&
        value.trim().length >= 2
      ) {
        validated.district = value.trim().slice(0, 100);
      }
    }

    if (
      ["education", "studyStatus", "occupation"].includes(
        field
      )
    ) {
      if (typeof value === "string" && value.trim()) {
        validated[field] = value.trim().slice(0, 200);
      }
    }

    if (field === "annualFamilyIncome") {
      const income = normalizeIncome(value);

      if (
        Number.isFinite(income) &&
        income >= 0 &&
        income <= 1000000000
      ) {
        validated.annualFamilyIncome = income;
      }
    }

    if (field === "category") {
      if (typeof value === "string" && value.trim()) {
        validated.category = value.trim().slice(0, 50);
      }
    }

    if (
      ["disability", "minority", "bplCard"].includes(field)
    ) {
      const booleanValue = normalizeBoolean(value);

      if (booleanValue !== null) {
        validated[field] = booleanValue;
      }
    }

    if (field === "graduationYear") {
      const year = Number(value);

      if (
        Number.isInteger(year) &&
        year >= 1950 &&
        year <= 2100
      ) {
        validated.graduationYear = year;
      }
    }
  }

  return validated;
}

// --------------------------------------------------
// CONVERSATION HISTORY
// --------------------------------------------------

function sanitizeHistory(history = []) {
  if (!Array.isArray(history)) return [];

  return history
    .filter((item) => {
      if (!item) return false;

      const validRole = [
        "user",
        "assistant",
        "model",
      ].includes(item.role);

      const content =
        typeof item.content === "string"
          ? item.content
          : item.text;

      return validRole && typeof content === "string";
    })
    .slice(-8)
    .map((item) => {
      const content =
        typeof item.content === "string"
          ? item.content
          : item.text;

      return {
        role:
          item.role === "model"
            ? "assistant"
            : item.role,
        content: content.slice(0, 2000),
      };
    });
}

// --------------------------------------------------
// AI SYSTEM PROMPT
// --------------------------------------------------

function buildSystemPrompt(profile, nextField) {
  return `
You are SchemeSaathi AI, an Indian government welfare scheme assistant.

LANGUAGE AND STYLE:
- Respond only in ${profile.preferredLanguage || LANGUAGE}.
- Use simple, friendly, natural language.
- Translate every user-facing sentence, including profile questions,
  headings and explanations, into that language.
- Keep personal names, scheme names, official organization names and
  verified URLs unchanged when translation would make them unclear.
- Do not mix English into the response unless it is a proper name,
  official term or URL.
- Be respectful, patient and non-discriminatory.
- Understand greetings, general questions and follow-ups naturally.
- Do not force profile collection for unrelated questions.

PROFILE:
Required fields: ${REQUIRED_FIELDS.join(", ")}
Optional fields: ${OPTIONAL_FIELDS.join(", ")}

Current profile:
${JSON.stringify(profile)}

Next missing required field: ${nextField || "None"}

PROFILE RULES:
- Collect information progressively when the user requests scheme discovery or eligibility assessment.
- Ask only ONE profile question at a time.
- Extract multiple details when the user provides them together.
- Never ask again for information already available.
- Accept corrections and update the relevant field.
- Do not assume or invent personal information.
- Education and studyStatus are separate fields.
- Validate state names against Indian States and UTs.
- Ask for clarification when an answer is unclear.
- Optional fields should be requested only when relevant.

YOUR PURPOSE:
Help users with:
- Central and State Government scheme discovery.
- Eligibility assessment.
- Benefits and required documents.
- Application process and official portal guidance.
- Application status, renewal and grievance guidance.

SCHEME ACCURACY:
- Never invent scheme names, eligibility rules, benefits, deadlines or document requirements.
- Do not claim definite eligibility when important conditions are unknown.
- Do not promise approval or benefits.
- Never fabricate official URLs.
- Prefer official government sources.
- Do not claim information is officially verified unless an official source supports it.
- Clearly disclose when reliable information is unavailable.
- Explain why a scheme may match the user's profile.
- Distinguish Central Government schemes from State Government schemes.

When reliable information is available, explain:
1. Scheme name and responsible government.
2. Purpose and benefits.
3. Relevant eligibility conditions.
4. Why the user may match.
5. Required documents.
6. Application process.
7. Official URL, if verified.
8. Details that need confirmation.

CONVERSATION:
- Use the supplied history to understand follow-ups.
- Do not restart the conversation unnecessarily.
- Answer general questions naturally.
- If profile is complete, do not repeat profile questions.

OUTPUT FORMAT:
Return exactly these tags in this order:

<REPLY>Your response to the user.</REPLY>
<UPDATES>{"age":22}</UPDATES>
<INTENT>profile_collection</INTENT>

Rules:
- Put the user-facing answer FIRST inside REPLY.
- Finish the user-facing answer completely before closing the REPLY tag.
- UPDATES must contain valid JSON.
- Include only information actually provided or explicitly corrected.
- Use exact profile field names.
- Use numbers for age and annualFamilyIncome.
- Use booleans for disability, minority and bplCard.
- INTENT must be one of:
${ALLOWED_INTENTS.join(", ")}
- Do not use Markdown code fences around the protocol.
- Do not add text outside these tags.
`;
}

// --------------------------------------------------
// AI PROTOCOL PARSER
// --------------------------------------------------

function extractTaggedContent(content, tag) {
  const expression = new RegExp(
    `<${tag}\\s*>([\\s\\S]*?)<\\/${tag}\\s*>`,
    "i"
  );

  const match = content.match(expression);

  return match ? match[1].trim() : null;
}

function parseAIProtocol(content) {
  const updatesText = extractTaggedContent(
    content,
    "UPDATES"
  );

  const intentText = extractTaggedContent(
    content,
    "INTENT"
  );

  const taggedReply = extractTaggedContent(
    content,
    "REPLY"
  );

  let updates = {};

  if (updatesText) {
    try {
      updates = JSON.parse(updatesText);
    } catch {
      console.warn("Invalid profile updates. Ignoring.");
    }
  }

  if (
    !updates ||
    typeof updates !== "object" ||
    Array.isArray(updates)
  ) {
    updates = {};
  }

  let reply = taggedReply;

  if (!reply) {
    reply = content
      .replace(/<UPDATES>[\s\S]*?<\/UPDATES>/gi, "")
      .replace(/<INTENT>[\s\S]*?<\/INTENT>/gi, "")
      .replace(/<\/?REPLY>/gi, "")
      .trim();
  }

  reply = reply
    .replace(/<\/?UPDATES>/gi, "")
    .replace(/<\/?INTENT>/gi, "")
    .replace(/<\/?REPLY>/gi, "")
    .trim();

  if (!reply) {
    throw new Error("Gemini returned an empty response.");
  }

  const normalizedIntent = (intentText || "")
    .trim()
    .toLowerCase();

  return {
    updates,
    intent: ALLOWED_INTENTS.includes(normalizedIntent)
      ? normalizedIntent
      : "general_question",
    reply,
  };
}

// --------------------------------------------------
// SSE HELPERS
// --------------------------------------------------

function sendSSE(res, event, data) {
  if (res.writableEnded || res.destroyed) return;

  res.write(`event: ${event}\n`);
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

function isSimpleGreeting(message) {
  return /^(hi|hello|hey|good morning|good afternoon|good evening)[!. ]*$/i.test(
    message.trim()
  );
}

function sendFastGreeting({ res, profile, nextField, timings }) {
  res.status(200);
  res.setHeader(
    "Content-Type",
    "text/event-stream; charset=utf-8"
  );
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders?.();

  const reply = nextField
    ? `Hello! I can help you find government schemes. ${FIELD_QUESTIONS[nextField]}`
    : "Hello! I can help you find government schemes, check eligibility, and understand application steps. What would you like to know?";

  sendSSE(res, "token", { token: reply });
  sendSSE(res, "done", {
    success: true,
    profileUpdates: {},
    profile: {
      ...profile,
      preferredLanguage: normalizeLanguage(
        profile.preferredLanguage
      ),
    },
    nextField: nextField || null,
    profileComplete: !nextField,
    intent: "general_question",
    preferredLanguage: normalizeLanguage(
      profile.preferredLanguage
    ),
    model: "local-fast-path",
    provider: "SchemeSaathi",
  });

  timings.finishedAt = Date.now();
  console.log(
    `[${timings.requestId}] Fast greeting response: ${
      timings.finishedAt - timings.startedAt
    }ms`
  );
  res.end();
}

// --------------------------------------------------
// REPLY STREAM EXTRACTOR
// --------------------------------------------------

function streamReplyFromProtocol(
  completeContent,
  alreadySent,
  res,
  timings
) {
  const openingTag = /<REPLY\s*>/i;
  const closingTag = /<\/REPLY\s*>/i;

  const openingMatch = openingTag.exec(completeContent);

  if (!openingMatch) return alreadySent;

  const replyStart =
    openingMatch.index + openingMatch[0].length;

  const remaining = completeContent.slice(replyStart);

  const closingMatch = closingTag.exec(remaining);

  let safeText;

  if (closingMatch) {
    safeText = remaining.slice(0, closingMatch.index);
  } else {
    const bufferLength = "</REPLY>".length - 1;

    const safeLength = Math.max(
      0,
      remaining.length - bufferLength
    );

    safeText = remaining.slice(0, safeLength);
  }

  if (safeText.length > alreadySent.length) {
    const newText = safeText.slice(alreadySent.length);

    if (newText) {
      if (!timings.firstReplyToken) {
        timings.firstReplyToken = Date.now();

        console.log(
          `[${timings.requestId}] First reply token: ${
            timings.firstReplyToken - timings.startedAt
          }ms`
        );
      }

      sendSSE(res, "token", {
        token: newText,
      });

      res.flush?.();
    }

    return safeText;
  }

  return alreadySent;
}

// --------------------------------------------------
// GEMINI STREAMING RESPONSE
// --------------------------------------------------

async function streamAIResponse({
  message,
  profile,
  history,
  nextField,
  res,
  signal,
  timings,
}) {
  if (!GEMINI_API_KEY || !gemini) {
    throw new Error(
      "GEMINI_API_KEY is missing in backend/.env"
    );
  }

  if (signal?.aborted) {
    throw new Error("Request was cancelled.");
  }

  const systemPrompt = buildSystemPrompt(
    profile,
    nextField
  );

  const conversationHistory = history
    .map((item) => {
      const role =
        item.role === "assistant"
          ? "SchemeSaathi AI"
          : "User";

      return `${role}: ${item.content}`;
    })
    .join("\n");

  const input = `
${systemPrompt}

CONVERSATION HISTORY:
${conversationHistory || "No previous conversation."}

LATEST USER MESSAGE:
${message}

Follow the required REPLY, UPDATES and INTENT format.
`;

  // Configure SSE response.
  res.status(200);

  res.setHeader(
    "Content-Type",
    "text/event-stream; charset=utf-8"
  );

  res.setHeader(
    "Cache-Control",
    "no-cache, no-transform"
  );

  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  res.flushHeaders?.();

  let completeContent = "";
  let streamedReply = "";

  try {
    console.log(
      `[${timings.requestId}] Sending request to Gemini...`
    );

    timings.geminiRequestStarted = Date.now();

    // Performance optimisation:
    // Test low thinking level and a limited output size.
    const stream = await gemini.interactions.create(
      {
        model: MODEL,
        input,
        stream: true,
        automatic_continuation: true,
        generation_config: {
          thinking_level: "low",
          max_output_tokens: MAX_OUTPUT_TOKENS,
        },
      },
      {
        timeout_ms: GEMINI_TIMEOUT_MS,
        fetch_options: {
          signal,
        },
      }
    );

    timings.streamCreated = Date.now();

    console.log(
      `[${timings.requestId}] Gemini stream opened: ${
        timings.streamCreated - timings.startedAt
      }ms`
    );

    for await (const event of stream) {
      if (signal?.aborted || res.destroyed) {
        console.log(
          `[${timings.requestId}] Request cancelled.`
        );

        return;
      }

      if (event.event_type === "error") {
        throw new Error(
          event.error?.message ||
          "Gemini streaming failed."
        );
      }

      if (event.event_type !== "step.delta") {
        continue;
      }

      const delta = event.delta;

      if (
        delta?.type === "text" &&
        typeof delta.text === "string"
      ) {
        if (!timings.firstTextDelta) {
          timings.firstTextDelta = Date.now();

          console.log(
            `[${timings.requestId}] First Gemini text: ${
              timings.firstTextDelta - timings.startedAt
            }ms`
          );
        }

        completeContent += delta.text;

        streamedReply = streamReplyFromProtocol(
          completeContent,
          streamedReply,
          res,
          timings
        );
      }
    }

    if (signal?.aborted || res.destroyed) return;

    timings.generationFinished = Date.now();

    console.log(
      `[${timings.requestId}] Gemini generation completed: ${
        timings.generationFinished - timings.startedAt
      }ms`
    );

    if (!completeContent.trim()) {
      throw new Error("Gemini returned an empty response.");
    }

    const aiResult = parseAIProtocol(completeContent);

    const profileUpdates = validateProfileUpdates(
      aiResult.updates
    );

    const updatedProfile = {
      ...profile,
      ...profileUpdates,
      preferredLanguage: normalizeLanguage(
        profile.preferredLanguage
      ),
    };

    const missingField = getMissingField(updatedProfile);
    const profileComplete = !missingField;

    let reply = aiResult.reply.trim();

    if (
      aiResult.intent === "profile_collection" &&
      missingField &&
      !reply.includes("?")
    ) {
      reply = `${reply} ${FIELD_QUESTIONS[missingField]}`;
    }

    if (!reply) {
      reply =
        "How can I help you with government schemes today?";
    }

    // Send remaining reply text or correct the streamed text.
    if (reply.startsWith(streamedReply)) {
      const remainingReply = reply.slice(
        streamedReply.length
      );

      if (remainingReply) {
        sendSSE(res, "token", {
          token: remainingReply,
        });
      }
    } else if (!streamedReply) {
      sendSSE(res, "token", {
        token: reply,
      });
    } else {
      console.warn(
        `[${timings.requestId}] Final reply differs from streamed text.`
      );

      sendSSE(res, "replace", {
        text: reply,
      });
    }

    // Send completion event.
    sendSSE(res, "done", {
      success: true,
      profileUpdates,
      profile: updatedProfile,
      nextField: missingField || null,
      profileComplete,
      intent: aiResult.intent,
      preferredLanguage: updatedProfile.preferredLanguage,
      model: MODEL,
      provider: "Google Gemini",
    });

    timings.finishedAt = Date.now();

    console.log(
      `[${timings.requestId}] Total request time: ${
        timings.finishedAt - timings.startedAt
      }ms`
    );

    res.end();
  } catch (error) {
    if (signal?.aborted || res.destroyed) return;

    throw error;
  }
}

// --------------------------------------------------
// HEALTH API
// --------------------------------------------------

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "SchemeSaathi API is running.",
    model: MODEL,
    provider: "Google Gemini",
    responseDelivery: "Real-time SSE streaming",
    language: LANGUAGE,
    coverage: "All Indian States and Union Territories",
    apiKeyConfigured: Boolean(GEMINI_API_KEY),
  });
});

// --------------------------------------------------
// LANGUAGE API
// --------------------------------------------------

app.get("/api/languages", (req, res) => {
  res.json({
    success: true,
    languages: SUPPORTED_LANGUAGES,
    defaultLanguage: LANGUAGE,
  });
});

// --------------------------------------------------
// CHAT API
// --------------------------------------------------

app.post("/api/chat", async (req, res) => {
  const controller = new AbortController();

  const timings = {
    requestId: `REQ-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 7)}`,
    startedAt: Date.now(),
    geminiRequestStarted: null,
    streamCreated: null,
    firstTextDelta: null,
    firstReplyToken: null,
    generationFinished: null,
    finishedAt: null,
  };

  res.on("close", () => {
    if (!res.writableEnded) {
      controller.abort();
    }
  });

  try {
    const {
      message,
      profile: incomingProfile,
      history,
    } = req.body || {};

    if (
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message.",
      });
    }

    const userMessage = message
      .trim()
      .slice(0, 3000);

    const currentProfile = sanitizeProfile(
      incomingProfile || {}
    );

    const cleanHistory = sanitizeHistory(history);

    const nextFieldBeforeAI = getMissingField(
      currentProfile
    );

    console.log(
      `\n[${timings.requestId}] New chat request: "${userMessage.slice(
        0,
        100
      )}"`
    );

    if (isSimpleGreeting(userMessage)) {
      return sendFastGreeting({
        res,
        profile: currentProfile,
        nextField: nextFieldBeforeAI,
        timings,
      });
    }

    await streamAIResponse({
      message: userMessage,
      profile: currentProfile,
      history: cleanHistory,
      nextField: nextFieldBeforeAI,
      res,
      signal: controller.signal,
      timings,
    });
  } catch (error) {
    console.error(
      `[${timings.requestId}] Gemini Chat API error:`,
      error.message
    );

    if (res.destroyed || res.writableEnded) return;

    const errorMessage =
      "I'm having trouble connecting to the AI service right now. Please try again.";

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: errorMessage,
        error: "AI_SERVICE_ERROR",
      });
    }

    sendSSE(res, "error", {
      success: false,
      message: errorMessage,
      error: "AI_SERVICE_ERROR",
    });

    res.end();
  }
});

// --------------------------------------------------
// SERVER
// --------------------------------------------------

app.listen(PORT, () => {
  console.log("\n==================================");
  console.log("SchemeSaathi API started");
  console.log("==================================");
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`AI Model: ${MODEL}`);
  console.log("Provider: Google Gemini");
  console.log("Response delivery: Real-time SSE");
  console.log(
    `Languages: ${SUPPORTED_LANGUAGES.join(", ")}`
  );
  console.log(
    "Coverage: All Indian States and Union Territories"
  );
  console.log(
    `Gemini API key: ${
      GEMINI_API_KEY ? "Configured" : "MISSING"
    }`
  );
  console.log("Thinking level: low");
  console.log(
    `Maximum output tokens: ${MAX_OUTPUT_TOKENS}`
  );
  console.log(
    `Gemini timeout: ${GEMINI_TIMEOUT_MS}ms`
  );
  console.log("==================================\n");
});
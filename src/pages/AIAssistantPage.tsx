import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

interface Message {
  id: number;
  role: "user";
  content: string;
}

function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setMessages((previous) => [
      ...previous,
      {
        id: Date.now(),
        role: "user",
        content: trimmedInput,
      },
    ]);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-900/70">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link
            to="/dashboard"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            ← Back to Dashboard
          </Link>

          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
            AI Mode
          </span>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-65px)] max-w-4xl flex-col px-4 py-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10 text-2xl">
            ✨
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            SchemeSaathi AI
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Tell me about yourself. Let's explore government schemes that
            may be relevant to you.
          </p>
        </div>

        <section className="flex flex-1 flex-col rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:p-6">
          <div className="flex-1 space-y-5">
            {messages.length === 0 ? (
              <div className="mx-auto mt-10 max-w-md text-center">
                <h2 className="text-lg font-semibold text-slate-200">
                  Welcome! 👋
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  I'll ask a few questions about your age, location,
                  education and other details to help identify relevant
                  government schemes.
                </p>

                <p className="mt-5 text-xs text-slate-500">
                  Start by telling me your name or what kind of assistance
                  you are looking for.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-emerald-500 px-4 py-3 text-sm leading-6 text-slate-950">
                    {message.content}
                  </div>
                </div>
              ))
            )}

            {messages.length > 0 && (
              <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-xs leading-5 text-amber-200">
                Your message is displayed. AI responses will be enabled
                after the secure Gemini backend is connected.
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950 p-2 focus-within:border-emerald-400/50">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your answer..."
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500"
              />

              <button
                type="submit"
                disabled={!input.trim()}
                className="rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </form>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              Voice interaction (coming next)
            </span>

            <button
              type="button"
              onClick={() => setVoiceEnabled((previous) => !previous)}
              className={`rounded-full px-3 py-1.5 text-xs transition ${
                voiceEnabled
                  ? "bg-emerald-400/15 text-emerald-300"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              {voiceEnabled ? "Voice enabled" : "Voice disabled"}
            </button>
          </div>
        </section>

        <p className="mt-4 text-center text-xs text-slate-500">
          Scheme information should always be verified with the relevant
          official government department.
        </p>
      </main>
    </div>
  );
}

export default AIAssistantPage;
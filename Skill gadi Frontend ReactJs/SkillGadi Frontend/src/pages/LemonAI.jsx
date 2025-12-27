import { useState } from "react";
import { Send } from "lucide-react";

const DJANGO_AI_URL = "http://127.0.0.1:8000/generate/";

const LemonAI = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi 👋 I’m LemonAI. Ask me anything!" },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userPrompt = input;
    setInput("");
    setLoading(true);

    // add user msg + thinking msg
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userPrompt },
      { role: "ai", text: "⏳ LemonAI is thinking..." },
    ]);

    try {
      const res = await fetch(DJANGO_AI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      const data = await res.json();

      // replace thinking message with actual response
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "ai", text: data.result || "No response received." },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "ai", text: "❌ Error contacting LemonAI server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/images/lemonsbg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex-1 flex flex-col bg-white/10">

        {/* ===== HEADER ===== */}
        <div className="p-5 border-b border-white/30 backdrop-blur-md bg-white/30 text-black shadow-sm">
          <h1 className="text-2xl font-bold">🍋 LemonAI</h1>
          <p className="text-sm opacity-70">OpenAI-powered assistant</p>
        </div>

        {/* ===== CHAT ===== */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-xl px-4 py-3 rounded-2xl text-sm backdrop-blur-lg shadow
                ${msg.role === "user"
                  ? "ml-auto bg-yellow-400 text-black"
                  : "bg-white/60 text-black"
                }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* ===== INPUT BAR ===== */}
        <div className="p-4 border-t border-black/20 bg-black/70 backdrop-blur-md flex gap-3 shadow-2xl">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask LemonAI..."
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-xl bg-black/60 text-white
                       outline-none placeholder:text-white/50
                       border border-white/10 focus:border-yellow-400/60"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-6 rounded-xl bg-yellow-400 text-black font-semibold
                       hover:bg-yellow-300 hover:scale-105 transition
                       disabled:opacity-60"
          >
            <Send />
          </button>
        </div>

      </div>
    </div>
  );
};

export default LemonAI;

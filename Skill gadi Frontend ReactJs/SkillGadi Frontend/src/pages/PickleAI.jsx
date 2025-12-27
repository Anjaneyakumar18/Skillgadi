import { useState } from "react";
import { Send } from "lucide-react";

const PickleAI = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "🥒 PickleAI ready. Trained specially for you." },
  ]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
      { role: "ai", text: "🧠 PickleAI inference output here..." },
    ]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-emerald-950 text-white flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-white/10">
        <h1 className="text-2xl font-bold">🥒 PickleAI</h1>
        <p className="text-sm opacity-80">
          Your custom trained model
        </p>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xl px-4 py-3 rounded-2xl text-sm
              ${msg.role === "user"
                ? "ml-auto bg-emerald-500 text-black"
                : "bg-white/10"
              }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask PickleAI..."
          className="flex-1 px-4 py-3 rounded-xl bg-white/10 outline-none"
        />
        <button
          onClick={sendMessage}
          className="px-4 rounded-xl bg-emerald-500 text-black hover:scale-105 transition"
        >
          <Send />
        </button>
      </div>
    </div>
  );
};

export default PickleAI;

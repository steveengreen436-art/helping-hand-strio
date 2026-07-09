"use client";

import { useState } from "react";

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Sawubona! How can I help you find talent or manage listings today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Thanks for asking! I am the Strio Assistant. For direct candidate contact details, please use the admin approval request form or contact support.",
        },
      ]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="w-80 h-96 bg-slateCard border border-neonCyan/40 rounded-2xl flex flex-col shadow-2xl overflow-hidden">
          <div className="bg-obsidian p-3 border-b border-white/10 flex justify-between items-center">
            <span className="text-xs font-bold text-neonCyan">Strio Support Assistant</span>
            <button onClick={() => setOpen(false)} className="text-platinum/60 hover:text-platinum text-xs">
              ✕
            </button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2.5 rounded-xl max-w-[85%] ${
                  m.role === "user"
                    ? "bg-neonCyan text-obsidian ml-auto font-medium"
                    : "bg-obsidian text-platinum border border-white/10"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="p-2 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-obsidian text-xs text-platinum px-3 py-2 rounded-lg border border-white/10 focus:border-neonCyan focus:outline-none"
            />
            <button type="submit" className="px-3 py-2 bg-neonCyan text-obsidian text-xs font-bold rounded-lg">
              Send
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-3 bg-neonCyan text-obsidian font-bold rounded-full shadow-[0_0_20px_rgba(102,252,241,0.4)] hover:scale-105 transition text-sm flex items-center gap-2"
        >
          💬 Ask Strio AI
        </button>
      )}
    </div>
  );
}

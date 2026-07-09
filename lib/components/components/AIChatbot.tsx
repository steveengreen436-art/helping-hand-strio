"use client";

import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Sawubona! I am the Helping Hand Strio Assistant. How can I help you find talent or navigate the platform today?" }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulated local guide response
    setTimeout(() => {
      let replyText = "Thank you for reaching out! You can browse active job seekers on the Explore page or create an account to post your own CV. Need help reaching an administrator? Check our safety guidelines.";
      if (input.toLowerCase().includes("contact") || input.toLowerCase().includes("phone") || input.toLowerCase().includes("number")) {
        replyText = "For maximum safety, direct candidate contact numbers are hidden from the public view. Admins vet each request personally before connecting both parties!";
      }

      setMessages((prev) => [...prev, { role: "assistant", text: replyText }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-neonCyan text-obsidian px-5 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(102,252,241,0.4)] hover:scale-105 transition"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Ask Strio AI</span>
        </button>
      )}

      {isOpen && (
        <div className="w-80 sm:w-96 bg-slateCard border border-neonCyan/40 rounded-2xl shadow-2xl flex flex-col h-[450px]">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-obsidian/50 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-neonCyan animate-pulse"></span>
              <h3 className="font-bold text-platinum text-sm">Strio Support AI</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-platinum/60 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl text-xs leading-relaxed max-w-[85%] ${
                  msg.role === "user"
                    ? "bg-neonCyan text-obsidian font-medium ml-auto"
                    : "bg-obsidian text-platinum border border-white/10"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 bg-obsidian text-platinum text-xs px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-neonCyan"
            />
            <button
              onClick={handleSend}
              className="bg-neonCyan text-obsidian p-2 rounded-lg hover:opacity-90 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

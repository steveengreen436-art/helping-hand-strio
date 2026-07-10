/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Sawubona! How can I help you find talent or manage listings today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const getSmartResponse = (query: string): string => {
    const q = query.toLowerCase().trim();

    // 1. Greetings
    if (q.includes("hello") || q.includes("hi ") || q.includes("hey") || q.includes("sawubona") || q.includes("hie")) {
      return "Greetings! Welcome to Helping Hand Strio. Are you looking to hire local talent, or are you looking for employment yourself?";
    }
    
    // 2. CV / Resume / Profile Questions
    if (q.includes("cv") || q.includes("resume") || q.includes("profile") || q.includes("upload") || q.includes("post")) {
      return "To post your CV or see details, use our 'Post CV' portal or browse the talent directory. All candidate info is kept secure until vetted by our administrators to protect our community's safety.";
    }
    
    // 3. Contact / Talk to details
    if (q.includes("contact") || q.includes("phone") || q.includes("email") || q.includes("number") || q.includes("talk to") || q.includes("call")) {
      return "For safety and security, all initial communication goes through us. I have logged your enquiry, and our team will get back to your personal email shortly with direct safe contact options.";
    }
    
    // 4. Hiring / Employer Questions
    if (q.includes("hire") || q.includes("employer") || q.includes("job") || q.includes("find worker") || q.includes("employee")) {
      return "Excellent! You can look through our public directory right now. Once you find a candidate you wish to reach out to, let us know and we will forward the connection safely after verifying your request.";
    }
    
    // 5. Pricing / Costs
    if (q.includes("price") || q.includes("cost") || q.includes("free") || q.includes("pay") || q.includes("charge")) {
      return "Helping Hand Strio is committed to keeping basic directory lookups and job postings completely accessible. For premium vetting and high-priority matching tiers, please contact our support team.";
    }

    // 6. Default fallback response if no keywords match
    return "Thank you for reaching out to Strio Support! I have received your message and have instantly flagged this conversation for our administration team. We will review your message and follow up with you directly via email.";
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    // 1. Background notification to Formspree (replaces your email backend safely)
    try {
      await fetch("https://formspree.io/f/mpqgvyjz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FormType: "Chatbot Enquiry",
          Question: userMsg,
          Time: new Date().toLocaleString(),
        }),
      });
    } catch (error) {
      console.log("Notification logged");
    }

    // 2. Simulate AI thinking time and render response
    setTimeout(() => {
      const aiReply = getSmartResponse(userMsg);
      setMessages((prev) => [...prev, { role: "assistant", text: aiReply }]);
      setLoading(false);
    }, 750);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="w-80 h-96 bg-slateCard border border-neonCyan/40 rounded-2xl flex flex-col shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-obsidian p-3 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold text-neonCyan">Strio Support Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-platinum/60 hover:text-platinum text-xs font-bold">
              ✕
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2.5 rounded-xl max-w-[85%] whitespace-pre-line ${
                  m.role === "user"
                    ? "bg-neonCyan text-obsidian ml-auto font-medium"
                    : "bg-obsidian text-platinum border border-white/10"
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="bg-obsidian text-platinum/50 border border-white/10 p-2 rounded-xl max-w-[45%] text-[10px] animate-pulse">
                Strio is typing...
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-2 border-t border-white/10 flex gap-2 bg-obsidian/50">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-obsidian text-xs text-platinum px-3 py-2 rounded-lg border border-white/10 focus:border-neonCyan focus:outline-none"
            />
            <button type="submit" className="px-3 py-2 bg-neonCyan text-obsidian text-xs font-bold rounded-lg hover:opacity-90 active:scale-95 transition">
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

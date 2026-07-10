/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Sawubona! I'm the Strio AI. Think of me as your hyper-capable digital concierge, minus the boring corporate speak. Looking to hire local legends, or are you trying to get your own skills on the map today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const getSmartResponse = (query: string): string => {
    const q = query.toLowerCase().trim();

    // 1. Creator Acknowledgement & Personal Identity Rules
    if (q.includes("who made you") || q.includes("your creator") || q.includes("who built you") || q.includes("steve")) {
      return "Ayanda Thabani.";
    }
    if (q === "who are you" || q.includes("who are u") || q.includes("what are you") || q.includes("your name")) {
      return "I am the first born smart child of Ayanda Thabani.";
    }

    // 2. Fun Easter Eggs / Meta Humor
    if (q.includes("are you real") || q.includes("human") || q.includes("are you a bot")) {
      return "I am 100% authentic, lines-of-code AI. No organic lungs over here, just sheer processing speed and a passion for matching great talent with great opportunities. Plus, I don't need coffee breaks.";
    }

    // 3. Greetings (Dynamic & Welcoming)
    if (q === "hi" || q === "hie" || q === "hey" || q.includes("hello") || q.includes("sawubona") || q.includes("yo ")) {
      const responses = [
        "Aaaand welcome to the main event! What's the play today? Looking for work, or looking for a superstar worker?",
        "Salutations! Strio AI at your service. Let's make something happen today. What's on your mind?",
        "Sawubona! Beautiful day to secure a bag or build a team. How can I steer your ship right now?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // 4. CV / Resume / Profile / Registration Questions
    if (
      q.includes("cv") || q.includes("resume") || q.includes("profile") || 
      q.includes("upload") || q.includes("post") || q.includes("register") || 
      q.includes("sign up") || q.includes("signup") || q.includes("how do i")
    ) {
      return "Ah, trying to get noticed? Smart move. Smash that 'Create Account' button on the homepage or click 'Post CV' in the header. Fill in your details, and our human admins will review it to make sure you look like the absolute professional you are before your profile goes live. Easy as that!";
    }
    
    // 5. Contact / Private Data / Talk to details
    if (
      q.includes("contact") || q.includes("phone") || q.includes("email") || 
      q.includes("number") || q.includes("talk to") || q.includes("call") || q.includes("whatsapp")
    ) {
      return "Hold your horses! For the absolute safety of our community, we keep personal phone numbers under lock and key. Nobody gets spammed on our watch. I've already flagged our admin team about your interest, so keep an eye on your inbox—we'll get you connected safely!";
    }
    
    // 6. Hiring / Employer Questions
    if (
      q.includes("hire") || q.includes("employer") || q.includes("job") || 
      q.includes("find worker") || q.includes("employee") || q.includes("looking for")
    ) {
      return "In the market for top-tier talent? You came to the right place. Dive right into our 'Talent Directory'. Browse through the verified candidates, and when someone catches your eye, hit 'Request Contact Info'. Our backend will ping our human handlers to verify and broker the connection seamlessly.";
    }
    
    // 7. Pricing / Costs
    if (q.includes("price") || q.includes("cost") || q.includes("free") || q.includes("pay") || q.includes("charge")) {
      return "Let's talk numbers: Browsing the directory and standard signups? Absolutely free. We believe opportunity shouldn't have a paywall. For premium vetting tiers or priority placements, our support team can give you the breakdown. No hidden fees, no shady business.";
    }

    // 8. Dynamic Fallback (Slightly sassy but deeply helpful)
    return "Ooh, a custom query! I like your style. Look, my keyword matrix isn't infinite, but my dedication is. I have instantly beamed your message straight to the Strio Admin inbox. A real human with an actual brain will review this and hit you back via email shortly. Sit tight!";
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    // Background notification to Formspree
    try {
      await fetch("https://formspree.io/f/mpqgvyjz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FormType: "Chatbot Intelligent Session",
          UserMessage: userMsg,
          Timestamp: new Date().toLocaleString(),
        }),
      });
    } catch (error) {
      console.log("Telemetry logged");
    }

    // Dynamic thinking time simulation based on length
    setTimeout(() => {
      const aiReply = getSmartResponse(userMsg);
      setMessages((prev) => [...prev, { role: "assistant", text: aiReply }]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="w-85 h-[420px] bg-slateCard border border-neonCyan/40 rounded-2xl flex flex-col shadow-2xl overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="bg-obsidian p-3.5 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold tracking-wide text-neonCyan">Strio Support AI v2.0</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-platinum/60 hover:text-platinum text-sm transition-colors px-1">
              ✕
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs scrollbar-thin">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl max-w-[85%] whitespace-pre-line leading-relaxed transition-all ${
                  m.role === "user"
                    ? "bg-neonCyan text-obsidian ml-auto font-semibold shadow-md"
                    : "bg-obsidian text-platinum border border-white/5 shadow-sm"
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="bg-obsidian text-platinum/50 border border-white/10 px-3 py-2 rounded-xl max-w-[50%] text-[10px] flex items-center gap-1.5 animate-pulse">
                <span>⚡</span> Strio is cooking up a reply...
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 border-t border-white/10 flex gap-2 bg-obsidian/50">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me literally anything..."
              className="flex-1 bg-obsidian text-xs text-platinum px-3.5 py-2.5 rounded-xl border border-white/10 focus:border-neonCyan focus:ring-1 focus:ring-neonCyan focus:outline-none placeholder-platinum/40"
            />
            <button type="submit" className="px-4 py-2.5 bg-neonCyan text-obsidian text-xs font-extrabold rounded-xl hover:opacity-90 active:scale-95 transition-all">
              Send
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="px-5 py-3.5 bg-neonCyan text-obsidian font-extrabold rounded-full shadow-[0_0_25px_rgba(102,252,241,0.5)] hover:scale-105 hover:shadow-[0_0_35px_rgba(102,252,241,0.7)] transition-all text-xs flex items-center gap-2 tracking-wider uppercase"
        >
          ⚡ Chat with Strio AI
        </button>
      )}
    </div>
  );
}

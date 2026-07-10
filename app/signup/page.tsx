"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${origin}/dashboard`,
      },
    });

    if (error) {
      alert("Error: " + error.message);
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      {submitted ? (
        <div className="bg-slateCard p-8 rounded-2xl border border-white/10 text-center">
          <h2 className="text-2xl text-platinum font-bold">Check your email!</h2>
          <p className="text-platinum/70 mt-2">We've sent a magic link to {email}</p>
        </div>
      ) : (
        <form onSubmit={handleSignUp} className="bg-slateCard p-6 rounded-2xl border border-white/10 space-y-4">
          <h1 className="text-2xl font-bold text-platinum">Sign Up</h1>
          <input 
            type="email" 
            placeholder="Enter your email to get started" 
            required 
            className="w-full p-3 rounded-lg bg-obsidian text-platinum border border-white/10" 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-3 bg-neonCyan text-obsidian font-bold rounded-lg"
          >
            {loading ? "Sending..." : "Send Magic Link"}
          </button>
        </form>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [candidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    if (authenticated) {
      fetchCandidates();
    }
  }, [authenticated]);

  async function fetchCandidates() {
    // Fetches all profiles
    const { data } = await supabase.from("profiles").select("*");
    if (data) setCandidates(data);
  }

  async function approveCandidate(id: string) {
    // Updates the 'verified' column to true in your database
    const { error } = await supabase
      .from("profiles")
      .update({ verified: true })
      .eq("id", id);
      
    if (!error) {
      alert("Candidate approved & published!");
      fetchCandidates(); // Refresh the list
    }
  }

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto my-16 bg-slateCard border border-white/10 p-6 rounded-2xl text-center">
        <h2 className="text-xl font-bold text-platinum mb-4">Admin Security Access</h2>
        <input
          type="password"
          placeholder="Enter Passcode (Default: 1234)"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          className="w-full bg-obsidian border border-white/10 rounded-xl p-3 text-sm text-platinum mb-4 text-center focus:border-neonCyan focus:outline-none"
        />
        <button
          onClick={() => passcode === "1234" ? setAuthenticated(true) : alert("Invalid Passcode")}
          className="w-full py-3 bg-neonCyan text-obsidian font-bold rounded-xl hover:opacity-90 transition text-sm"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="py-6 space-y-6">
      <h1 className="text-3xl font-extrabold text-platinum">Administrator Safety Portal</h1>
      <p className="text-sm text-platinum/70">Review direct numbers and manage candidate visibility safely.</p>

      <div className="bg-slateCard border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-neonCyan mb-4">Database Registrations</h2>
        <div className="space-y-4">
          {candidates.map((c) => (
            <div key={c.id} className="bg-obsidian border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="font-bold text-platinum">{c.full_name} 
                  <span className="text-xs text-neonCyan font-normal ml-2">({c.skill || "No Skill Listed"})</span>
                </p>
                <p className="text-xs text-platinum/70">Phone: <span className="text-platinum font-mono">{c.phone_number || "N/A"}</span></p>
                {c.cv_url && <a href={c.cv_url} target="_blank" className="text-xs text-neonCyan underline">View Uploaded CV</a>}
              </div>
              <div className="flex gap-2">
                {!c.verified && (
                  <button
                    onClick={() => approveCandidate(c.id)}
                    className="px-4 py-2 bg-neonCyan text-obsidian text-xs font-bold rounded-lg hover:opacity-90"
                  >
                    Approve Candidate
                  </button>
                )}
                {c.verified && <span className="text-xs text-green-500 font-bold">Approved</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

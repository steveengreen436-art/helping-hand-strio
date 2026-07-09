"use client";

import { useState } from "react";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");

  const pendingRequests = [
    { id: 101, name: "Sipho Dlamini", phone: "+27 82 999 1234", skill: "Electrician", status: "Pending Review" },
    { id: 102, name: "Ayo B.", phone: "+27 71 888 4321", skill: "Fullstack Web Dev", status: "Pending Review" },
  ];

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
        <h2 className="text-lg font-bold text-neonCyan mb-4">Pending Registrations</h2>
        <div className="space-y-4">
          {pendingRequests.map((req) => (
            <div key={req.id} className="bg-obsidian border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="font-bold text-platinum">{req.name} <span className="text-xs text-neonCyan font-normal">({req.skill})</span></p>
                <p className="text-xs text-platinum/70">Phone: <span className="text-platinum font-mono">{req.phone}</span></p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => alert("Candidate " + req.name + " approved & published to directory!")}
                  className="px-4 py-2 bg-neonCyan text-obsidian text-xs font-bold rounded-lg hover:opacity-90"
                >
                  Approve Candidate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

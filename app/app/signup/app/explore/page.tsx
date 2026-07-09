"use client";

import { useState } from "react";

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const mockProfiles = [
    { id: 1, name: "Thabo M.", skill: "Plumber & Pipefitter", exp: "6 Years", bio: "Certified plumber specializing in residential leak repairs and pipe installations.", verified: true },
    { id: 2, name: "Nomvula Z.", skill: "Graphic Designer", exp: "4 Years", bio: "UI/UX & brand designer experienced with Photoshop, Figma, and local branding projects.", verified: true },
    { id: 3, name: "David K.", skill: "Auto Mechanic", exp: "8 Years", bio: "Full engine diagnostics and routine brake and suspension maintenance.", verified: true },
  ];

  const filtered = mockProfiles.filter(
    (p) =>
      p.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-platinum">Talent Directory</h1>
          <p className="text-sm text-platinum/70">Browse verified candidates. Contact numbers are protected by admin safety protocols.</p>
        </div>
        <input
          type="text"
          placeholder="Search by skill or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slateCard border border-white/10 rounded-xl px-4 py-3 text-sm text-platinum w-full md:w-72 focus:border-neonCyan focus:outline-none"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((profile) => (
          <div key={profile.id} className="bg-slateCard border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-neonCyan/50 transition">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-platinum">{profile.name}</h3>
                {profile.verified && (
                  <span className="text-[10px] bg-neonCyan/10 text-neonCyan border border-neonCyan/30 px-2 py-0.5 rounded-full font-semibold">
                    Admin Vetted
                  </span>
                )}
              </div>
              <p className="text-xs text-neonCyan font-medium mb-3">{profile.skill} • {profile.exp}</p>
              <p className="text-xs text-platinum/70 leading-relaxed mb-4">{profile.bio}</p>
            </div>

            <button
              onClick={() => alert("Safety Notice: To contact " + profile.name + ", please use the Strio Support Chatbot to connect with an administrator.")}
              className="w-full py-2 bg-obsidian border border-neonCyan/30 text-neonCyan text-xs font-bold rounded-lg hover:bg-neonCyan hover:text-obsidian transition"
            >
              Request Contact Info
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

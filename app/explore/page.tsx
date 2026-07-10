"use client";

import { useState } from "react";

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<{ id: number; name: string; skill: string } | null>(null);
  const [employerForm, setEmployerForm] = useState({ name: "", company: "", email: "", note: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProfile) return;
    setLoading(true);

    try {
      await fetch("https://formspree.io/f/mpqgvyjz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FormType: "EMPLOYER CONNECTION REQUEST",
          TargetCandidateName: selectedProfile.name,
          TargetCandidateSkill: selectedProfile.skill,
          EmployerName: employerForm.name,
          CompanyName: employerForm.company || "Not provided",
          EmployerEmail: employerForm.email,
          Message: employerForm.note,
          RequestedAt: new Date().toLocaleString(),
        }),
      });
      setSuccess(true);
    } catch (err) {
      console.log("Inquiry logged");
    }

    setLoading(false);
  };

  const closeForm = () => {
    setSelectedProfile(null);
    setEmployerForm({ name: "", company: "", email: "", note: "" });
    setSuccess(false);
  };

  return (
    <div className="py-6 space-y-6 relative">
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
              onClick={() => setSelectedProfile(profile)}
              className="w-full py-2 bg-obsidian border border-neonCyan/30 text-neonCyan text-xs font-bold rounded-lg hover:bg-neonCyan hover:text-obsidian transition"
            >
              Request Contact Info
            </button>
          </div>
        ))}
      </div>

      {/* Connection Inquiry Modal Form Popup */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-obsidian/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slateCard border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl relative">
            <button onClick={closeForm} className="absolute top-4 right-4 text-platinum/60 hover:text-platinum text-sm">✕</button>
            
            {success ? (
              <div className="text-center py-4 space-y-3">
                <h3 className="text-xl font-bold text-neonCyan">Request Sent!</h3>
                <p className="text-xs text-platinum/80 leading-relaxed">
                  Your inquiry to connect with <strong>{selectedProfile.name}</strong> has been transmitted to Strio Admin support. We will audit your profile and email you details shortly.
                </p>
                <button onClick={closeForm} className="px-5 py-2 bg-neonCyan text-obsidian text-xs font-bold rounded-lg mt-2">Close</button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-platinum">Connect with {selectedProfile.name}</h3>
                  <p className="text-[11px] text-platinum/60">Fill in your basic information to safely request their administrative contact file.</p>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-platinum/70 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={employerForm.name}
                    onChange={(e) => setEmployerForm({ ...employerForm, name: e.target.value })}
                    className="w-full bg-obsidian border border-white/10 rounded-lg p-2.5 text-xs text-platinum focus:border-neonCyan focus:outline-none"
                    placeholder="e.g. Jane Doe"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-platinum/70 mb-1">Company / Project Name (Optional)</label>
                  <input
                    type="text"
                    value={employerForm.company}
                    onChange={(e) => setEmployerForm({ ...employerForm, company: e.target.value })}
                    className="w-full bg-obsidian border border-white/10 rounded-lg p-2.5 text-xs text-platinum focus:border-neonCyan focus:outline-none"
                    placeholder="e.g. Strio Builders Ltd"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-platinum/70 mb-1">Your Email Address</label>
                  <input
                    type="email"
                    required
                    value={employerForm.email}
                    onChange={(e) => setEmployerForm({ ...employerForm, email: e.target.value })}
                    className="w-full bg-obsidian border border-white/10 rounded-lg p-2.5 text-xs text-platinum focus:border-neonCyan focus:outline-none"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-platinum/70 mb-1">Brief note about the job</label>
                  <textarea
                    required
                    rows={2}
                    value={employerForm.note}
                    onChange={(e) => setEmployerForm({ ...employerForm, note: e.target.value })}
                    className="w-full bg-obsidian border border-white/10 rounded-lg p-2.5 text-xs text-platinum focus:border-neonCyan focus:outline-none"
                    placeholder="Describe the opportunity or hours..."
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={closeForm} className="px-4 py-2 bg-obsidian border border-white/10 text-platinum/80 text-xs rounded-lg hover:text-platinum">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading} className="px-4 py-2 bg-neonCyan text-obsidian text-xs font-bold rounded-lg hover:opacity-90">
                    {loading ? "Processing..." : "Submit Inquiry"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

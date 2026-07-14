'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ExplorePage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);
  const [employerForm, setEmployerForm] = useState({ name: "", company: "", email: "", note: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchProfiles() {
      // Fetching live data from your 'profiles' table
      const { data } = await supabase
        .from('profiles')
        .select('*');
      
      if (data) setProfiles(data);
    }
    fetchProfiles();
  }, []);

  // Filter logic now uses the data from your database
  const filtered = profiles.filter(
    (p) =>
      p.skill?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
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
          TargetCandidateName: selectedProfile.full_name,
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
      {/* ... keep your Header and Search Input UI the same ... */}
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((profile) => (
          <div key={profile.id} className="bg-slateCard border border-white/10 rounded-2xl p-5 ...">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-platinum">{profile.full_name}</h3>
                {profile.verified && (
                  <span className="text-[10px] bg-neonCyan/10 text-neonCyan ...">Admin Vetted</span>
                )}
              </div>
              <p className="text-xs text-neonCyan font-medium mb-3">{profile.skill} • {profile.exp}</p>
              <p className="text-xs text-platinum/70 leading-relaxed mb-4">{profile.bio}</p>
            </div>

            <button
              onClick={() => setSelectedProfile(profile)}
              className="w-full py-2 bg-obsidian border border-neonCyan/30 text-neonCyan ..."
            >
              Request Contact Info
            </button>
          </div>
        ))}
      </div>

      {/* ... keep your Modal code exactly as it was ... */}
    </div>
  );
}

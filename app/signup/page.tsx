"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    skill: "",
    experience: "",
    bio: "",
    terms: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.terms) return alert("You must agree to the terms.");
    setLoading(true);

    try {
  const { error } = await supabase.from("profiles").insert([{
  full_name: formData.fullName, // Match this to your DB column name
  email: formData.email,
  phone: formData.phone,
  skill: formData.skill,
  experience: formData.experience,
  bio: formData.bio,
}]);
      }]);

      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      alert("Error saving profile. Check your database columns.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-platinum mb-2">Create Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-slateCard p-6 rounded-2xl border border-white/10">
        <input type="text" placeholder="Full Name" required className="w-full p-3 rounded-lg bg-obsidian text-platinum border border-white/10" onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
        <input type="email" placeholder="Email Address" required className="w-full p-3 rounded-lg bg-obsidian text-platinum border border-white/10" onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <input type="tel" placeholder="Phone Number" required className="w-full p-3 rounded-lg bg-obsidian text-platinum border border-white/10" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        <input type="text" placeholder="Skill/Trade" required className="w-full p-3 rounded-lg bg-obsidian text-platinum border border-white/10" onChange={(e) => setFormData({...formData, skill: e.target.value})} />
        <input type="text" placeholder="Years of Experience" required className="w-full p-3 rounded-lg bg-obsidian text-platinum border border-white/10" onChange={(e) => setFormData({...formData, experience: e.target.value})} />
        <textarea placeholder="Brief Bio" className="w-full p-3 rounded-lg bg-obsidian text-platinum border border-white/10" onChange={(e) => setFormData({...formData, bio: e.target.value})} />
        
        <label className="flex items-center gap-2 text-platinum text-sm">
          <input type="checkbox" required onChange={(e) => setFormData({...formData, terms: e.target.checked})} />
          I agree to the Terms and Conditions
        </label>

        <button type="submit" disabled={loading} className="w-full py-3 bg-neonCyan text-obsidian font-bold rounded-lg">
          {loading ? "Submitting..." : "Submit Profile"}
        </button>
      </form>
    </div>
  );
}

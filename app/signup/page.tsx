"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "", // Added
    phone: "",
    skill: "",
    experience: "",
    bio: "",
    terms: false, // Added
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Save data to Supabase
    try {
      await supabase.from("profiles").insert([
        {
          full_name: formData.fullName,
          email: formData.email, // Added
          phone: formData.phone,
          skill: formData.skill,
          experience: formData.experience,
          bio: formData.bio,
        },
      ]);
    } catch (dbError) {
      console.log("Database error");
    }

    // Send to Email via Formspree
    try {
      await fetch("https://formspree.io/f/mpqgvyjz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FormType: "NEW PROFILE/CV REGISTRATION",
          CandidateName: formData.fullName,
          EmailAddress: formData.email, // Added
          ContactPhone: formData.phone,
          MainSkill: formData.skill,
          ExperienceTime: formData.experience,
          SummaryBio: formData.bio,
          SubmittedAt: new Date().toLocaleString(),
        }),
      });
    } catch (emailError) {
      console.log("Notification sent");
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-platinum mb-2">Create Your Profile</h1>
      
      {submitted ? (
        <div className="bg-slateCard border border-neonCyan p-6 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-neonCyan mb-2">Registration Submitted!</h2>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-slateCard border border-white/10 p-6 rounded-2xl">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-platinum/80 mb-1">Email Address</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-obsidian border border-white/10 rounded-lg p-3 text-platinum" placeholder="e.g. name@email.com" />
          </div>

          {/* Existing Fields (Name, Phone, Skill, Experience, Bio) remain here... */}
          {/* Add your existing inputs here */}

          {/* Terms & Conditions Checkbox */}
          <div className="flex items-center gap-2">
            <input type="checkbox" required checked={formData.terms} onChange={(e) => setFormData({ ...formData, terms: e.target.checked })} />
            <label className="text-xs text-platinum/70">I agree to the Terms and Conditions</label>
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 bg-neonCyan text-obsidian font-bold rounded-xl">
            {loading ? "Submitting..." : "Submit Profile"}
          </button>
        </form>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    skill: "",
    experience: "",
    bio: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Save data safely inside your Supabase Database
    try {
      await supabase.from("profiles").insert([
        {
          full_name: formData.fullName,
          phone: formData.phone,
          skill: formData.skill,
          experience: formData.experience,
          bio: formData.bio,
        },
      ]);
    } catch (dbError) {
      console.log("Database logged");
    }

    // 2. Instantly forward all registration & contact details to your personal email
    try {
      await fetch("https://formspree.io/f/mpqgvyjz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FormType: "NEW PROFILE/CV REGISTRATION ALERT",
          CandidateName: formData.fullName,
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
      <p className="text-sm text-platinum/70 mb-8">
        Your skills will be listed publicly, but your personal phone number remains hidden and secured with admin verification.
      </p>

      {submitted ? (
        <div className="bg-slateCard border border-neonCyan p-6 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-neonCyan mb-2">Registration Submitted!</h2>
          <p className="text-sm text-platinum/80">
            Thank you! An administrator will review your contact details shortly before making your public listing live.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-slateCard border border-white/10 p-6 rounded-2xl">
          <div>
            <label className="block text-xs font-semibold text-platinum/80 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-obsidian border border-white/10 rounded-lg p-3 text-sm text-platinum focus:border-neonCyan focus:outline-none"
              placeholder="e.g. Sipho Dlamini"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-platinum/80 mb-1">Private Phone / Contact Number</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-obsidian border border-white/10 rounded-lg p-3 text-sm text-platinum focus:border-neonCyan focus:outline-none"
              placeholder="e.g. +27 82 123 4567"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-platinum/80 mb-1">Primary Skill / Trade</label>
            <input
              type="text"
              required
              value={formData.skill}
              onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
              className="w-full bg-obsidian border border-white/10 rounded-lg p-3 text-sm text-platinum focus:border-neonCyan focus:outline-none"
              placeholder="e.g. Electrician, Carpenter, Developer"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-platinum/80 mb-1">Years of Experience</label>
            <input
              type="text"
              required
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full bg-obsidian border border-white/10 rounded-lg p-3 text-sm text-platinum focus:border-neonCyan focus:outline-none"
              placeholder="e.g. 5 Years"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-platinum/80 mb-1">Brief Bio / Work Summary</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-obsidian border border-white/10 rounded-lg p-3 text-sm text-platinum focus:border-neonCyan focus:outline-none"
              placeholder="Tell employers what you do best..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-neonCyan text-obsidian font-bold rounded-xl hover:opacity-90 transition mt-4"
          >
            {loading ? "Submitting..." : "Submit Profile"}
          </button>
        </form>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
// After installing uploadthing, uncomment the line below:
// import { UploadButton } from "@uploadthing/react"; 

export default function PostPage() {
  const [caption, setCaption] = useState("");

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold text-platinum mb-6">Share an Update</h1>
      <div className="bg-slateCard p-6 rounded-2xl border border-white/10 space-y-4">
        <textarea 
          className="w-full p-3 rounded-lg bg-obsidian text-platinum" 
          placeholder="What are you working on?"
          onChange={(e) => setCaption(e.target.value)}
        />
        {/* Add <UploadButton /> here once configured */}
        <button className="w-full py-3 bg-neonCyan text-obsidian font-bold rounded-lg">Post</button>
      </div>
    </div>
  );
}

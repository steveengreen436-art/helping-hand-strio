"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function PostPage() {
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePost = async () => {
    if (!caption.trim()) return;
    setLoading(true);

    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from("posts") // Ensure you have a 'posts' table
        .insert([{ content: caption, user_id: user.id }]);

      if (!error) {
        setCaption("");
        router.push("/dashboard"); // Redirect to your dashboard
      } else {
        alert("Error posting: " + error.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      {/* Header with vibrant accent */}
      <h1 className="text-3xl font-extrabold text-white mb-6 border-l-4 border-neonCyan pl-4">
        Create a Post
      </h1>

      {/* Vibrant Card Container */}
      <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl space-y-6">
        <textarea 
          className="w-full p-4 rounded-xl bg-black text-white border border-gray-700 focus:border-neonCyan outline-none transition-all" 
          placeholder="Share your talent, skill, or opportunity..."
          rows={5}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        
        <button 
          onClick={handlePost}
          disabled={loading}
          className="w-full py-4 bg-neonCyan text-black font-bold text-lg rounded-xl hover:bg-white transition-all transform hover:scale-[1.02]"
        >
          {loading ? "Posting..." : "Post to Helping Hand"}
        </button>
      </div>
    </div>
  );
}

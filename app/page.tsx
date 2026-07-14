'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // Ensure this path is correct

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase.from('posts').select('*');
      if (data) setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-12">
      {/* --- Your existing Logo & Text --- */}
      <div className="mb-6 hover:scale-105 transition duration-300 rounded-full overflow-hidden border-2 border-neonCyan shadow-[0_0_30px_rgba(102,252,241,0.2)] w-[180px] h-[180px] flex items-center justify-center bg-obsidian">
        <Image src="/logo.png" alt="Logo" width={180} height={180} className="rounded-full object-cover w-full h-full" priority />
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold text-platinum mb-4">
        Connecting Talent with Opportunity <br />
        <span className="text-neonCyan">Safely & Directly</span>
      </h1>
      
      {/* --- New Feed Section added below your text --- */}
      <div className="w-full max-w-2xl mt-12 text-left">
        <h2 className="text-2xl font-bold text-white mb-6">Recent Posts</h2>
        {posts.map((post) => (
          <div key={post.id} className="border border-neonCyan/20 p-4 mb-4 rounded-xl bg-obsidian/50 text-white">
            <p>{post.content}</p>
            <small className="text-neonCyan/60">{new Date(post.created_at).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

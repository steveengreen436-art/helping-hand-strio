'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      // JOINING posts with user_profiles so we can show the name
      const { data } = await supabase
        .from('posts')
        .select(`
          *,
          user_profiles (full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(5); // Only show 5 recent posts to keep it clean
      
      if (data) setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="mb-6 mx-auto w-[180px] h-[180px] rounded-full overflow-hidden border-2 border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.2)]">
          <Image src="/logo.png" alt="Logo" width={180} height={180} className="object-cover" />
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          Connecting Talent with <br />
          <span className="text-cyan-400">Opportunity</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-xl mx-auto mb-10">
          Post your skills, view public CVs, and find employment locally.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup" className="px-8 py-4 bg-cyan-400 text-black font-bold rounded-xl hover:scale-105 transition-transform">
            Create Account
          </Link>
          <Link href="/explore" className="px-8 py-4 bg-gray-900 border border-gray-700 text-white font-bold rounded-xl hover:border-cyan-400 transition-all">
            Browse Directory
          </Link>
        </div>
      </div>

      {/* Feed Section - The "Alive" Part */}
      <div className="w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          Recent Activity <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        </h2>
        
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl mb-4 hover:border-cyan-400/50 transition-all shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center font-bold text-cyan-400">
                {post.user_profiles?.full_name?.charAt(0) || 'U'}
              </div>
              <span className="font-bold">{post.user_profiles?.full_name || 'Anonymous User'}</span>
            </div>
            <p className="text-gray-200 text-lg mb-4">{post.content}</p>
            <span className="text-xs text-gray-500">{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      // Fetching posts. Note: user_profiles must be linked in Supabase
      const { data } = await supabase
        .from('posts')
        .select(`*, user_profiles (full_name)`)
        .order('created_at', { ascending: false });

      if (data) setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation Header - Only one exists now */}
      <nav className="flex justify-between items-center p-6 border-b border-gray-900 bg-black">
        <span className="font-bold text-xl">Helping Hand Strio</span>
        <div className="flex gap-4">
          <Link href="/explore" className="text-sm font-bold hover:text-cyan-400">Browse Directory</Link>
          <Link href="/post-cv" className="bg-cyan-400 text-black px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90">Post CV</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
          Connecting Talent with <br /> <span className="text-cyan-400">Opportunity</span>
        </h1>
        <div className="flex gap-4">
          <Link href="/signup" className="bg-cyan-400 text-black px-8 py-3 rounded-full font-bold hover:bg-white transition-colors">
            Create Account
          </Link>
          <Link href="/explore" className="border border-gray-700 px-8 py-3 rounded-full hover:border-gray-500 transition-colors">
            Browse Directory
          </Link>
        </div>
      </div>

      {/* Feed Grid */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-8">Recent Activity</h2>
        
        {loading ? (
          <p className="text-gray-500">Loading talent posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500">No posts yet. Be the first to share your skills!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-900 border border-gray-800 p-6 rounded-3xl hover:border-cyan-400 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center text-black font-bold">
                    {post.user_profiles?.full_name ? post.user_profiles.full_name.charAt(0) : 'U'}
                  </div>
                  <span className="font-bold">{post.user_profiles?.full_name || 'Anonymous'}</span>
                </div>
                <p className="text-gray-300">{post.content}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

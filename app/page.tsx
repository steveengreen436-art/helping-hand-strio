'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import AnnouncementCard from '../components/AnnouncementCard';

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
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
      {/* ... Hero Section remains the same ... */}

      <section className="max-w-4xl mx-auto px-6 pb-20">
        
        {/* THIS HEADING IS AT THE TOP */}
        <h2 className="text-2xl font-bold mb-8">Recent Activity</h2>
        
        {/* THE ANNOUNCEMENT CARD IS NOW THE FIRST ITEM IN THE FEED */}
        <AnnouncementCard location="Eswatini" email="helpinghandstrio@gmail.com" />

        {loading ? (
          <p className="text-gray-500">Loading talent posts...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* THIS MAPS ALL USER POSTS AUTOMATICALLY */}
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

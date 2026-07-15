'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
// 1. THIS IS THE LINE YOU ADDED AT THE TOP:
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
      {/* ... your Header and Hero sections ... */}

      <section className="max-w-4xl mx-auto px-6 pb-20">
        
        {/* 2. THIS IS WHERE YOU PLACED THE CARD: */}
        <AnnouncementCard /> 

        <h2 className="text-2xl font-bold mb-8">Recent Activity</h2>
        
        {loading ? (
          <p className="text-gray-500">Loading talent posts...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-900 p-6 rounded-3xl">
                {/* ... your post display logic ... */}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

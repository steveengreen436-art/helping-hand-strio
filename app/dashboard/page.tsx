'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';
import AnnouncementCard from '../../components/AnnouncementCard';

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
      <section className="max-w-4xl mx-auto px-6 py-20">
        
        {/* Updated card with required props */}
        <AnnouncementCard location="Eswatini" email="helpinghandstrio@gmail.com" />

        <h2 className="text-2xl font-bold mb-8">Recent Activity</h2>
        
        {loading ? (
          <p className="text-gray-500">Loading talent posts...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-900 p-6 rounded-3xl">
                <span className="font-bold">{post.user_profiles?.full_name || 'Anonymous'}</span>
                <p className="text-gray-300 mt-2">{post.content}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

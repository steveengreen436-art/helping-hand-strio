'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import PostForm from '@/components/PostForm';

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);

  async function fetchPosts() {
    const { data } = await supabase
      .from('posts')
      .select('*, profiles(full_name)')
      .order('created_at', { ascending: false });
    if (data) setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Community Feed</h1>
      
      {/* Reusable Post Component */}
      <PostForm onPostCreated={fetchPosts} />

      {/* List of Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-slateCard p-4 rounded-xl border border-white/10 text-white">
            <p className="font-bold text-neonCyan">{post.profiles?.full_name || 'Anonymous'}</p>
            <p className="mt-2">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

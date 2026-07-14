'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import PostForm from '@/components/PostForm';

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      fetchPosts();
    }
    init();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase
      .from('posts')
      .select('*, profiles(full_name)')
      .order('created_at', { ascending: false });
    if (data) setPosts(data);
  }

  // Interaction Logic
  async function handleLike(postId: string) {
    if (!user) return alert("Sign in to like!");
    await supabase.from('likes').insert({ post_id: postId, user_id: user.id });
    fetchPosts();
  }

  async function handleFollow(targetId: string) {
    if (!user) return alert("Sign in to follow!");
    await supabase.from('follows').insert({ following_id: targetId, follower_id: user.id });
    alert("Followed!");
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Community Feed</h1>
      
      {/* Post Form (Only shows for logged in users) */}
      {user ? <PostForm onPostCreated={fetchPosts} /> : <p className="text-white/50 mb-4">Sign in to post opportunities.</p>}

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-slateCard p-4 rounded-xl border border-white/10 text-white">
            <div className="flex justify-between items-center">
              <p className="font-bold text-neonCyan">{post.profiles?.full_name || 'Anonymous'}</p>
              {user?.id !== post.user_id && (
                <button onClick={() => handleFollow(post.user_id)} className="text-xs bg-white/10 px-2 py-1 rounded">Follow</button>
              )}
            </div>
            <p className="mt-2">{post.content}</p>
            <div className="mt-4 flex gap-4 text-sm">
              <button onClick={() => handleLike(post.id)} className="text-neonCyan">Like</button>
              <button className="text-white/70">Comment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

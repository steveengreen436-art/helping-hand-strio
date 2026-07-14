'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [followedIds, setFollowedIds] = useState<string[]>([]);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data } = await supabase.from('follows').select('following_id').eq('follower_id', user.id);
        if (data) setFollowedIds(data.map(f => f.following_id));
      }
      fetchPosts();
      fetchSuggestions();
    }
    init();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase.from('posts').select('*, profiles(full_name)');
    if (data) setPosts(data);
  }

  async function fetchSuggestions() {
    const { data } = await supabase.from('profiles').select('id, full_name, skill').limit(10);
    if (data) setSuggestions(data);
  }

  // The Follow Function
  async function followUser(targetId: string) {
    if (!user) return alert("Please log in to follow.");
    await supabase.from('follows').insert([{ follower_id: user.id, following_id: targetId }]);
    setFollowedIds([...followedIds, targetId]);
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold text-white mb-6">Community Feed</h1>
        {posts.map((post) => (
          <div key={post.id} className="bg-slateCard p-4 rounded-xl mb-4 border border-white/10">
            <Link href={`/profile/${post.user_id}`} className="font-bold text-neonCyan hover:underline">
              {post.profiles?.full_name || 'Anonymous'}
            </Link>
            <p className="text-white/80 mt-1">{post.content}</p>
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <div className="bg-slateCard p-6 rounded-2xl border border-white/10">
          <h2 className="font-bold text-white mb-4">Suggested Talent</h2>
          <div className="space-y-4">
            {suggestions.map((s) => (
              <div key={s.id} className="flex justify-between items-center">
                <div>
                  <Link href={`/profile/${s.id}`} className="text-sm font-bold text-white hover:text-neonCyan">{s.full_name}</Link>
                  <p className="text-[10px] text-neonCyan">{s.skill}</p>
                </div>
                {/* Follow Button Logic */}
                {followedIds.includes(s.id) ? (
                  <span className="text-[10px] text-white/50">Following</span>
                ) : (
                  <button 
                    onClick={() => followUser(s.id)}
                    className="text-[10px] bg-neonCyan/10 text-neonCyan px-2 py-1 rounded font-bold hover:bg-neonCyan/20"
                  >
                    Follow
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

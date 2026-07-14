'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import PostForm from '@/components/PostForm';

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState(''); // Added Search State
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'following'>('all');
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
  }, [activeTab]);

  async function fetchPosts() {
    let query = supabase.from('posts').select('*, profiles(full_name), likes(count)');
    if (activeTab === 'following') {
      if (followedIds.length === 0) { setPosts([]); return; }
      query = query.in('user_id', followedIds);
    }
    const { data } = await query.order('created_at', { ascending: false });
    if (data) setPosts(data.map(p => ({ ...p, likeCount: p.likes?.length || 0 })));
  }

  async function fetchSuggestions() {
    const { data } = await supabase.from('profiles').select('id, full_name, skill').limit(10);
    if (data) setSuggestions(data);
  }

  // Filter logic for sidebar
  const filteredSuggestions = suggestions.filter((s) =>
    s.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Feed Column */}
      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold text-white mb-6">Community Feed</h1>
        {/* ... rest of your existing feed code remains the same ... */}
      </div>

      {/* Suggested Talent Sidebar with Search */}
      <div className="hidden md:block">
        <div className="bg-slateCard p-6 rounded-2xl border border-white/10 sticky top-6">
          <h2 className="font-bold text-white mb-4">Suggested Talent</h2>
          
          {/* SEARCH BAR */}
          <input 
            type="text"
            placeholder="Search talent..."
            className="w-full bg-obsidian border border-white/10 p-2 rounded-lg text-xs text-white mb-4 focus:border-neonCyan outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="space-y-4">
            {filteredSuggestions.map((s) => (
              <div key={s.id} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold text-white">{s.full_name}</p>
                  <p className="text-[10px] text-neonCyan">{s.skill}</p>
                </div>
                <button className="text-[10px] bg-neonCyan/10 text-neonCyan px-2 py-1 rounded font-bold">Follow</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

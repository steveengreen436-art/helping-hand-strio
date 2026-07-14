'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import PostForm from '@/components/PostForm';

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'following'>('all');
  const [followedIds, setFollowedIds] = useState<string[]>([]);
  const [commentInput, setCommentInput] = useState<Record<string, string>>({});

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data } = await supabase.from('follows').select('following_id').eq('follower_id', user.id);
        if (data) setFollowedIds(data.map(f => f.following_id));
      }
      fetchPosts();
    }
    init();
  }, [activeTab]); // Added activeTab to refresh when toggled

  async function fetchPosts() {
    // Fetch posts with like count
    let query = supabase.from('posts').select(`
      *, 
      profiles(full_name),
      likes(count)
    `);
    
    if (activeTab === 'following') {
      if (followedIds.length === 0) { setPosts([]); return; }
      query = query.in('user_id', followedIds);
    }
    
    const { data } = await query.order('created_at', { ascending: false });
    
    if (data) {
      const formattedPosts = data.map(post => ({
        ...post,
        likeCount: post.likes ? post.likes.length : 0
      }));
      setPosts(formattedPosts);
    }
  }

  async function handleLike(postId: string) {
    if (!user) return alert("Sign up to like!");
    await supabase.from('likes').insert({ post_id: postId, user_id: user.id });
    fetchPosts(); // Refresh counts
  }

  async function addComment(postId: string) {
    if (!user) return alert("Please sign up to comment.");
    await supabase.from('comments').insert({ post_id: postId, user_id: user.id, content: commentInput[postId] });
    setCommentInput({ ...commentInput, [postId]: '' });
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Community Feed</h1>
      
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button onClick={() => setActiveTab('all')} className={`font-bold ${activeTab === 'all' ? 'text-neonCyan' : 'text-white/50'}`}>All</button>
        <button onClick={() => setActiveTab('following')} className={`font-bold ${activeTab === 'following' ? 'text-neonCyan' : 'text-white/50'}`}>Following</button>
      </div>

      {user ? <PostForm onPostCreated={fetchPosts} /> : <p className="text-white/50 mb-4 bg-slateCard p-3 rounded">Sign up to post and interact.</p>}

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-slateCard p-4 rounded-xl border border-white/10 text-white">
            <p className="font-bold text-neonCyan">{post.profiles?.full_name || 'Anonymous'}</p>
            <p className="mt-2">{post.content}</p>
            
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex gap-4 text-sm items-center">
                <button onClick={() => handleLike(post.id)} className="text-neonCyan font-bold flex items-center gap-2">
                  Like 
                  <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs text-white">{post.likeCount}</span>
                </button>
              </div>
              
              {/* Comment Input */}
              <div className="flex gap-2 mt-2">
                <input 
                  className="bg-obsidian w-full p-2 rounded text-xs" 
                  placeholder="Write a comment..."
                  value={commentInput[post.id] || ''}
                  onChange={(e) => setCommentInput({...commentInput, [post.id]: e.target.value})}
                />
                <button onClick={() => addComment(post.id)} className="bg-neonCyan text-obsidian px-3 rounded text-xs font-bold">Post</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [followedIds, setFollowedIds] = useState<string[]>([]);
  
  // State to hold what users are typing in the comment boxes
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

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
    // We updated this query to also fetch comments and the profiles of the commenters
    const { data } = await supabase
      .from('posts')
      .select('*, profiles(full_name), comments(*, profiles(full_name))')
      .order('created_at', { ascending: false });
    if (data) setPosts(data);
  }

  async function fetchSuggestions() {
    const { data } = await supabase.from('profiles').select('id, full_name, skill').limit(10);
    if (data) setSuggestions(data);
  }

  async function followUser(targetId: string) {
    if (!user) return alert("Please log in to follow.");
    await supabase.from('follows').insert([{ follower_id: user.id, following_id: targetId }]);
    setFollowedIds([...followedIds, targetId]);
  }

  // The function to submit a new comment
  async function submitComment(postId: string) {
    if (!user) return alert("Please log in to comment.");
    const content = commentInputs[postId];
    if (!content) return;

    const { error } = await supabase
      .from('comments')
      .insert([{ post_id: postId, user_id: user.id, content }]);

    if (!error) {
      // Clear the input field and refresh posts to show the new comment
      setCommentInputs({ ...commentInputs, [postId]: '' });
      fetchPosts();
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold text-white mb-6">Community Feed</h1>
        
        {posts.map((post) => (
          <div key={post.id} className="bg-slateCard p-6 rounded-xl mb-6 border border-white/10">
            {/* Post Header */}
            <Link href={`/profile/${post.user_id}`} className="font-bold text-neonCyan hover:underline text-lg">
              {post.profiles?.full_name || 'Anonymous'}
            </Link>
            <p className="text-white mt-2 mb-4">{post.content}</p>
            
            <hr className="border-white/10 my-4" />

            {/* Display Comments */}
            <div className="space-y-3 mb-4">
              {post.comments && post.comments.map((comment: any) => (
                <div key={comment.id} className="bg-obsidian p-3 rounded-lg border border-white/5">
                  <span className="font-bold text-neonCyan text-xs block mb-1">
                    {comment.profiles?.full_name || 'Anonymous'}
                  </span>
                  <p className="text-sm text-platinum/80">{comment.content}</p>
                </div>
              ))}
            </div>

            {/* Comment Input Box */}
            <div className="flex gap-2">
              <input 
                type="text"
                placeholder="Write a comment..."
                className="flex-1 bg-obsidian border border-white/10 p-2 rounded-lg text-sm text-white focus:border-neonCyan outline-none"
                value={commentInputs[post.id] || ''}
                onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
              />
              <button 
                onClick={() => submitComment(post.id)}
                className="bg-neonCyan text-obsidian px-4 py-2 rounded-lg font-bold text-sm hover:opacity-90"
              >
                Post
              </button>
            </div>
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

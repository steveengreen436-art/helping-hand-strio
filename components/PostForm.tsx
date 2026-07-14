'use client'
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function PostForm({ onPostCreated }: { onPostCreated: () => void }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  async function handlePost() {
    if (!content.trim()) return;
    
    // Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("You must be logged in to post!");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from('posts').insert({ 
      content, 
      user_id: user.id 
    });

    if (!error) {
      setContent('');
      onPostCreated(); // Triggers the parent feed to refresh
    }
    setLoading(false);
  }

  return (
    <div className="bg-slateCard border border-white/10 p-4 rounded-xl mb-6">
      <textarea 
        className="w-full bg-obsidian text-white p-3 rounded-lg border border-white/10 focus:border-neonCyan outline-none"
        placeholder="What's happening in your job/project?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button 
        onClick={handlePost} 
        disabled={loading}
        className="mt-2 bg-neonCyan text-obsidian px-4 py-2 rounded-lg font-bold hover:opacity-90"
      >
        {loading ? 'Posting...' : 'Post'}
      </button>
    </div>
  );
}

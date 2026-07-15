'use client'
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '../../../../lib/supabaseClient';

export default function JobPostPage() {
  const params = useParams();
  const category = params.category as string;
  const job = params.job as string;
  
  const [content, setContent] = useState('');

  const handlePost = async () => {
    // 1. Get the current logged-in user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in to post.");
      return;
    }

    // 2. Save the post including the user_id
    const { error } = await supabase.from('posts').insert([{ 
      content, 
      category: category, 
      job_type: job,
      user_id: user.id // Linking the post to the user
    }]);
    
    if (error) {
      alert("Error posting: " + error.message);
    } else {
      alert("Posted successfully!");
      // 3. Redirect back to the dashboard to see the feed
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-10 text-white min-h-screen">
      <h1 className="text-3xl font-black mb-2 uppercase text-cyan-400">
        Post for: {job.replace(/-/g, ' ')}
      </h1>
      <p className="text-gray-400 mb-6 capitalize">Category: {category}</p>
      
      <textarea 
        className="w-full h-40 bg-gray-900 p-4 rounded-xl border border-cyan-500 text-white"
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your job advertisement or CV details here..."
      />
      <button 
        onClick={handlePost} 
        className="bg-cyan-400 text-black font-bold px-8 py-3 rounded-full mt-4 hover:bg-white transition-all"
      >
        Publish Advertisement
      </button>
    </div>
  );
}

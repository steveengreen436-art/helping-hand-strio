'use client'
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '../../../../lib/supabaseClient'; // Adjust dots based on folder depth

export default function JobPostPage() {
  const params = useParams();
  // These variables automatically match the folder names from the URL
  const category = params.category as string;
  const job = params.job as string;
  
  const [content, setContent] = useState('');

  const handlePost = async () => {
    // This saves the post with the category and job title attached
    const { error } = await supabase.from('posts').insert([{ 
      content, 
      category: category, 
      job_type: job 
    }]);
    
    if (error) alert("Error posting: " + error.message);
    else alert("Posted successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto p-10 text-white min-h-screen">
      <h1 className="text-3xl font-black mb-2 uppercase text-cyan-400">Post for: {job.replace(/-/g, ' ')}</h1>
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

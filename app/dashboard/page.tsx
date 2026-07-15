'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';
import AnnouncementCard from '../../components/AnnouncementCard';

// Full Category Data
const jobData = [
  { title: "Healthcare & Medical Services", subs: ["Physicians", "Nursing", "Therapy-Rehab", "Pharmacy-Labs", "Emergency-Services", "Dental-Care"] },
  { title: "Technology, Software & Data", subs: ["Development", "Data-AI", "Infrastructure", "Cybersecurity", "Support", "Design"] },
  { title: "Skilled Trades, Construction & Maintenance", subs: ["Structural-Building", "Systems-Installation", "Finishing-Work", "Heavy-Machinery", "Maintenance", "Automotive"] },
  { title: "Business, Finance & Administration", subs: ["Accounting", "Finance", "Management", "Human-Resources", "Administration"] },
  { title: "Marketing, Sales & Customer Support", subs: ["Digital-Marketing", "Content-Creation", "Sales", "Customer-Relations"] },
  { title: "Education, Training & Social Services", subs: ["Schooling", "Higher-Education", "Specialized-Training", "Social-Services", "Childcare"] },
  { title: "Hospitality, Tourism & Food Service", subs: ["Kitchen-Staff", "Front-of-House", "Hotel-Operations", "Tourism"] },
  { title: "Transport, Logistics & Supply Chain", subs: ["Drivers", "Aviation", "Maritime", "Warehouse"] },
  { title: "Agriculture, Nature & Animals", subs: ["Farming", "Landscaping", "Animal-Care", "Environmental"] },
  { title: "Creative Arts, Media & Entertainment", subs: ["Visual-Arts", "Writing", "Performance", "Production"] },
  { title: "Legal, Law Enforcement & Public Safety", subs: ["Legal", "Police-Security", "Fire-Services", "Military"] },
  { title: "Engineering, Science & Manufacturing", subs: ["Engineering", "Science", "Factory-Production"] },
];

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
    <main className="min-h-screen bg-black text-white p-6">
      <section className="max-w-4xl mx-auto py-10">
        <AnnouncementCard location="Eswatini" email="helpinghandstrio@gmail.com" />
        
        {/* Job Directory Section */}
        <h2 className="text-2xl font-bold mt-12 mb-6 text-cyan-400">Post a Job by Sector</h2>
        <div className="space-y-6 mb-12">
          {jobData.map((cat) => (
            <div key={cat.title}>
              <h3 className="text-md font-semibold text-gray-300 mb-2">{cat.title}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {cat.subs.map((job) => (
                  <Link 
                    key={job} 
                    href={`/post/${cat.title.split(' ')[0].toLowerCase()}/${job.toLowerCase()}`}
                    className="bg-gray-900 hover:bg-cyan-900 border border-gray-800 p-2 rounded text-xs text-center transition-all"
                  >
                    {job.replace(/-/g, ' ')}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Feed Section */}
        <h2 className="text-2xl font-bold mb-8">Recent Activity</h2>
        {loading ? (
          <p className="text-gray-500">Loading posts...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-900 p-6 rounded-3xl border border-gray-800">
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

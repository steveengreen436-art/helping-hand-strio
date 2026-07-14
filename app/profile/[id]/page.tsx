'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useParams } from 'next/navigation';

export default function PublicProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      // Fetch Profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();
      setProfile(profileData);

      // Fetch Work History
      const { data: historyData } = await supabase
        .from('work_experience')
        .select('*')
        .eq('user_id', id);
      setHistory(historyData || []);
    }
    loadData();
  }, [id]);

  if (!profile) return <div className="p-10 text-white">Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 text-white">
      <div className="bg-slateCard p-8 rounded-2xl border border-white/10 mb-6">
        <h1 className="text-3xl font-bold">{profile.full_name}</h1>
        <p className="text-neonCyan font-bold mt-1">{profile.headline}</p>
        <p className="mt-4 text-platinum/80">{profile.bio}</p>
      </div>

      <h2 className="text-xl font-bold mb-4">Work Experience</h2>
      <div className="space-y-4">
        {history.map((item) => (
          <div key={item.id} className="bg-slateCard p-4 rounded-xl border border-white/10">
            <h3 className="font-bold text-neonCyan">{item.role} @ {item.company_name}</h3>
            <p className="text-sm text-platinum">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

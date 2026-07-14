'use client'
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function EditProfile() {
  const [profile, setProfile] = useState({ full_name: '', skill: '', exp: '', bio: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (data) setProfile(data);
      }
    }
    getProfile();
  }, []);

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      await supabase.from('profiles').update(profile).eq('id', user.id);
      alert('Profile Updated!');
      router.push('/dashboard');
    }
    setLoading(false);
  }

  return (
    <div className="p-10 text-white max-w-md">
      <h1 className="text-2xl font-bold mb-6">Edit Your Profile</h1>
      <form onSubmit={updateProfile} className="flex flex-col gap-4">
        <input className="text-black p-2 rounded" placeholder="Full Name" value={profile.full_name} onChange={(e) => setProfile({...profile, full_name: e.target.value})} />
        <input className="text-black p-2 rounded" placeholder="Skill" value={profile.skill} onChange={(e) => setProfile({...profile, skill: e.target.value})} />
        <input className="text-black p-2 rounded" placeholder="Experience" value={profile.exp} onChange={(e) => setProfile({...profile, exp: e.target.value})} />
        <textarea className="text-black p-2 rounded" placeholder="Bio" value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} />
        <button type="submit" disabled={loading} className="bg-cyan-400 text-black p-2 font-bold rounded">
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}

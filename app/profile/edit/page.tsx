'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function EditProfile() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    skill: '',
    headline: '',
    bio: ''
  });

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (data) setProfile(data);
    }
    loadProfile();
  }, []);

  async function updateProfile() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from('profiles')
      .update(profile)
      .eq('id', user.id);
      
    setLoading(false);
    alert('Profile updated!');
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-slateCard border border-white/10 rounded-2xl mt-10">
      <h1 className="text-2xl font-bold text-white mb-6">Edit Profile</h1>
      
      <div className="space-y-4">
        <div>
          <label className="text-xs text-platinum/70">Full Name</label>
          <input 
            className="w-full bg-obsidian p-2 rounded border border-white/10 text-white"
            value={profile.full_name}
            onChange={(e) => setProfile({...profile, full_name: e.target.value})}
          />
        </div>
        
        <div>
          <label className="text-xs text-platinum/70">Professional Headline</label>
          <input 
            className="w-full bg-obsidian p-2 rounded border border-white/10 text-white"
            placeholder="e.g. Senior Software Engineer at Tech Corp"
            value={profile.headline || ''}
            onChange={(e) => setProfile({...profile, headline: e.target.value})}
          />
        </div>

        <div>
          <label className="text-xs text-platinum/70">Skill</label>
          <input 
            className="w-full bg-obsidian p-2 rounded border border-white/10 text-white"
            value={profile.skill || ''}
            onChange={(e) => setProfile({...profile, skill: e.target.value})}
          />
        </div>

        <div>
          <label className="text-xs text-platinum/70">About Me (Bio)</label>
          <textarea 
            className="w-full bg-obsidian p-2 rounded border border-white/10 text-white h-32"
            value={profile.bio || ''}
            onChange={(e) => setProfile({...profile, bio: e.target.value})}
          />
        </div>

        <button 
          onClick={updateProfile}
          disabled={loading}
          className="w-full bg-neonCyan text-obsidian font-bold py-2 rounded-lg"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}

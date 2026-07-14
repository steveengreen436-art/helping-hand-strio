'use client'
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function EditProfile() {
  const [profile, setProfile] = useState({ full_name: '', skill: '', exp: '', bio: '', phone_number: '', cv_url: '' });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function updateProfile(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    let cvUrl = profile.cv_url;

    // Handle File Upload
    if (file && user) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('cv-uploads').upload(fileName, file, { upsert: true });
      if (!uploadError) {
        const { data } = supabase.storage.from('cv-uploads').getPublicUrl(fileName);
        cvUrl = data.publicUrl;
      }
    }

    if (user) {
      await supabase.from('profiles').update({ ...profile, cv_url: cvUrl }).eq('id', user.id);
      alert('Profile & CV Updated!');
      router.push('/dashboard');
    }
    setLoading(false);
  }

  return (
    <form onSubmit={updateProfile} className="p-10 text-white flex flex-col gap-4 max-w-md">
      <h1 className="text-2xl font-bold">Edit Profile</h1>
      <input className="text-black p-2" placeholder="Full Name" value={profile.full_name} onChange={(e) => setProfile({...profile, full_name: e.target.value})} />
      <input className="text-black p-2" placeholder="Phone Number" value={profile.phone_number} onChange={(e) => setProfile({...profile, phone_number: e.target.value})} />
      <textarea className="text-black p-2" placeholder="Bio" value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} />
      
      <label className="text-sm">Upload CV (PDF):</label>
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      
      <button type="submit" disabled={loading} className="bg-neonCyan text-black p-2 font-bold">
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}

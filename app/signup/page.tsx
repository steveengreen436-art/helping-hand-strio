'use client'
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Sign up the user
    const { data, error } = await supabase.auth.signUp({ email, password });
    
    if (error) {
      setMessage('Error: ' + error.message);
      return;
    }

    if (data.user) {
      // 2. Try to get location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const loc = `${position.coords.latitude}, ${position.coords.longitude}`;
          
          const { error: profileError } = await supabase.from('profiles').insert([
            { id: data.user!.id, full_name: fullName, location: loc }
          ]);

          if (profileError) {
            setMessage('Account created, but failed to save profile: ' + profileError.message);
          } else {
            setMessage('Account created! Redirecting...');
            router.push('/feed');
          }
        }, (err) => {
          setMessage('Account created, but location access denied. Please update profile later.');
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Create Account</h1>
      <form onSubmit={handleSignup} className="flex flex-col gap-4 w-80">
        <input type="text" placeholder="Full Name" required className="p-3 bg-white text-black" onChange={(e) => setFullName(e.target.value)} />
        <input type="email" placeholder="Email" required className="p-3 bg-white text-black" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required className="p-3 bg-white text-black" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-neonCyan text-black p-3 font-bold">Sign Up</button>
      </form>
      <p className="mt-4 text-center px-4">{message}</p>
    </div>
  );
}

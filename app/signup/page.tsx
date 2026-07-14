'use client'
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // This sends the verification email automatically
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setMessage('Check your email for the verification link!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Create Account</h1>
      <form onSubmit={handleSignUp} className="flex flex-col gap-4 w-80">
        <input 
          type="email" placeholder="Email" required 
          className="p-2 bg-obsidian border border-neonCyan rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="Password" required 
          className="p-2 bg-obsidian border border-neonCyan rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-neonCyan text-obsidian p-2 font-bold rounded">
          Sign Up
        </button>
      </form>
      {message && <p className="mt-4 text-neonCyan">{message}</p>}
    </div>
  );
}

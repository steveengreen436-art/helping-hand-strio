'use client'
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false); // Toggle between Login/Signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Processing...');

    if (isLogin) {
      // Log In Logic
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage('Error: ' + error.message);
      else router.push('/dashboard');
    } else {
      // Sign Up Logic
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage('Error: ' + error.message);
      else setMessage('Account created! You can now log in.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">{isLogin ? 'Log In' : 'Create Account'}</h1>
      <form onSubmit={handleAuth} className="flex flex-col gap-4 w-80">
        <input type="email" placeholder="Email" required className="p-3 bg-white text-black" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required className="p-3 bg-white text-black" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-neonCyan text-black p-3 font-bold">{isLogin ? 'Log In' : 'Sign Up'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} className="mt-4 text-sm underline">
        {isLogin ? "Need an account? Sign Up" : "Already have an account? Log In"}
      </button>
      <p className="mt-4 text-neonCyan">{message}</p>
    </div>
  );
}

'use client'
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // Added
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage('Error: ' + error.message);
      else router.push('/dashboard');
    } else {
      // Sign Up Logic
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setMessage('Error: ' + error.message);
      } else if (data.user) {
        // Get Location
        navigator.geolocation.getCurrentPosition(async (position) => {
          const loc = `${position.coords.latitude}, ${position.coords.longitude}`;
          // Create profile record
          await supabase.from('profiles').insert([
            { id: data.user!.id, full_name: fullName, location: loc }
          ]);
          setMessage('Account created! Please log in.');
        }, (err) => {
          setMessage('Location required for signup. Please enable it.');
        });
      }
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setMessage('Please enter your email above to reset password.');
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    if (error) setMessage('Error: ' + error.message);
    else setMessage('Check your email for the password reset link!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">{isLogin ? 'Log In' : 'Create Account'}</h1>
      <form onSubmit={handleAuth} className="flex flex-col gap-4 w-80">
        {!isLogin && (
           <input type="text" placeholder="Full Name" required className="p-3 bg-white text-black" onChange={(e) => setFullName(e.target.value)} />
        )}
        <input type="email" placeholder="Email" required className="p-3 bg-white text-black" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required className="p-3 bg-white text-black" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-neonCyan text-black p-3 font-bold">{isLogin ? 'Log In' : 'Sign Up (Requires Location Access)'}</button>
      </form>
      
      <div className="mt-4 flex flex-col items-center gap-2">
        <button onClick={() => setIsLogin(!isLogin)} className="text-sm underline">
          {isLogin ? "Need an account? Sign Up" : "Already have an account? Log In"}
        </button>
        {isLogin && (
          <button onClick={handleResetPassword} className="text-xs text-neonCyan underline">
            Forgot Password?
          </button>
        )}
      </div>
      <p className="mt-4 text-center px-4">{message}</p>
    </div>
  );
}

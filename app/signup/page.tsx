'use client'
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    // This securely signs them up AND saves their name/phone to their profile
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
        },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setMessage('Success! Please check your email for the verification link.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
      <h1 className="text-3xl font-bold mb-6">Create Account</h1>
      
      <form onSubmit={handleSignUp} className="flex flex-col gap-4 w-80">
        <input 
          type="text" 
          placeholder="Full Name" 
          required 
          className="p-3 bg-white text-black border border-gray-300 focus:outline-none focus:border-neonCyan"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input 
          type="email" 
          placeholder="Email" 
          required 
          className="p-3 bg-white text-black border border-gray-300 focus:outline-none focus:border-neonCyan"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          required 
          className="p-3 bg-white text-black border border-gray-300 focus:outline-none focus:border-neonCyan"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input 
          type="tel" 
          placeholder="Phone Number" 
          required 
          className="p-3 bg-white text-black border border-gray-300 focus:outline-none focus:border-neonCyan"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        
        <button 
          type="submit" 
          disabled={loading}
          className="mt-2 bg-neonCyan text-black p-3 font-bold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Sign Up & Agree to Share Location'}
        </button>
      </form>
      
      {message && (
        <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-neonCyan'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

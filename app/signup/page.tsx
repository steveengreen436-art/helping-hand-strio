'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    // 1. Request Location Permission
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const locationString = `${position.coords.latitude},${position.coords.longitude}`

      // 2. Sign Up User via Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        alert("Error signing up: " + error.message)
        return
      }

      if (data.user) {
        // 3. Save extra info to your new user_profiles table
        const { error: profileError } = await supabase.from('user_profiles').insert([
          { 
            id: data.user.id, 
            full_name: name, 
            phone: phone, 
            location: locationString 
          }
        ])

        if (profileError) {
          alert("Error saving profile: " + profileError.message)
        } else {
          alert('Account created successfully! Please check your email to verify.')
        }
      }
    }, (err) => alert("Permission denied. We need your location to create an account."))
  }

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h1>Create Account</h1>
      <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <input type="tel" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} required />
        <button type="submit">Sign Up & Agree to Share Location</button>
      </form>
    </div>
  )
}

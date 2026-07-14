'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation' // Add this

export default function Dashboard() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true) // Add this
  const router = useRouter()

  useEffect(() => {
    async function checkAuthAndFetch() {
      // 1. Check if user is actually logged in
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/signup') // Kicks them out if not logged in
        return
      }

      // 2. If logged in, fetch the posts
      const { data } = await supabase.from('posts').select('*')
      if (data) setPosts(data)
      setLoading(false)
    }
    checkAuthAndFetch()
  }, [router])

  if (loading) return <div style={{ padding: "20px", color: "white" }}>Loading...</div>

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>Dashboard</h1>
      <button onClick={() => supabase.auth.signOut().then(() => router.push('/'))}>
        Log Out
      </button>
      <h2>Recent Posts</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ border: "1px solid #333", padding: "10px", margin: "10px 0" }}>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}

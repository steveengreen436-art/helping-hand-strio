'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [posts, setPosts] = useState<any[]>([])
  const [newPost, setNewPost] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/signup')
      return
    }
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    if (data) setPosts(data)
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    
    // Inserts the new post into your 'posts' table
    await supabase.from('posts').insert([{ content: newPost, user_id: user?.id }])
    setNewPost('')
    fetchPosts() // Refresh the list
  }

  if (loading) return <div style={{ color: "white" }}>Loading...</div>

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>Dashboard</h1>
      
      {/* --- New Post Form --- */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <textarea 
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
          style={{ width: "100%", color: "black", padding: "10px" }}
        />
        <button type="submit" style={{ background: "#66FCF1", color: "black", padding: "10px", marginTop: "10px" }}>
          Post
        </button>
      </form>

      <button onClick={() => supabase.auth.signOut().then(() => router.push('/'))}>Log Out</button>

      <h2>Recent Posts</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ border: "1px solid #333", padding: "10px", margin: "10px 0" }}>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}

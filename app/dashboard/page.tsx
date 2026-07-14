'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Dashboard() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase.from('posts').select('*')
      if (data) setPosts(data)
    }
    fetchPosts()
  }, [])

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>Dashboard</h1>
      <h2>Recent Posts</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ border: "1px solid #333", padding: "10px", margin: "10px 0" }}>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}

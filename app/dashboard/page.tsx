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

    // JOINED QUERY: This pulls the post AND the user's name
    const { data } = await supabase
      .from('posts')
      .select(`
        *,
        user_profiles (full_name)
      `)
      .order('created_at', { ascending: false })
      
    if (data) setPosts(data)
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('posts').insert([{ content: newPost, user_id: user?.id }])
    setNewPost('')
    fetchPosts()
  }

  if (loading) return <div className="text-white p-10">Loading...</div>

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Topic Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {['Business', 'Marketing', 'Design', 'Tech'].map((topic) => (
          <div key={topic} className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex flex-col items-center hover:border-neonCyan transition-all cursor-pointer">
            <span className="text-2xl">✨</span>
            <h4 className="font-bold mt-2">{topic}</h4>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Post Form */}
        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-2xl border border-gray-800 mb-8 shadow-xl">
          <textarea 
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full bg-black text-white p-4 rounded-xl border border-gray-700 focus:border-neonCyan outline-none"
          />
          <button type="submit" className="bg-[#66FCF1] text-black font-bold py-3 px-6 rounded-lg mt-4 hover:opacity-90">
            Post Update
          </button>
        </form>

        <button onClick={() => supabase.auth.signOut().then(() => router.push('/'))} className="text-gray-500 text-sm mb-6 underline">
          Log Out
        </button>

        {/* Recent Posts List */}
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg mb-4 hover:border-gray-600 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-neonCyan flex items-center justify-center text-black font-bold">
                {post.user_profiles?.full_name?.charAt(0) || 'U'}
              </div>
              <h3 className="font-bold">{post.user_profiles?.full_name || 'Anonymous'}</h3>
            </div>
            <p className="text-gray-200">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

'use client'
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function PortfolioPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [formData, setFormData] = useState({ company_name: '', role: '', description: '' });

  useEffect(() => { fetchHistory(); }, []);

  async function fetchHistory() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase.from('work_experience').select('*').eq('user_id', user.id);
    if (data) setHistory(data);
  }

  async function addExperience() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from('work_experience').insert({ ...formData, user_id: user.id });
    setFormData({ company_name: '', role: '', description: '' });
    fetchHistory();
  }

  return (
    <div className="max-w-xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Work Experience</h1>
      
      {/* Add New Entry */}
      <div className="bg-slateCard p-4 rounded-xl border border-white/10 space-y-3 mb-8">
        <input className="w-full bg-obsidian p-2 rounded" placeholder="Company" onChange={(e) => setFormData({...formData, company_name: e.target.value})} value={formData.company_name} />
        <input className="w-full bg-obsidian p-2 rounded" placeholder="Role" onChange={(e) => setFormData({...formData, role: e.target.value})} value={formData.role} />
        <textarea className="w-full bg-obsidian p-2 rounded" placeholder="Description" onChange={(e) => setFormData({...formData, description: e.target.value})} value={formData.description} />
        <button onClick={addExperience} className="w-full bg-neonCyan text-obsidian font-bold py-2 rounded">Add Experience</button>
      </div>

      {/* List Existing */}
      <div className="space-y-4">
        {history.map((item) => (
          <div key={item.id} className="border-b border-white/10 pb-4">
            <h3 className="font-bold text-neonCyan">{item.role} @ {item.company_name}</h3>
            <p className="text-sm text-platinum/70">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

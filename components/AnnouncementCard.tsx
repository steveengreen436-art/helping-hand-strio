'use client'

// We added 'location' and 'email' as props
export default function AnnouncementCard({ location, email }: { location: string, email: string }) {
  const categories = [
    { title: "Landscaping", icon: "🌱" },
    { title: "Furniture", icon: "🪑" },
    { title: "Interior", icon: "🛠️" },
    { title: "Misc", icon: "🧹" },
    { title: "Tech", icon: "💻" },
    { title: "Catering", icon: "👨‍🍳" },
  ];

  return (
    <div className="bg-[#112240] border border-cyan-500/50 rounded-3xl p-6 my-6 shadow-2xl">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-black text-cyan-400">JOIN THE {location.toUpperCase()} WORKFORCE!</h1>
        <p className="text-sm italic text-gray-400">Empowering {location} - Job Seekers Wanted</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {categories.map((cat) => (
          <div key={cat.title} className="bg-[#0a192f] p-3 rounded-xl flex items-center gap-2 border border-cyan-900/50 hover:border-cyan-400 transition-all">
            <span>{cat.icon}</span>
            <span className="text-sm font-semibold">{cat.title}</span>
          </div>
        ))}
      </div>

      <div className="bg-black/40 p-4 rounded-xl text-center border border-cyan-800">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Send CV to</p>
        <a href={`mailto:${email}`} className="text-cyan-400 font-bold block hover:underline">
          {email}
        </a>
      </div>
    </div>
  );
}

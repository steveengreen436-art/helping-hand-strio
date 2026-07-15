'use client'

export default function Dashboard() {
  const categories = [
    { title: "Landscaping", icon: "🌱" },
    { title: "Furniture Assembly", icon: "🪑" },
    { title: "Interior Work", icon: "🛠️" },
    { title: "Miscellaneous", icon: "🧹" },
    { title: "Tech & Electronics", icon: "💻" },
    { title: "Catering", icon: "👨‍🍳" },
  ];

  return (
    <div className="min-h-screen bg-[#0a192f] text-white p-6">
      {/* Header Section */}
      <div className="text-center mb-10 border-b border-cyan-900 pb-8">
        <h1 className="text-4xl font-extrabold text-cyan-400">JOIN THE ESWATINI WORKFORCE!</h1>
        <p className="mt-2 text-xl italic">Empowering Eswatini - Job Seekers Wanted</p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#112240] p-6 rounded-xl border border-cyan-900">
          <h3 className="font-bold text-cyan-400">JOB OPPORTUNITIES</h3>
        </div>
        <div className="bg-[#112240] p-6 rounded-xl border border-cyan-900">
          <h3 className="font-bold text-cyan-400">REQUIREMENTS: HOME OFFICE OF BIG BEND</h3>
        </div>
        <div className="bg-[#112240] p-6 rounded-xl border border-cyan-900">
          <h3 className="font-bold text-cyan-400">LOCATION: ESWATINI</h3>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        {categories.map((cat) => (
          <div key={cat.title} className="bg-[#112240] p-4 rounded-lg flex items-center gap-3 hover:border-cyan-400 border border-transparent transition-all">
            <span className="text-2xl">{cat.icon}</span>
            <span className="font-semibold">{cat.title}</span>
          </div>
        ))}
      </div>

      {/* Call to Action Footer */}
      <div className="bg-gradient-to-r from-cyan-900 to-black p-8 rounded-2xl text-center shadow-2xl">
        <h2 className="text-2xl font-bold mb-2">SEND YOUR CV & WORK EXPERIENCE TO:</h2>
        <a href="mailto:helpinghandstrio@gmail.com" className="text-3xl font-extrabold text-cyan-400 underline">
          helpinghandstrio@gmail.com
        </a>
        <p className="mt-4 text-sm text-gray-400">REQUIREMENTS: MUST HAVE SOME JOB EXPERIENCE | LOCATION: ESWATINI</p>
        <p className="mt-2 font-bold text-lg">Your New Career Awaits!</p>
      </div>
    </div>
  );
}

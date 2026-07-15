'use client'

export default function AnnouncementPost() {
  return (
    <div className="bg-[#0a192f] border-2 border-cyan-500 rounded-3xl p-6 shadow-2xl overflow-hidden my-6">
      {/* Title */}
      <h2 className="text-2xl font-black text-cyan-400 text-center mb-2">JOIN THE ESWATINI WORKFORCE!</h2>
      <p className="text-gray-400 text-center italic mb-6">Empowering Eswatini - Job Seekers Wanted</p>

      {/* Info Stats */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className="bg-[#112240] p-3 rounded-lg text-xs font-bold text-center">JOBS</div>
        <div className="bg-[#112240] p-3 rounded-lg text-xs font-bold text-center">BIG BEND</div>
        <div className="bg-[#112240] p-3 rounded-lg text-xs font-bold text-center">ESWATINI</div>
      </div>

      {/* Clickable Categories */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {['Landscaping', 'Furniture', 'Interior', 'Catering'].map((cat) => (
          <button key={cat} className="bg-[#112240] border border-cyan-900 p-3 rounded-xl hover:border-cyan-400 transition-all font-semibold">
            {cat}
          </button>
        ))}
      </div>

      {/* Clickable Email Action */}
      <div className="bg-black/40 p-4 rounded-2xl text-center border border-cyan-800">
        <p className="text-xs text-gray-400 mb-1">SEND CV TO:</p>
        <a href="mailto:helpinghandstrio@gmail.com" className="text-cyan-400 font-black text-lg underline">
          helpinghandstrio@gmail.com
        </a>
      </div>
    </div>
  );
}

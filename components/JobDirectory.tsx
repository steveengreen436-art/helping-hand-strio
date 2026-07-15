import Link from 'next/link';

const jobData = [
  { title: "Healthcare", subs: ["Physicians", "Nursing", "Therapy-Rehab", "Pharmacy-Labs", "Emergency-Services", "Dental-Care"] },
  { title: "Technology", subs: ["Development", "Data-AI", "Infrastructure", "Cybersecurity", "Support", "Design"] },
  // Add all other categories here following this pattern
];

export default function JobDirectory() {
  return (
    <div className="p-6">
      {jobData.map((cat) => (
        <div key={cat.title} className="mb-8">
          <h2 className="text-xl font-bold text-cyan-400 mb-3">{cat.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {cat.subs.map((job) => (
              <Link 
                key={job} 
                href={`/post/${cat.title.toLowerCase()}/${job.toLowerCase()}`}
                className="bg-gray-900 hover:bg-cyan-900 p-3 rounded text-sm transition-all border border-gray-800"
              >
                {job.replace(/-/g, ' ')}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

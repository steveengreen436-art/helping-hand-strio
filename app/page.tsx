import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-12">
      <div className="mb-6 hover:scale-105 transition duration-300 rounded-full overflow-hidden border-2 border-neonCyan shadow-[0_0_30px_rgba(102,252,241,0.2)] w-[180px] h-[180px] flex items-center justify-center bg-obsidian">
        <Image
  src="/logo.png"
  alt="Helping Hand Strio Zulu Logo"
          width={180}
          height={180}
          className="rounded-full object-cover w-full h-full"
          priority
        />
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold text-platinum mb-4">
        Connecting Talent with Opportunity <br />
        <span className="text-neonCyan">Safely & Directly</span>
      </h1>
      <p className="max-w-2xl text-base md:text-lg text-platinum/80 mb-8">
        Post your skills, view public CVs, and find employment locally. All user contact details are kept strictly private and vetted personally by administrators for maximum safety.
      </p>
      <div className="flex gap-4">
        <Link href="/signup" className="px-8 py-4 bg-neonCyan text-obsidian font-bold text-lg rounded-xl hover:opacity-90 transition">
          Create Account
        </Link>
        <Link href="/explore" className="px-8 py-4 bg-slateCard border border-neonCyan/40 text-platinum font-bold text-lg rounded-xl hover:border-neonCyan transition">
          Browse Directory
        </Link>
      </div>
    </div>
  );
}

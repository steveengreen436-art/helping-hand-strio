import Image from "next/image";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dimensions = size === "sm" ? 40 : size === "lg" ? 96 : 56;

  return (
    <div className="flex items-center gap-3">
      {/* Renders your logo file named logo.png */}
      <div className="relative overflow-hidden rounded-full border border-neonCyan/30 shadow-lg hover:scale-105 transition">
        <Image
          src="/logo.png"
          alt="Helping Hand Strio Logo"
          width={dimensions}
          height={dimensions}
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-col">
        <span className="text-xl font-extrabold tracking-wider text-neonCyan font-sans">
          HELPING HAND STRIO
        </span>
        <span className="text-[10px] uppercase tracking-widest text-platinum/70 italic font-medium">
          Ubuntu • Umuntu Ngumuntu Ngabantu
        </span>
      </div>
    </div>
  );
}

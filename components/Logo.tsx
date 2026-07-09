import Image from "next/image";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dimensions = {
    sm: 32,
    md: 48,
    lg: 64,
  };

  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="Helping Hand Strio Logo"
        width={dimensions[size]}
        height={dimensions[size]}
        className="rounded-full border border-neonCyan"
      />
      <span className="font-bold text-platinum text-lg tracking-wide">
        Helping Hand <span className="text-neonCyan">Strio</span>
      </span>
    </div>
  );
}

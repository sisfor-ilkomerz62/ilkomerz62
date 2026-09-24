import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex h-screen h-dvh w-full flex-col items-center justify-center overflow-hidden bg-black text-white px-4 select-none">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[350px] w-[350px] sm:h-[500px] sm:w-[500px] rounded-full bg-gradient-to-tr from-purple-700/25 via-rose-600/20 to-amber-500/20 blur-[100px] sm:blur-[140px]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center gap-6 sm:gap-8 max-w-5xl mx-auto text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
          <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
            Coming
          </span>
          <div className="relative group shrink-0">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-500 opacity-75 blur-md sm:blur-lg animate-pulse transition duration-500 group-hover:opacity-100" />
            <div className="relative h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-48 lg:w-48 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl ring-2 ring-white/10 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/gheren.jpeg"
                alt="Gheren"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 176px, 192px"
              />
            </div>
          </div>

          <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
            Soon...
          </span>
        </div>
      </div>
    </main>
  );
}

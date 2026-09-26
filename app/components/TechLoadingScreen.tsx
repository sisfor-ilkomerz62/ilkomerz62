"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

interface LogMessage {
  time: string;
  tag: string;
  tagColor: string;
  text: string;
  threshold: number; 
}

const BOOT_LOGS: LogMessage[] = [
  {
    time: "0.001s",
    tag: "BIOS",
    tagColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    text: "POST verified. Initializing Ilkomerz62 Mainframe...",
    threshold: 5,
  },
  {
    time: "0.042s",
    tag: "CPU",
    tagColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    text: "Architecture: 64-bit CS-Kernel • 16 Cores Online",
    threshold: 18,
  },
  {
    time: "0.115s",
    tag: "MEM",
    tagColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    text: "Allocating 0x7FFF82A49B00 - Memory heap clean [OK]",
    threshold: 32,
  },
  {
    time: "0.280s",
    tag: "ALGO",
    tagColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    text: "Loading Graph Theory, Compilers & Discrete Math modules...",
    threshold: 50,
  },
  {
    time: "0.495s",
    tag: "NET",
    tagColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    text: "Handshake verified -> batch62.cs.ipb.ac.id [SYNCED]",
    threshold: 68,
  },
  {
    time: "0.720s",
    tag: "CRYPTO",
    tagColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    text: "Decrypting Batch 62 Vault & Digital Identity... [OK]",
    threshold: 84,
  },
  {
    time: "0.985s",
    tag: "ROOT",
    tagColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    text: "Access Granted: Level ROOT. Welcome, Ilkomers!",
    threshold: 96,
  },
];

export default function TechLoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [activeLogs, setActiveLogs] = useState<LogMessage[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const completedRef = useRef(false);
  const shownLogCountRef = useRef(0);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const finishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    setIsExiting(true);
    finishTimerRef.current = setTimeout(() => {
      setIsFinished(true);
    }, 750);
  }, []);

  const handleSkip = useCallback(() => {
    if (completedRef.current) return;
    setProgress(100);
    setActiveLogs(BOOT_LOGS);
    handleComplete();
  }, [handleComplete]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " " || event.key === "Escape" || event.key === "Enter") {
        event.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSkip]);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 4400;
    progressTimerRef.current = setInterval(() => {
      if (completedRef.current) return;
      const currentPct = Math.min(100, Math.floor(((performance.now() - startTime) / duration) * 100));
      setProgress(currentPct);

      const eligibleLogs = BOOT_LOGS.filter((log) => log.threshold <= currentPct);
      if (eligibleLogs.length !== shownLogCountRef.current) {
        shownLogCountRef.current = eligibleLogs.length;
        setActiveLogs(eligibleLogs);
      }

      if (currentPct >= 100) {
        if (progressTimerRef.current) clearInterval(progressTimerRef.current);
        completionTimerRef.current = setTimeout(handleComplete, 300);
      }
    }, 28);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (completionTimerRef.current) clearTimeout(completionTimerRef.current);
    };
  }, [handleComplete]);

  useEffect(() => {
    return () => {
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const chars = "01010101ABCDEF{}[]()<>=/*+#$%&;!λπ0101";
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));

    const draw = () => {
      ctx.fillStyle = "rgba(4, 7, 13, 0.22)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (Math.random() > 0.85) {
          ctx.fillStyle = "#38bdf8";
        } else if (Math.random() > 0.4) {
          ctx.fillStyle = "#10b981";
        } else {
          ctx.fillStyle = "#065f46";
        }

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isFinished) return null;

  return (
    <div
      aria-label="Loading Website Ilkomerz 62"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] font-mono text-zinc-100 select-none overflow-hidden transition-all duration-700 ease-out ${
        isExiting
          ? "opacity-0 scale-105 pointer-events-none filter blur-sm"
          : "opacity-100 scale-100"
      }`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
      />

      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.12)_0%,rgba(6,182,212,0.06)_40%,transparent_75%)]" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage:
            "linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      <div className="relative z-20 w-full max-w-2xl px-4 sm:px-0">
        <div className="rounded-xl border border-emerald-500/30 bg-zinc-950/85 backdrop-blur-xl shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden">
          
          <div className="flex items-center justify-start border-b border-zinc-800/80 bg-zinc-900/90 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/90 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
              <span className="h-3 w-3 rounded-full bg-amber-500/90 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/90 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span className="ml-2 text-xs font-semibold text-zinc-400 hidden sm:inline-block">
                root@ilkomerz62: ~# boot.sh
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            
            <div className="flex flex-col items-center justify-center text-center pt-1 pb-2">
              <pre className="text-[10px] sm:text-xs leading-none font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)] select-none">
{` ____ _____  _    ______     _____ _____ ____  
/ ___|_   _|/ \\  |  _ \\ \\   / /_ _| ____/ ___| 
\\___ \\ | | / _ \\ | |_) \\ \\ / / | ||  _| \\___ \\ 
 ___) || |/ ___ \\|  _ < \\ V /  | || |___ ___) |
|____/ |_/_/   \\_\\_| \\_\\ \\_/  |___|_____|____/`}
              </pre>
              <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wide">
                <span className="text-emerald-400">ILMU KOMPUTER</span>
                <span className="text-zinc-600">•</span>
                <span className="text-cyan-400">ANGKATAN 62</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">INITIALIZING</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] sm:text-[11px] text-zinc-400">
              <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-zinc-500 block">MEMBERS</span>
                <span className="text-emerald-400 font-bold">163</span>
              </div>
              <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-zinc-500 block">KETANG</span>
                <span className="text-cyan-400 font-bold">AZIZ</span>
              </div>
              <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-zinc-500 block">KOMTI</span>
                <span className="text-purple-400 font-bold">GHEREN</span>
              </div>
              <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-zinc-500 block">SIAP SEMANGAT</span>
                <span className="text-rose-400 font-bold">DAHSYAT</span>
              </div>
            </div>

            <div className="h-32 sm:h-36 overflow-hidden rounded-lg bg-black/60 border border-zinc-800/60 p-3 font-mono text-[11px] sm:text-xs space-y-1.5 flex flex-col justify-end">
              {activeLogs.slice(-4).map((log, idx) => (
                <div key={idx} className="flex items-start gap-2 leading-relaxed animate-fadeIn">
                  <span className="text-zinc-500 shrink-0">[{log.time}]</span>
                  <span
                    className={`px-1 rounded border text-[9px] uppercase font-bold tracking-wider shrink-0 ${log.tagColor}`}
                  >
                    {log.tag}
                  </span>
                  <span className="text-zinc-300 truncate">{log.text}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 text-emerald-400 pt-0.5">
                <span className="text-zinc-500">[LIVE]</span>
                <span className="text-zinc-400">$</span>
                <span className="text-zinc-200">
                  {progress < 100
                    ? `executing bootstrap sequence... (${progress}%)`
                    : "ready. initializing graphical shell..."}
                </span>
                <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse ml-0.5" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">BOOT PROGRESS:</span>
                  <span className="text-emerald-400 font-bold">
                    {progress < 100 ? "COMPILING" : "COMPLETE"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-bold">
                  <span className="text-cyan-400">{progress}%</span>
                </div>
              </div>

              <div className="relative h-3 w-full rounded-full bg-zinc-900 border border-zinc-800 p-0.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-indigo-500 transition-all duration-100 ease-out shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

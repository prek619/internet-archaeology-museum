import Link from "next/link";
import { db } from "@/lib/db";
import VisitorCounter from "@/components/VisitorCounter";
import { ArrowRight, Star } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let visitorCount = 47291;
  try {
    const record = await db.visitorCount.findFirst();
    if (record) visitorCount = record.count;
  } catch {}

  const artifactCount = await db.artifact.count();

  return (
    <div className="min-h-screen bg-neo-bg paper-texture">
      {/* Marquee banner */}
      <div className="border-b-4 border-black bg-black text-white overflow-hidden py-2">
        <div className="animate-marquee whitespace-nowrap inline-block">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-6 mr-12">
              <Star className="h-3 w-3 fill-neo-secondary text-neo-secondary inline" />
              <span className="font-black text-xs uppercase tracking-widest">
                Internet Archaeology Museum
              </span>
              <Star className="h-3 w-3 fill-neo-secondary text-neo-secondary inline" />
              <span className="font-black text-xs uppercase tracking-widest">
                Est. 2024
              </span>
            </span>
          ))}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
          {/* Left — hero text */}
          <div>
            {/* Institution label */}
            <div className="animate-fade-up inline-block border-4 border-black bg-neo-accent px-4 py-2 mb-8 -rotate-1 shadow-neo-sm">
              <span className="font-black text-xs uppercase tracking-widest">
                A Digital Institution
              </span>
            </div>

            {/* Main title — three lines, each drops in sequence */}
            <h1 className="font-black leading-none tracking-tighter uppercase mb-6">
              <span className="block text-5xl sm:text-7xl lg:text-8xl animate-title-drop">
                The Internet
              </span>
              <span className="block text-5xl sm:text-7xl lg:text-8xl animate-title-drop-delay-1 relative">
                <span className="text-stroke">Archaeology</span>
              </span>
              <span className="block text-5xl sm:text-7xl lg:text-8xl animate-title-drop-delay-2">
                <span className="bg-neo-accent px-2">Museum</span>
              </span>
            </h1>

            <p className="animate-fade-up font-bold text-lg sm:text-xl leading-relaxed max-w-2xl mb-10 text-black/80">
              Preserving the technologies history forgot. And probably should
              have. Our collection documents{" "}
              <strong>{artifactCount} artifact{artifactCount !== 1 ? "s" : ""}</strong>{" "}
              from the frontier of human ambition, failure, and mild confusion.
            </p>

            <div className="animate-fade-up flex flex-wrap gap-4">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-3 h-14 px-8 bg-black text-white border-4 border-black font-black text-sm uppercase tracking-widest shadow-neo-md hover:shadow-neo-xl hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100"
              >
                Enter the Collection
                <ArrowRight className="h-5 w-5 stroke-[3px]" />
              </Link>
              <Link
                href="/suggest"
                className="inline-flex items-center gap-3 h-14 px-8 bg-neo-secondary text-black border-4 border-black font-black text-sm uppercase tracking-widest shadow-neo-md hover:shadow-neo-xl hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100"
              >
                Suggest an Artifact
              </Link>
            </div>
          </div>

          {/* Right — stats block */}
          <div className="lg:sticky lg:top-8 space-y-4 animate-fade-up">
            {/* Collection size card */}
            <div className="border-4 border-black bg-white shadow-neo-md p-6 relative overflow-hidden">
              {/* Background halftone texture */}
              <div className="absolute inset-0 opacity-[0.03] halftone-sm pointer-events-none" />
              <div className="relative z-10">
                <div className="font-black text-xs uppercase tracking-widest text-black/50 mb-1">
                  Collection Size
                </div>
                <div className="font-black text-5xl tracking-tighter">
                  {String(artifactCount).padStart(4, "0")}
                </div>
                <div className="font-bold text-xs text-black/50 mt-1 uppercase tracking-wider">
                  Artifact{artifactCount !== 1 ? "s" : ""} On Record
                </div>
              </div>
            </div>

            <VisitorCounter initialCount={visitorCount} />

            {/* Museum stamp */}
            <div className="border-4 border-black bg-neo-bg p-4 flex items-center justify-center rotate-1 shadow-neo-sm">
              <div className="text-center border-2 border-black/30 px-4 py-3 w-full">
                <div className="font-black text-[10px] uppercase tracking-[0.2em] text-black/40">
                  Certified
                </div>
                <div className="font-black text-sm uppercase tracking-widest text-black my-1">
                  Permanently Lost
                </div>
                <div className="font-black text-[10px] uppercase tracking-[0.2em] text-black/40">
                  to History
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Halftone section divider */}
        <div className="mt-20 mb-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-black" />
          <div className="flex gap-1.5">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 border-2 border-black bg-neo-bg"
                style={{ transform: i % 2 === 0 ? "rotate(45deg)" : "none" }}
              />
            ))}
          </div>
          <div className="flex-1 h-px bg-black" />
        </div>

        {/* Institution statement — dark panel with grid texture */}
        <div className="border-4 border-black bg-black text-white p-8 sm:p-12 relative overflow-hidden">
          {/* Grid overlay */}
          <div className="absolute inset-0 grid-pattern opacity-100 pointer-events-none" />
          {/* Halftone overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="relative z-10 max-w-3xl">
            <p className="font-black text-xs uppercase tracking-widest text-white/40 mb-4">
              Museum Statement
            </p>
            <p className="font-bold text-lg sm:text-xl leading-relaxed">
              The Internet Archaeology Museum is dedicated to the rigorous
              documentation of technologies, products, and digital ventures that
              were conceived, attempted, and in most cases quietly abandoned.
              Each artifact is presented with the institutional seriousness it
              deserves.
            </p>
            <p className="font-bold text-sm leading-relaxed text-white/60 mt-4">
              The museum makes no editorial comment on the nature of these
              inventions. The artifacts speak for themselves. In several cases,
              this has been considered the problem.
            </p>

            {/* Bottom stat row */}
            <div className="mt-8 pt-6 border-t-2 border-white/20 grid grid-cols-3 gap-6">
              {[
                { label: "Artifacts Documented", value: artifactCount },
                { label: "Inventors Contacted", value: "Several" },
                { label: "Responses Received", value: "Few" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="font-black text-xl sm:text-2xl tracking-tighter text-white">
                    {value}
                  </div>
                  <div className="font-bold text-[10px] uppercase tracking-widest text-white/40 mt-0.5">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-8 flex justify-between items-center border-t-4 border-black pt-6">
          <p className="font-black text-xs uppercase tracking-widest text-black/40">
            © The Internet Archaeology Museum
          </p>
          <Link
            href="/suggest"
            className="font-black text-xs uppercase tracking-widest text-black hover:underline"
          >
            Submit an Artifact →
          </Link>
        </div>
      </main>
    </div>
  );
}

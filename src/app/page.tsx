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
    <div className="min-h-screen bg-neo-bg">
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

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start">
          <div>
            {/* Institution label */}
            <div className="inline-block border-4 border-black bg-neo-muted px-4 py-2 mb-8 -rotate-1 shadow-neo-sm">
              <span className="font-black text-xs uppercase tracking-widest">
                A Digital Institution
              </span>
            </div>

            <h1 className="font-black text-5xl sm:text-7xl lg:text-8xl leading-none tracking-tighter uppercase mb-6">
              The Internet{" "}
              <span className="relative inline-block">
                <span className="text-stroke relative z-10">Archaeology</span>
              </span>
              <br />
              <span className="bg-neo-accent px-2">Museum</span>
            </h1>

            <p className="font-bold text-lg sm:text-xl leading-relaxed max-w-2xl mb-10 text-black/80">
              Preserving the technologies history forgot. And probably should
              have. Our collection documents{" "}
              <strong>{artifactCount} artifacts</strong> from the frontier of
              human ambition, failure, and mild confusion.
            </p>

            <div className="flex flex-wrap gap-4">
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

          {/* Stats block */}
          <div className="lg:sticky lg:top-8 space-y-4">
            <div className="border-4 border-black bg-white shadow-neo-md p-6">
              <div className="font-black text-xs uppercase tracking-widest text-black/50 mb-1">
                Collection Size
              </div>
              <div className="font-black text-5xl tracking-tighter">
                {String(artifactCount).padStart(4, "0")}
              </div>
              <div className="font-bold text-xs text-black/50 mt-1 uppercase tracking-wider">
                Artifacts On Record
              </div>
            </div>

            <VisitorCounter initialCount={visitorCount} />
          </div>
        </div>

        {/* Institution statement */}
        <div className="mt-24 border-4 border-black bg-black text-white p-8 sm:p-12 grid-pattern relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <p className="font-black text-xs uppercase tracking-widest text-white/50 mb-4">
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

import Link from "next/link";
import { db } from "@/lib/db";
import ArtifactCard from "@/components/ArtifactCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "The Collection — Internet Archaeology Museum",
};

export default async function GalleryPage() {
  const artifacts = await db.artifact.findMany({
    orderBy: { exhibitSequence: "asc" },
    select: {
      id: true,
      exhibitNumber: true,
      name: true,
      releaseYear: true,
      inventor: true,
      purpose: true,
      failureReason: true,
      historicalImpact: true,
      curatorNote: true,
      imageUrl: true,
      imageNote: true,
      status: true,
    },
  });

  const artifactCount = artifacts.length;

  return (
    <div className="min-h-screen bg-neo-bg">
      {/* Sticky header — yellow so the gallery entrance has presence */}
      <header className="border-b-4 border-black bg-neo-secondary sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-black text-sm uppercase tracking-widest hover:underline transition-colors duration-100"
          >
            ← Museum
          </Link>
          <div className="bg-black px-3 py-1.5">
            <span className="font-black text-white text-xs uppercase tracking-widest">
              The Collection
            </span>
          </div>
          <Link
            href="/suggest"
            className="font-black text-xs uppercase tracking-widest border-4 border-black bg-neo-bg px-3 py-2 hover:bg-neo-accent hover:text-black transition-colors duration-100 shadow-neo-sm"
          >
            Suggest →
          </Link>
        </div>
      </header>

      {/* Red accent section-label bar */}
      <div className="border-b-4 border-black bg-neo-accent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
          <span className="font-black text-xs uppercase tracking-[0.2em] text-black">
            Permanent Collection
          </span>
          <span className="font-black text-xs uppercase tracking-widest text-black/60">
            {artifactCount} Exhibit{artifactCount !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Gallery heading */}
        <div className="mb-8 border-l-8 border-black pl-5">
          <h1 className="font-black text-4xl sm:text-6xl uppercase tracking-tighter leading-none mb-2">
            The Collection
          </h1>
          <p className="font-bold text-base text-black/60">
            {artifactCount === 0
              ? "The museum is preparing its inaugural exhibition."
              : `${artifactCount} artifact${artifactCount !== 1 ? "s" : ""} on permanent display. Click any exhibit to view the full record.`}
          </p>
        </div>

        {/* Section divider — halftone strip between heading and grid */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 border-t-4 border-black" />
          <div
            className="w-20 h-3"
            style={{
              backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)",
              backgroundSize: "8px 8px",
              opacity: 0.25,
            }}
          />
          <div className="border-4 border-black bg-neo-bg px-3 py-1 -rotate-1 shadow-neo-sm">
            <span className="font-black text-[9px] uppercase tracking-widest">
              Floor 1
            </span>
          </div>
          <div
            className="w-20 h-3"
            style={{
              backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)",
              backgroundSize: "8px 8px",
              opacity: 0.25,
            }}
          />
          <div className="flex-1 border-t-4 border-black" />
        </div>

        {artifacts.length === 0 ? (
          <div className="border-4 border-black bg-white p-16 text-center shadow-neo-md">
            <p className="font-black text-2xl uppercase tracking-tight text-black/30">
              No Exhibits On Display
            </p>
            <p className="font-bold text-sm text-black/40 mt-3">
              The museum is currently in preparation. Please return shortly.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {artifacts.map((artifact) => (
                <ArtifactCard key={artifact.id} artifact={artifact} />
              ))}
            </div>

            {/* Legend panel — yellow background, bold status key */}
            <div className="mt-12 border-4 border-black bg-neo-secondary shadow-neo-md p-5">
              <p className="font-black text-xs uppercase tracking-[0.2em] text-black mb-4">
                Status Key
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { label: "Active",        bg: "bg-neo-secondary border-neo-secondary", accent: "border-l-[6px] border-l-neo-secondary" },
                  { label: "Discontinued",  bg: "bg-neo-bg",                            accent: "border-l-[6px] border-l-black" },
                  { label: "Destroyed",     bg: "bg-neo-accent",                        accent: "border-l-[6px] border-l-neo-accent" },
                  { label: "On Loan",       bg: "bg-neo-muted",                         accent: "border-l-[6px] border-l-neo-muted" },
                ].map(({ label, bg, accent }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className={`w-4 h-4 border-4 border-black ${bg}`} />
                    <span className="font-black text-xs uppercase tracking-widest">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-8 border-t-4 border-black pt-6 flex justify-between items-center">
          <p className="font-black text-xs uppercase tracking-widest text-black/40">
            End of Collection
          </p>
          <Link
            href="/"
            className="font-black text-xs uppercase tracking-widest text-black hover:underline"
          >
            ← Return to Entrance
          </Link>
        </div>
      </main>
    </div>
  );
}

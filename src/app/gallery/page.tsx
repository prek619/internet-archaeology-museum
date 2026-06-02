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
      status: true,
    },
  });

  return (
    <div className="min-h-screen bg-neo-bg">
      {/* Header */}
      <header className="border-b-4 border-black bg-neo-bg sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-black text-sm uppercase tracking-widest hover:text-neo-accent transition-colors duration-100"
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
            className="font-black text-xs uppercase tracking-widest border-4 border-black px-3 py-2 hover:bg-neo-secondary transition-colors duration-100"
          >
            Suggest →
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Gallery header */}
        <div className="mb-10">
          <h1 className="font-black text-4xl sm:text-6xl uppercase tracking-tighter leading-none mb-3">
            The Collection
          </h1>
          <p className="font-bold text-base text-black/60">
            {artifacts.length} artifact{artifacts.length !== 1 ? "s" : ""} on
            permanent display.{" "}
            {artifacts.length === 0
              ? "The museum is preparing its inaugural exhibition."
              : "Click any exhibit to view the full record."}
          </p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artifacts.map((artifact) => (
              <ArtifactCard key={artifact.id} artifact={artifact} />
            ))}
          </div>
        )}

        <div className="mt-16 border-t-4 border-black pt-6 flex justify-between items-center">
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

import Link from "next/link";
import { db } from "@/lib/db";
import ArtifactTable from "@/components/admin/ArtifactTable";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminArtifactsPage() {
  const artifacts = await db.artifact.findMany({
    orderBy: { exhibitSequence: "asc" },
    select: {
      id: true,
      exhibitNumber: true,
      name: true,
      releaseYear: true,
      status: true,
      createdAt: true,
    },
  });

  const serialized = artifacts.map((a) => ({
    ...a,
    createdAt: a.createdAt.toISOString(),
  }));

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-black text-3xl uppercase tracking-tight">
            Artifacts
          </h1>
          <p className="font-bold text-sm text-black/50 mt-1">
            {artifacts.length} exhibit{artifacts.length !== 1 ? "s" : ""} in
            the collection
          </p>
        </div>
        <Link href="/admin/artifacts/new">
          <Button variant="primary" size="md">
            <Plus className="h-4 w-4 stroke-[3px] mr-2" />
            New Artifact
          </Button>
        </Link>
      </div>

      <ArtifactTable artifacts={serialized} />
    </div>
  );
}

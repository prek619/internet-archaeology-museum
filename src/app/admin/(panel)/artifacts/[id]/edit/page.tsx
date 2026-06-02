import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import ArtifactForm from "@/components/admin/ArtifactForm";

export const dynamic = "force-dynamic";

export default async function EditArtifactPage({
  params,
}: {
  params: { id: string };
}) {
  const artifact = await db.artifact.findUnique({
    where: { id: params.id },
  });

  if (!artifact) notFound();

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <p className="font-black text-xs uppercase tracking-widest text-black/40 mb-1">
          Editing
        </p>
        <h1 className="font-black text-3xl uppercase tracking-tight">
          {artifact.name}
        </h1>
        <p className="font-bold text-sm text-black/50 mt-1">
          {artifact.exhibitNumber}
        </p>
      </div>

      <ArtifactForm
        artifactId={artifact.id}
        exhibitNumber={artifact.exhibitNumber}
        defaultValues={{
          name: artifact.name,
          releaseYear: artifact.releaseYear ?? undefined,
          inventor: artifact.inventor ?? undefined,
          purpose: artifact.purpose,
          failureReason: artifact.failureReason,
          historicalImpact: artifact.historicalImpact ?? undefined,
          curatorNote: artifact.curatorNote ?? undefined,
          imageUrl: artifact.imageUrl ?? undefined,
          imageNote: artifact.imageNote ?? undefined,
          status: artifact.status,
        }}
      />
    </div>
  );
}

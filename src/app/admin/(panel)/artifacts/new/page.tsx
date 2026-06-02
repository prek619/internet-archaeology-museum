import { formatExhibitNumber, getNextExhibitSequence } from "@/lib/exhibit-number";
import ArtifactForm from "@/components/admin/ArtifactForm";

export const dynamic = "force-dynamic";

export default async function NewArtifactPage({
  searchParams,
}: {
  searchParams: {
    fromSuggestion?: string;
    name?: string;
    purpose?: string;
    failureReason?: string;
    releaseYear?: string;
  };
}) {
  const sequence = await getNextExhibitSequence();
  const exhibitNumber = formatExhibitNumber(sequence);

  const defaultValues = searchParams.name
    ? {
        name: searchParams.name,
        purpose: searchParams.purpose ?? "",
        failureReason: searchParams.failureReason ?? "",
        releaseYear: searchParams.releaseYear
          ? parseInt(searchParams.releaseYear)
          : undefined,
      }
    : undefined;

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="font-black text-3xl uppercase tracking-tight mb-1">
          New Artifact
        </h1>
        {searchParams.fromSuggestion && (
          <div className="inline-block border-4 border-black bg-neo-muted px-3 py-1.5 mt-3">
            <p className="font-black text-xs uppercase tracking-widest">
              Pre-filled from Suggestion
            </p>
          </div>
        )}
      </div>

      <ArtifactForm
        exhibitNumber={exhibitNumber}
        defaultValues={defaultValues}
        suggestionId={searchParams.fromSuggestion}
      />
    </div>
  );
}

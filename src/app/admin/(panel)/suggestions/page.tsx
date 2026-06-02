import { db } from "@/lib/db";
import SuggestionCard from "@/components/admin/SuggestionCard";

export const dynamic = "force-dynamic";

export default async function AdminSuggestionsPage() {
  const suggestions = await db.suggestion.findMany({
    orderBy: { createdAt: "desc" },
  });

  const pending = suggestions.filter((s) => s.status === "PENDING");
  const resolved = suggestions.filter((s) => s.status !== "PENDING");

  const serialized = suggestions.map((s) => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
  }));

  const pendingSerialized = serialized.filter((s) => s.status === "PENDING");
  const resolvedSerialized = serialized.filter((s) => s.status !== "PENDING");

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="font-black text-3xl uppercase tracking-tight">
          Suggestions
        </h1>
        <p className="font-bold text-sm text-black/50 mt-1">
          {pending.length} pending · {resolved.length} resolved
        </p>
      </div>

      {/* Pending */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="font-black text-xl uppercase tracking-tight">
            Pending Review
          </h2>
          {pending.length > 0 && (
            <span className="bg-neo-accent border-4 border-black font-black text-xs px-3 py-1">
              {pending.length}
            </span>
          )}
        </div>

        {pendingSerialized.length === 0 ? (
          <div className="border-4 border-black bg-white p-8 text-center">
            <p className="font-black text-sm uppercase tracking-widest text-black/40">
              No pending submissions.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingSerialized.map((s) => (
              <SuggestionCard key={s.id} suggestion={s} />
            ))}
          </div>
        )}
      </section>

      {/* Resolved */}
      {resolvedSerialized.length > 0 && (
        <section>
          <h2 className="font-black text-xl uppercase tracking-tight mb-5">
            Previously Reviewed
          </h2>
          <div className="space-y-4">
            {resolvedSerialized.map((s) => (
              <SuggestionCard key={s.id} suggestion={s} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

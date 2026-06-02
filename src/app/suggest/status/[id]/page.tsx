import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function SuggestionStatusPage({
  params,
}: {
  params: { id: string };
}) {
  const suggestion = await db.suggestion.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      name: true,
      releaseYear: true,
      purpose: true,
      failureReason: true,
      submitterName: true,
      status: true,
      rejectionReason: true,
      createdAt: true,
    },
  });

  if (!suggestion) notFound();

  const statusConfig = {
    PENDING: {
      label: "Under Review",
      classes: "bg-neo-secondary border-black",
      message:
        "This submission is currently under review by museum staff. No further action is required.",
    },
    APPROVED: {
      label: "Accepted into Collection",
      classes: "bg-neo-muted border-black",
      message:
        "This submission has been accepted and added to the permanent collection.",
    },
    REJECTED: {
      label: "Not Accepted",
      classes: "bg-neo-accent border-black",
      message: null,
    },
  };

  const config = statusConfig[suggestion.status];

  return (
    <div className="min-h-screen bg-neo-bg">
      <header className="border-b-4 border-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-black text-sm uppercase tracking-widest hover:text-neo-accent transition-colors duration-100"
          >
            ← Museum
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <p className="font-black text-xs uppercase tracking-widest text-black/40 mb-2">
            Submission Reference
          </p>
          <p className="font-black text-sm font-mono bg-black text-white inline-block px-3 py-1">
            {suggestion.id}
          </p>
        </div>

        {/* Status */}
        <div
          className={[
            "border-4 px-5 py-4 mb-6 flex items-center justify-between",
            config.classes,
          ].join(" ")}
        >
          <span className="font-black text-sm uppercase tracking-widest">
            Status
          </span>
          <span className="font-black text-sm uppercase tracking-widest">
            {config.label}
          </span>
        </div>

        {/* Submission detail */}
        <div className="border-4 border-black bg-white shadow-neo-md p-6 space-y-5 mb-6">
          <div>
            <p className="font-black text-xs uppercase tracking-widest text-black/50 mb-1">
              Artifact Name
            </p>
            <p className="font-black text-2xl uppercase tracking-tight">
              {suggestion.name}
            </p>
          </div>

          {suggestion.releaseYear && (
            <div>
              <p className="font-black text-xs uppercase tracking-widest text-black/50 mb-1">
                Release Year
              </p>
              <p className="font-bold text-base">{suggestion.releaseYear}</p>
            </div>
          )}

          <div>
            <p className="font-black text-xs uppercase tracking-widest text-black/50 mb-1">
              Purpose
            </p>
            <p className="font-bold text-base leading-relaxed">
              {suggestion.purpose}
            </p>
          </div>

          <div>
            <p className="font-black text-xs uppercase tracking-widest text-black/50 mb-1">
              Why It Failed
            </p>
            <p className="font-bold text-base leading-relaxed">
              {suggestion.failureReason}
            </p>
          </div>

          <div className="pt-2 border-t-4 border-black">
            <p className="font-bold text-xs text-black/40 uppercase tracking-wider">
              Submitted{" "}
              {new Date(suggestion.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Status message */}
        {config.message && (
          <div className="border-4 border-black bg-neo-muted/30 p-5">
            <p className="font-bold text-sm leading-relaxed">{config.message}</p>
          </div>
        )}

        {/* Rejection reason */}
        {suggestion.status === "REJECTED" && suggestion.rejectionReason && (
          <div className="border-4 border-black bg-neo-bg p-5">
            <p className="font-black text-xs uppercase tracking-widest text-black/50 mb-2">
              Reason for Rejection
            </p>
            <p className="font-bold text-sm leading-relaxed">
              {suggestion.rejectionReason}
            </p>
          </div>
        )}

        <div className="mt-10 flex gap-4">
          <Link
            href="/gallery"
            className="inline-flex items-center h-12 px-6 border-4 border-black bg-black text-white font-black text-xs uppercase tracking-widest shadow-neo-sm hover:shadow-neo-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100"
          >
            View Collection
          </Link>
          <Link
            href="/suggest"
            className="inline-flex items-center h-12 px-6 border-4 border-black bg-neo-bg font-black text-xs uppercase tracking-widest shadow-neo-sm hover:bg-neo-secondary hover:shadow-neo-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100"
          >
            Submit Another
          </Link>
        </div>
      </main>
    </div>
  );
}

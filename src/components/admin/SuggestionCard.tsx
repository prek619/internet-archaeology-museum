"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rejectionSchema, RejectionFormData } from "@/lib/validators";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";
import { SuggestionStatus } from "@/generated/prisma/client";

export interface SuggestionData {
  id: string;
  name: string;
  releaseYear: number | null;
  purpose: string;
  failureReason: string;
  submitterName: string | null;
  imageNote: string | null;
  status: SuggestionStatus;
  rejectionReason: string | null;
  createdAt: string;
}

interface SuggestionCardProps {
  suggestion: SuggestionData;
}

export default function SuggestionCard({ suggestion }: SuggestionCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [rejecting, setRejecting] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RejectionFormData>({
    resolver: zodResolver(rejectionSchema),
  });

  const handleApprove = () => {
    const params = new URLSearchParams({
      fromSuggestion: suggestion.id,
      name: suggestion.name,
      purpose: suggestion.purpose,
      failureReason: suggestion.failureReason,
    });
    if (suggestion.releaseYear) params.set("releaseYear", String(suggestion.releaseYear));
    if (suggestion.imageNote) params.set("imageNote", suggestion.imageNote);
    router.push(`/admin/artifacts/new?${params.toString()}`);
  };

  const handleReject = async (data: RejectionFormData) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/suggestions/${suggestion.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reject",
          rejectionReason: data.rejectionReason,
        }),
      });
      if (!res.ok) {
        toast("Failed to reject suggestion.", "error");
        return;
      }
      toast("Suggestion rejected.", "success");
      reset();
      setRejecting(false);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const isPending = suggestion.status === "PENDING";

  return (
    <div
      className={[
        "border-4 border-black bg-white shadow-neo-sm",
        suggestion.status === "REJECTED" ? "opacity-70" : "",
      ].join(" ")}
    >
      {/* Header */}
      <div className="border-b-4 border-black px-5 py-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-black text-lg uppercase tracking-tight">
            {suggestion.name}
          </h3>
          <div className="flex items-center gap-3 mt-1">
            {suggestion.releaseYear && (
              <span className="font-bold text-xs text-black/50">
                {suggestion.releaseYear}
              </span>
            )}
            {suggestion.submitterName && (
              <span className="font-bold text-xs text-black/50">
                By {suggestion.submitterName}
              </span>
            )}
            <span className="font-bold text-xs text-black/40">
              {new Date(suggestion.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <span
          className={[
            "shrink-0 px-3 py-1 border-4 border-black font-black text-xs uppercase tracking-widest",
            suggestion.status === "PENDING"
              ? "bg-neo-secondary"
              : suggestion.status === "APPROVED"
              ? "bg-neo-muted"
              : "bg-neo-accent",
          ].join(" ")}
        >
          {suggestion.status}
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-3">
        <div>
          <span className="font-black text-xs uppercase tracking-widest text-black/50">
            Purpose —{" "}
          </span>
          <span className="font-bold text-sm">{suggestion.purpose}</span>
        </div>
        <div>
          <span className="font-black text-xs uppercase tracking-widest text-black/50">
            Why It Failed —{" "}
          </span>
          <span className="font-bold text-sm">{suggestion.failureReason}</span>
        </div>
        {suggestion.imageNote && (
          <div>
            <span className="font-black text-xs uppercase tracking-widest text-black/50">
              Why No Image —{" "}
            </span>
            <span className="font-bold text-sm italic">{suggestion.imageNote}</span>
          </div>
        )}
        {suggestion.rejectionReason && (
          <div className="border-l-4 border-neo-accent pl-4 mt-3">
            <span className="font-black text-xs uppercase tracking-widest text-black/50 block mb-0.5">
              Rejection Reason
            </span>
            <p className="font-bold text-sm">{suggestion.rejectionReason}</p>
          </div>
        )}
      </div>

      {/* Actions (only for pending) */}
      {isPending && (
        <div className="border-t-4 border-black px-5 py-4">
          {!rejecting ? (
            <div className="flex gap-3">
              <Button variant="secondary" size="sm" onClick={handleApprove}>
                Approve + Create Artifact
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRejecting(true)}
              >
                Reject
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(handleReject)} className="space-y-3">
              <Textarea
                label="Rejection Reason"
                error={errors.rejectionReason?.message}
                placeholder="Reason shown publicly on the suggestion status page."
                rows={3}
                {...register("rejectionReason")}
              />
              <div className="flex gap-3">
                <Button type="submit" variant="danger" size="sm" disabled={loading}>
                  {loading ? "Rejecting..." : "Confirm Rejection"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setRejecting(false);
                    reset();
                  }}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

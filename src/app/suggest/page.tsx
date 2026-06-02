"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { suggestionSchema, SuggestionFormData, parseYear } from "@/lib/validators";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

export default function SuggestPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SuggestionFormData>({
    resolver: zodResolver(suggestionSchema),
  });

  const onSubmit = async (data: SuggestionFormData) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        setError("Submission failed. Please try again.");
        return;
      }

      const { id } = await res.json();
      router.push(`/suggest/status/${id}`);
    } catch {
      setError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neo-bg">
      <header className="border-b-4 border-black bg-neo-bg">
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
        <div className="mb-10">
          <div className="inline-block border-4 border-black bg-neo-muted px-3 py-1.5 mb-4 rotate-1 shadow-neo-sm">
            <span className="font-black text-xs uppercase tracking-widest">
              Public Submission
            </span>
          </div>
          <h1 className="font-black text-4xl sm:text-6xl uppercase tracking-tighter leading-none mb-4">
            Suggest an Artifact
          </h1>
          <p className="font-bold text-base leading-relaxed text-black/70 max-w-xl">
            Do you know of a technology, product, or digital venture that belongs
            in this collection? The curatorial team reviews all submissions. Most
            are rejected. This is expected.
          </p>
        </div>

        <div className="border-4 border-black bg-white shadow-neo-md p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Artifact Name"
              error={errors.name?.message}
              placeholder="What was it called?"
              {...register("name")}
            />

            <Input
              label="Release Year"
              type="number"
              error={errors.releaseYear?.message}
              placeholder="Optional"
              {...register("releaseYear", { setValueAs: parseYear })}
            />

            <Textarea
              label="Purpose"
              error={errors.purpose?.message}
              placeholder="What did it claim to do?"
              rows={3}
              {...register("purpose")}
            />

            <Textarea
              label="Why It Failed"
              error={errors.failureReason?.message}
              placeholder="What happened?"
              rows={3}
              {...register("failureReason")}
            />

            <Input
              label="Your Name"
              error={errors.submitterName?.message}
              placeholder="Optional"
              hint="Not displayed publicly unless your suggestion is approved."
              {...register("submitterName")}
            />

            {error && (
              <div className="border-4 border-neo-accent bg-neo-accent/10 p-4">
                <p className="font-black text-sm text-neo-accent uppercase tracking-wide">
                  {error}
                </p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit for Review"}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-xs font-bold text-black/40 uppercase tracking-wider text-center">
          All submissions are reviewed by museum staff. Approved artifacts enter
          the permanent collection.
        </p>
      </main>
    </div>
  );
}

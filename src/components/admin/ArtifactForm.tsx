"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { artifactSchema, ArtifactFormData, parseYear } from "@/lib/validators";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";

interface ArtifactFormProps {
  artifactId?: string;
  exhibitNumber?: string;
  defaultValues?: Partial<ArtifactFormData>;
  suggestionId?: string;
}

const statusOptions = [
  { value: "DISCONTINUED", label: "Discontinued" },
  { value: "ACTIVE", label: "Active" },
  { value: "DESTROYED", label: "Destroyed" },
  { value: "ON_LOAN", label: "On Loan" },
];

export default function ArtifactForm({
  artifactId,
  exhibitNumber,
  defaultValues,
  suggestionId,
}: ArtifactFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const isEditing = Boolean(artifactId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArtifactFormData>({
    resolver: zodResolver(artifactSchema),
    defaultValues: {
      status: "DISCONTINUED" as const,
      ...defaultValues,
    },
  });

  const onSubmit = async (data: ArtifactFormData) => {
    setSubmitting(true);
    try {
      const url = isEditing
        ? `/api/admin/artifacts/${artifactId}`
        : "/api/admin/artifacts";
      const method = isEditing ? "PATCH" : "POST";

      const payload = suggestionId ? { ...data, suggestionId } : data;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json();
        toast(body.error ?? "Something went wrong", "error");
        return;
      }

      toast(isEditing ? "Artifact updated." : "Artifact created.", "success");
      router.push("/admin/artifacts");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {/* Exhibit number (read-only display) */}
      {exhibitNumber && (
        <div className="inline-block bg-neo-secondary border-4 border-black px-4 py-2 shadow-neo-sm">
          <span className="font-black text-sm uppercase tracking-widest">
            {exhibitNumber}
          </span>
          <span className="font-bold text-xs text-black/60 ml-2">
            (auto-assigned)
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            label="Artifact Name"
            error={errors.name?.message}
            placeholder="e.g. The Disposable Boomerang"
            {...register("name")}
          />
        </div>

        <Input
          label="Release Year"
          type="number"
          error={errors.releaseYear?.message}
          placeholder="e.g. 2012"
          {...register("releaseYear", { setValueAs: parseYear })}
        />

        <Input
          label="Inventor"
          error={errors.inventor?.message}
          placeholder="e.g. Gerald Finch"
          {...register("inventor")}
        />

        <div className="md:col-span-2">
          <Textarea
            label="Purpose"
            error={errors.purpose?.message}
            placeholder="One sentence. Deadpan. What it claimed to do."
            rows={3}
            {...register("purpose")}
          />
        </div>

        <div className="md:col-span-2">
          <Textarea
            label="Why It Failed"
            error={errors.failureReason?.message}
            placeholder="One sentence. The punchline never announces itself."
            rows={3}
            {...register("failureReason")}
          />
        </div>

        <div className="md:col-span-2">
          <Textarea
            label="Historical Impact"
            error={errors.historicalImpact?.message}
            placeholder='e.g. "Negligible." or darker.'
            rows={2}
            {...register("historicalImpact")}
          />
        </div>

        <div className="md:col-span-2">
          <Textarea
            label="Curator's Note"
            error={errors.curatorNote?.message}
            placeholder="Short plaque-style note. Tired institutional voice. Never explain the joke."
            rows={3}
            {...register("curatorNote")}
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="Image URL"
            type="url"
            error={errors.imageUrl?.message}
            placeholder="https://example.com/image.jpg (optional)"
            hint="Paste any publicly hosted image URL. Leave blank for placeholder."
            {...register("imageUrl")}
          />
        </div>

        <Select
          label="Status"
          options={statusOptions}
          error={errors.status?.message}
          {...register("status")}
        />
      </div>

      <div className="flex gap-4 pt-2">
        <Button type="submit" variant="primary" size="lg" disabled={submitting}>
          {submitting ? "Saving..." : isEditing ? "Save Changes" : "Create Artifact"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.back()}
          disabled={submitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

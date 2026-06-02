"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { ArtifactStatus } from "@/generated/prisma/client";

export interface ArtifactRow {
  id: string;
  exhibitNumber: string;
  name: string;
  releaseYear: number | null;
  status: ArtifactStatus;
  createdAt: string;
}

interface ArtifactTableProps {
  artifacts: ArtifactRow[];
}

export default function ArtifactTable({ artifacts }: ArtifactTableProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const artifactToDelete = artifacts.find((a) => a.id === confirmId);

  const handleDelete = async () => {
    if (!confirmId) return;
    setDeleting(confirmId);
    try {
      const res = await fetch(`/api/admin/artifacts/${confirmId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        toast("Failed to delete artifact.", "error");
        return;
      }
      toast("Artifact permanently deleted.", "success");
      setConfirmId(null);
      router.refresh();
    } finally {
      setDeleting(null);
    }
  };

  if (artifacts.length === 0) {
    return (
      <div className="border-4 border-black p-12 text-center bg-white">
        <p className="font-black text-lg uppercase tracking-wide text-black/50">
          No artifacts in the collection.
        </p>
        <p className="font-bold text-sm text-black/40 mt-2">
          The museum awaits its first exhibit.
        </p>
        <div className="mt-6">
          <Button variant="primary" size="md">
            <Link href="/admin/artifacts/new">Add First Artifact</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="border-4 border-black overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-black text-white">
              {["Exhibit", "Name", "Year", "Status", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-black text-xs uppercase tracking-widest border-r-4 border-white/20 last:border-0"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {artifacts.map((artifact, i) => (
              <tr
                key={artifact.id}
                className={[
                  "border-t-4 border-black",
                  i % 2 === 0 ? "bg-white" : "bg-neo-bg",
                ].join(" ")}
              >
                <td className="px-4 py-3 border-r-4 border-black">
                  <span className="font-black text-xs uppercase tracking-widest">
                    {artifact.exhibitNumber}
                  </span>
                </td>
                <td className="px-4 py-3 border-r-4 border-black">
                  <span className="font-bold text-sm">{artifact.name}</span>
                </td>
                <td className="px-4 py-3 border-r-4 border-black">
                  <span className="font-bold text-sm text-black/60">
                    {artifact.releaseYear ?? "—"}
                  </span>
                </td>
                <td className="px-4 py-3 border-r-4 border-black">
                  <StatusBadge status={artifact.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/artifacts/${artifact.id}/edit`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 border-4 border-black bg-neo-secondary font-black text-xs uppercase tracking-wider shadow-neo-sm hover:shadow-neo-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100"
                    >
                      <Pencil className="h-3.5 w-3.5 stroke-[3px]" />
                      Edit
                    </Link>
                    <button
                      onClick={() => setConfirmId(artifact.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 border-4 border-black bg-neo-bg font-black text-xs uppercase tracking-wider shadow-neo-sm hover:bg-neo-accent hover:shadow-neo-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100"
                    >
                      <Trash2 className="h-3.5 w-3.5 stroke-[3px]" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={Boolean(confirmId)}
        title="Delete Artifact"
        description={
          artifactToDelete
            ? `Permanently delete "${artifactToDelete.name}" (${artifactToDelete.exhibitNumber})? This cannot be undone.`
            : "Are you sure?"
        }
        confirmLabel="Delete Permanently"
        onConfirm={handleDelete}
        onCancel={() => setConfirmId(null)}
        loading={Boolean(deleting)}
      />
    </>
  );
}

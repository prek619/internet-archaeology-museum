"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) cancelRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onCancel();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="relative z-10 bg-neo-bg border-4 border-black shadow-neo-xl max-w-md w-full p-6">
        <h2
          id="dialog-title"
          className="font-black text-xl uppercase tracking-tight mb-3"
        >
          {title}
        </h2>
        <p className="font-bold text-sm leading-relaxed mb-6">{description}</p>
        <div className="flex gap-3 justify-end">
          <Button
            ref={cancelRef}
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Working..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

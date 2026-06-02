import { z } from "zod";

export const ArtifactStatusValues = [
  "ACTIVE",
  "DISCONTINUED",
  "DESTROYED",
  "ON_LOAN",
] as const;

// yearField: accepts number | null | undefined — form must use setValueAs to convert strings
const yearField = z
  .number()
  .int()
  .min(1800)
  .max(new Date().getFullYear() + 10)
  .nullable()
  .optional();

export const artifactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  releaseYear: yearField,
  inventor: z.string().max(200).optional().nullable(),
  purpose: z.string().min(1, "Purpose is required").max(1000),
  failureReason: z.string().min(1, "Failure reason is required").max(1000),
  historicalImpact: z.string().max(1000).optional().nullable(),
  curatorNote: z.string().max(1000).optional().nullable(),
  imageUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .nullable()
    .or(z.literal("")),
  imageNote: z.string().max(500).optional().nullable(),
  status: z.enum(ArtifactStatusValues),
});

export const suggestionSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  releaseYear: yearField,
  purpose: z.string().min(1, "Purpose is required").max(1000),
  failureReason: z.string().min(1, "Failure reason is required").max(1000),
  submitterName: z.string().max(200).optional().nullable(),
  imageNote: z.string().max(500).optional().nullable(),
});

export const rejectionSchema = z.object({
  rejectionReason: z.string().min(1, "Rejection reason is required").max(500),
});

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type ArtifactFormData = z.infer<typeof artifactSchema>;
export type SuggestionFormData = z.infer<typeof suggestionSchema>;
export type RejectionFormData = z.infer<typeof rejectionSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

// Converts a form string/empty input value to number | null for yearField
export function parseYear(val: unknown): number | null | undefined {
  if (val === "" || val === null || val === undefined) return null;
  const n = Number(val);
  return isNaN(n) ? null : n;
}

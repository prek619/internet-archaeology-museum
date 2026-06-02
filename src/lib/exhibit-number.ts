import { db } from "@/lib/db";

export function formatExhibitNumber(sequence: number): string {
  return `Exhibit #${String(sequence).padStart(4, "0")}`;
}

export async function getNextExhibitSequence(): Promise<number> {
  const latest = await db.artifact.findFirst({
    orderBy: { exhibitSequence: "desc" },
    select: { exhibitSequence: true },
  });
  return (latest?.exhibitSequence ?? 0) + 1;
}

import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { artifactSchema } from "@/lib/validators";
import {
  getNextExhibitSequence,
  formatExhibitNumber,
} from "@/lib/exhibit-number";

export async function GET() {
  if (!requireAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const artifacts = await db.artifact.findMany({
    orderBy: { exhibitSequence: "asc" },
    select: {
      id: true,
      exhibitNumber: true,
      name: true,
      releaseYear: true,
      status: true,
      createdAt: true,
    },
  });

  return NextResponse.json(artifacts);
}

export async function POST(req: NextRequest) {
  if (!requireAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = artifactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { imageUrl, imageNote, ...rest } = parsed.data;
  const sequence = await getNextExhibitSequence();
  const exhibitNumber = formatExhibitNumber(sequence);

  const artifact = await db.artifact.create({
    data: {
      ...rest,
      imageUrl: imageUrl || null,
      imageNote: imageNote || null,
      exhibitSequence: sequence,
      exhibitNumber,
      suggestionId: body.suggestionId ?? null,
      sourceType: body.suggestionId ? "SUGGESTION" : "ADMIN",
    },
  });

  // If created from a suggestion, mark it approved
  if (body.suggestionId) {
    await db.suggestion.update({
      where: { id: body.suggestionId },
      data: { status: "APPROVED" },
    });
  }

  return NextResponse.json(artifact, { status: 201 });
}

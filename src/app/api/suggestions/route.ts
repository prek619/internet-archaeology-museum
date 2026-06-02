import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { suggestionSchema } from "@/lib/validators";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = suggestionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { releaseYear, imageNote, ...rest } = parsed.data;

  const suggestion = await db.suggestion.create({
    data: {
      ...rest,
      releaseYear: releaseYear ?? null,
      imageNote: imageNote || null,
    },
  });

  return NextResponse.json({ id: suggestion.id }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const suggestion = await db.suggestion.findUnique({
    where: { id },
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

  if (!suggestion) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(suggestion);
}

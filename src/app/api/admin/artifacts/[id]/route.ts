import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { artifactSchema } from "@/lib/validators";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!requireAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const artifact = await db.artifact.findUnique({ where: { id: params.id } });
  if (!artifact) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(artifact);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

  const { imageUrl, ...rest } = parsed.data;

  const artifact = await db.artifact.update({
    where: { id: params.id },
    data: { ...rest, imageUrl: imageUrl || null },
  });

  return NextResponse.json(artifact);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!requireAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await db.artifact.delete({ where: { id: params.id } });

  return NextResponse.json({ ok: true });
}

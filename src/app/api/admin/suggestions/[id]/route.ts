import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { rejectionSchema } from "@/lib/validators";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { action, rejectionReason } = body;

  if (action === "reject") {
    const parsed = rejectionSchema.safeParse({ rejectionReason });
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Rejection reason is required" },
        { status: 422 }
      );
    }

    const suggestion = await db.suggestion.update({
      where: { id: params.id },
      data: {
        status: "REJECTED",
        rejectionReason: parsed.data.rejectionReason,
      },
    });

    return NextResponse.json(suggestion);
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

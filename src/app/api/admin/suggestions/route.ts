import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  if (!requireAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const suggestions = await db.suggestion.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(suggestions);
}

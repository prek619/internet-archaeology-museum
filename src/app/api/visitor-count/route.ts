import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  let record = await db.visitorCount.findFirst();
  if (!record) {
    record = await db.visitorCount.create({ data: {} });
  }
  return NextResponse.json({ count: record.count });
}

export async function POST() {
  let record = await db.visitorCount.findFirst();
  if (!record) {
    record = await db.visitorCount.create({ data: {} });
  }

  const updated = await db.visitorCount.update({
    where: { id: record.id },
    data: { count: { increment: 1 } },
  });

  return NextResponse.json({ count: updated.count });
}

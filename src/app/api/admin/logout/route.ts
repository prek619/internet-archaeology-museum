import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/auth";

export async function POST() {
  const session = getIronSession<SessionData>(cookies(), sessionOptions);
  session.destroy();

  return NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"));
}

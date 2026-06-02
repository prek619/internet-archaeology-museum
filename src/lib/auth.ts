import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  isAdmin: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "museum-admin-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  },
};

export function getSession() {
  return getIronSession<SessionData>(cookies(), sessionOptions);
}

export function requireAdmin() {
  const session = getSession();
  if (!session.isAdmin) return null;
  return session;
}

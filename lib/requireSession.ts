import type { Session, User } from "better-auth";
import type { NextRequest } from "next/server";

import { auth } from "@/lib/auth";

export type BetterAuthSession = {
  session: Session;
  user: User;
} | null;

export type AppSession = {
  session: Session;
  user: User;
};

/**
 * Extracts and validates session from any request.
 * Works for API routes, middleware, or server components.
 * Throws if session is missing.
 */
export async function requireSession(req: Request | NextRequest): Promise<AppSession> {
  // Extract headers
  const headers = "headers" in req ? req.headers : new Headers();

  const result: BetterAuthSession = await auth.api.getSession({ headers });

  if (!result?.user || !result.session) {
    const error = { error: "Unauthorized" };
    throw new Response(JSON.stringify(error), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return { session: result.session, user: result.user };
}

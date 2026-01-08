import { headers } from "next/headers";

import { auth } from "@/lib/auth";

/**
 * Retrieves the current authenticated session in a Server Component context.
 *
 * This helper should be used only in server components and server-only modules
 * where `next/headers` is available. It automatically reads request headers
 * from the framework and forwards them to Better Auth.
 *
 * DO NOT use this in:
 * - Route handlers (use `requireSession(req)` instead)
 * - Middleware / edge functions (use request.headers)
 *
 * @returns The current Better Auth session or null if unauthenticated.
 */
export async function getServerSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

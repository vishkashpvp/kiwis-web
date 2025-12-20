import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApiRequest = pathname.startsWith("/api");

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return isApiRequest
      ? NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      : NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/((?!auth).*)", // all api except auth
    "/dashboard",
    "/profile",
  ],
};

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const isApi = request.nextUrl.pathname.startsWith("/api");

  if (!session) {
    if (isApi) {
      // API request → return 401 Unauthorized JSON
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Page request → redirect browser to home page
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/dashboard", "/profile"],
};

"use client";

import Link from "next/link";

import { env } from "@/lib/env";

export default function AppHeader() {
  return (
    <header className="w-full">
      <nav className="w-full max-w-3xl px-6 py-6 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center w-6 h-6 text-xs font-semibold rounded-md bg-primary text-primary-foreground">
              ₹$
            </span>
            <Link className="text-sm font-medium tracking-tight" href="/">
              {env.client.NEXT_PUBLIC_APP_NAME}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

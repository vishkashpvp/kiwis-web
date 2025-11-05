"use client";

import { User } from "better-auth";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { SignOutButton } from "@/components/SignOutButton";
import { Badge } from "@/components/ui/badge";

export default function DashboardClient({ user }: { user: User }) {
  return (
    <div className="w-full max-w-3xl p-5 mx-auto space-y-8">
      <h3 className="text-2xl font-semibold">Hey {user.name} 👋</h3>

      <div className="space-y-5 flex flex-col">
        <p>Once your emails are processed, your subscriptions will appear here.</p>
        <Badge>Beta Access</Badge>

        <Link
          href="/profile"
          className="inline-flex items-center gap-1 text-sm text-blue-500 hover:underline">
          Profile <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>

      <SignOutButton />
    </div>
  );
}

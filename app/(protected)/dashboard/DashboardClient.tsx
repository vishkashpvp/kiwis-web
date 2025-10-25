"use client";

import { User } from "better-auth";

export default function DashboardClient({ user }: { user: User }) {
  return (
    <div className="w-full max-w-3xl p-5 mx-auto">
      <h3 className="text-2xl font-bold">Welcome {user.name}</h3>
      <p className="mt-4">
        Here’s your dashboard — check your stats, manage your settings, and stay on top of your
        activity.
      </p>
    </div>
  );
}

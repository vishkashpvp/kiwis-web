"use client";

import { authClient } from "@/lib/auth-client";

export default function Page() {
  const { data: session } = authClient.useSession();

  if (!session?.user) return null;

  const user = session.user;

  return (
    <div className="p-5">
      <p>{user.name}</p>
      <h3>{user.email}</h3>
    </div>
  );
}

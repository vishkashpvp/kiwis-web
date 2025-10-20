"use client";

import { useSession } from "@/lib/auth-client";

export default function Page() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  const user = session.user;

  return (
    <div className="p-5">
      <p>{user.name}</p>
      <h3>{user.email}</h3>
    </div>
  );
}

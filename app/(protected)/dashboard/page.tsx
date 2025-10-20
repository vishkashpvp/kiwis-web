"use client";

import Image from "next/image";

import { useSession } from "@/lib/auth-client";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  const user = session.user;

  return (
    <div className="p-5">
      <h3 className="text-2xl font-bold">welcome {user.name}</h3>
      {user.image?.trim() && (
        <Image priority src={user.image} alt={user.name ?? "user"} width={100} height={100} />
      )}
    </div>
  );
}

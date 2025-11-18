import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import ProfileClient from "./ProfileClient";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) return <p>Please log in.</p>;

  return <ProfileClient user={session.user} />;
}

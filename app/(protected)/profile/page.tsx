import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { SCOPE_GMAIL_READONLY } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { OAuthProvider } from "@/types/auth";
import ProfileClient from "./ProfileClient";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) return <p>Please log in.</p>;

  const googleAccount = await prisma.account.findFirst({
    where: { userId: session.user.id, providerId: OAuthProvider.Google },
  });

  const isMailServiceLinked = googleAccount?.scope?.includes(SCOPE_GMAIL_READONLY);

  return <ProfileClient user={session.user} isMailServiceLinked={isMailServiceLinked} />;
}

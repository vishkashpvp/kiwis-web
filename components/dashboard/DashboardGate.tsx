import { SCOPE_GMAIL_READONLY } from "@/lib/constants";
import { getServerSession } from "@/lib/getServerSession";
import prisma from "@/lib/prisma";
import { OAuthProvider } from "@/types/auth";
import DashboardClient from "./DashboardClient";
import LinkMailService from "./LinkMailService";

export default async function DashboardGate() {
  const session = await getServerSession();

  if (!session?.user) return null; // root will handle unauth

  const googleAccount = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      providerId: OAuthProvider.Google,
    },
  });

  const isMailServiceLinked = googleAccount?.scope?.includes(SCOPE_GMAIL_READONLY);

  if (!isMailServiceLinked) {
    return <LinkMailService name={session.user.name} />;
  }

  return <DashboardClient user={session.user} />;
}

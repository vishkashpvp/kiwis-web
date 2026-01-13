import { getServerSession } from "@/lib/getServerSession";
import ProfileClient from "./ProfileClient";

export default async function Page() {
  const session = await getServerSession();

  if (!session?.user) return null;

  return <ProfileClient user={session.user} />;
}

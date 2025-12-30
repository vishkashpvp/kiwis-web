import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import ProfileClient from "./ProfileClient";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) return null;

  return (
    <div className="flex flex-col min-h-dvh">
      <AppHeader />

      <section className="flex-1 w-full max-w-3xl mx-auto">
        <ProfileClient user={session.user} />
      </section>

      <AppFooter />
    </div>
  );
}

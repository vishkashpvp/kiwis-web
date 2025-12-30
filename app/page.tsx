import { headers } from "next/headers";

import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import LaunchHero from "@/components/LaunchHero";
import DashboardGate from "@/components/dashboard/DashboardGate";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex flex-col min-h-dvh">
      <AppHeader />

      <main className="flex flex-1">
        <section className="w-full max-w-3xl px-6 pt-8 mx-auto">
          {session ? <DashboardGate /> : <LaunchHero />}
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

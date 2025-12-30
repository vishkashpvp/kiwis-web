import { headers } from "next/headers";

import LaunchHero from "@/components/LaunchHero";
import DashboardGate from "@/components/dashboard/DashboardGate";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="w-full max-w-3xl px-6 pt-8 mx-auto">
      {session ? <DashboardGate /> : <LaunchHero />}
    </section>
  );
}

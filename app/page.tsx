import LaunchHero from "@/components/LaunchHero";
import DashboardGate from "@/components/dashboard/DashboardGate";
import { getServerSession } from "@/lib/getServerSession";

export default async function Home() {
  const session = await getServerSession();

  return (
    <section className="w-full max-w-3xl px-6 pt-8 mx-auto">
      {session ? <DashboardGate /> : <LaunchHero />}
    </section>
  );
}

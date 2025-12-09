import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import LaunchHero from "@/components/LaunchHero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <AppHeader />

      <main className="flex-1">
        <section className="w-full max-w-3xl px-6 py-16 mx-auto md:py-24">
          <LaunchHero />
        </section>
      </main>

      <AppFooter />
    </div>
  );
}

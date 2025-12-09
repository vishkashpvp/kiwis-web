"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/");
    }
  }, [isPending, session, router]);

  if (isPending) return <Loader />;

  if (!session?.user) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1">
        <section className="container w-full mx-auto">{children}</section>
      </main>
      <AppFooter />
    </div>
  );
}

function Loader() {
  return (
    <div className="flex items-center justify-center h-full min-h-screen">
      <Spinner className="size-6" />
    </div>
  );
}

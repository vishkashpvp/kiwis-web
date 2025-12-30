"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function SignOutButton(props: React.ComponentProps<typeof Button>) {
  const router = useRouter();

  const handleSignout = async () => {
    try {
      await authClient.signOut();
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button onClick={handleSignout} variant="outline" {...props}>
      Sign out
    </Button>
  );
}

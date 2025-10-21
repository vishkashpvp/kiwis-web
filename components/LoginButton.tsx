"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { OAuthProvider } from "@/types/auth";
import { capitalizeFirstLetter } from "@/utils/string";

export default function LoginButton({ provider }: { provider: OAuthProvider }) {
  const handleLogin = async () => {
    try {
      await signIn.social({ provider, callbackURL: "/dashboard" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button onClick={handleLogin} type="button" className="cursor-pointer">
      Sign in with {capitalizeFirstLetter(provider)}
    </Button>
  );
}

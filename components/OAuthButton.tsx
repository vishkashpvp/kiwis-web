"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { OAuthProvider } from "@/types/auth";

interface Props {
  provider: OAuthProvider;
  label: string;
}

export default function OAuthButton({ provider, label }: Props) {
  const handleOAuth = async () => {
    try {
      await authClient.signIn.social({ provider, callbackURL: "/dashboard" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button onClick={handleOAuth} type="button" className="cursor-pointer">
      {label}
    </Button>
  );
}

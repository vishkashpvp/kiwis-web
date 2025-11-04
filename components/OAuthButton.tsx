"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { ICONS_URL } from "@/lib/constants";
import { OAuthProvider } from "@/types/auth";

const providerIcons: Record<OAuthProvider, { src: string; alt: string }> = {
  google: { src: ICONS_URL.google, alt: "Google" },
};

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

  const { src, alt } = providerIcons[provider];

  return (
    <Button onClick={handleOAuth} type="button" className="cursor-pointer" variant="outline">
      <Image src={src} alt={alt} width={18} height={18} />
      {label}
    </Button>
  );
}

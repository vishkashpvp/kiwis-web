import { env } from "@/lib/env";
import { OAuthProvider } from "@/types/auth";
import OAuthButton from "./OAuthButton";
import { Badge } from "./ui/badge";

export default function LaunchHero() {
  return (
    <div className="flex flex-col items-start gap-8">
      <Badge>Private by design</Badge>

      <div className="space-y-4">
        <h1 className="text-3xl font-semibold leading-tight text-balance md:text-5xl">
          AI-powered insights from your email
        </h1>
        <p className="text-pretty text-muted-foreground md:text-lg">
          See upcoming payments, fully private. {env.client.NEXT_PUBLIC_APP_NAME} surfaces what
          matters without ever compromising your data.
        </p>
      </div>

      <OAuthButton provider={OAuthProvider.Google} label="Sign in with Google" />
    </div>
  );
}

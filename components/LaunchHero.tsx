import { env } from "@/lib/env";

export default function LaunchHero() {
  return (
    <div className="flex flex-col items-start gap-8">
      <div className="inline-flex items-center px-3 py-1 text-xs border rounded-full border-border text-muted-foreground">
        Private by design
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-semibold leading-tight text-balance md:text-5xl">
          AI-powered insights from your email
        </h1>
        <p className="text-pretty text-muted-foreground md:text-lg">
          See upcoming payments, fully private. {env.server.APP_NAME} surfaces what matters without
          ever compromising your data.
        </p>
      </div>

      <div>
        <h1 className="font-semibold leading-tight text-green-600 text-balance">
          we are coming soon... 💚
        </h1>
      </div>
    </div>
  );
}

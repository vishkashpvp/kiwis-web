import { env } from "@/lib/env";
import { ModeToggle } from "./mode-toggle";

export default function AppFooter() {
  return (
    <footer className="mt-8 border-t border-border">
      <div className="flex items-center justify-between w-full max-w-3xl px-6 py-3 mx-auto text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} {env.client.NEXT_PUBLIC_APP_NAME} — Fully private by design.
        </p>
        <div className="flex items-center gap-5">
          <p>v{env.client.NEXT_PUBLIC_APP_VERSION}</p>
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}

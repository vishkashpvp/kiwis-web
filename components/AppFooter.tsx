import { env } from "@/lib/env";
import { ModeToggle } from "./mode-toggle";

export default function AppFooter() {
  return (
    <footer className="mt-8 border-t border-border">
      <div className="flex items-center justify-between w-full max-w-3xl px-6 py-3 mx-auto">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {env.client.NEXT_PUBLIC_APP_NAME} — Fully private by design.
        </p>
        <ModeToggle />
      </div>
    </footer>
  );
}

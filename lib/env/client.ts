import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

/**
 * Environment variables available on the client (and server).
 *
 * Note:
 * - Only variables prefixed with `NEXT_PUBLIC_` can be safely exposed to the client.
 * - These values are statically injected at build time and included in the client bundle.
 */
export const clientEnv = createEnv({
  client: {
    // 👇 Must start with NEXT_PUBLIC_ (Next.js requirement)
    NEXT_PUBLIC_APP_NAME: z.string().min(1),
    NEXT_PUBLIC_SUPPORT_CONTACT: z.email(),
    NEXT_PUBLIC_APP_URL: z.url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_SUPPORT_CONTACT: process.env.NEXT_PUBLIC_SUPPORT_CONTACT,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});

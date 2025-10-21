import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

/**
 * Environment variables available only on the server.
 *
 * Note:
 * - These values are not exposed to the client.
 * - Accessing them from a client component will throw an error at runtime.
 */
export const serverEnv = createEnv({
  server: {
    // 👇 Add server-only environment variables here as needed.
    APP_NAME: z.string().min(1),
  },
  // for Next.js >= 13.4.4, you can just reference process.env:
  experimental__runtimeEnv: process.env,
});

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "@/lib/prisma";
import { env } from "./env";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: env.server.GOOGLE_CLIENT_ID,
      clientSecret: env.server.GOOGLE_CLIENT_SECRET,
      accessType: "offline",
      prompt: "select_account consent",
      scope: ["openid", "email", "profile", "https://www.googleapis.com/auth/gmail.readonly"],
    },
  },
});

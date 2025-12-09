import { createAuthClient } from "better-auth/react";

import { OAuthProvider } from "@/types/auth";
import { SCOPE_GMAIL_READONLY } from "./constants";

export const authClient = createAuthClient();

export const requestGmailAccess = async () => {
  return authClient.linkSocial({
    provider: OAuthProvider.Google,
    scopes: [SCOPE_GMAIL_READONLY],
    callbackURL: "/dashboard",
  });
};

import { clientEnv } from "./client";
import { serverEnv } from "./server";

export const env = {
  get server() {
    if (typeof window !== "undefined") {
      throw new Error("Server env is not accessible on the client");
    }
    return serverEnv;
  },
  get client() {
    return clientEnv;
  },
};

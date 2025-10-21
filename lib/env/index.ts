import { serverEnv } from "./server";
import { clientEnv } from "./client";

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

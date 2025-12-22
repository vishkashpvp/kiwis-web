import { NextResponse } from "next/server";

type ErrorWithStatus = {
  status?: number;
};

export function handleApiError(err: unknown, label: string) {
  console.error(label, err);

  if (err instanceof Response) return err;

  const message = err instanceof Error && err.message ? err.message : "Internal server error";

  const status =
    typeof (err as ErrorWithStatus)?.status === "number" ? (err as ErrorWithStatus).status : 500;

  return NextResponse.json({ error: message }, { status });
}

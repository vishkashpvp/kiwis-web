import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // unwrap params
    const { id } = await ctx.params;

    // fetch user's accounts
    const accounts = await prisma.account.findMany({
      where: { userId },
      select: { id: true },
    });

    const accountIds = accounts.map((a) => a.id);

    if (accountIds.length === 0) {
      return NextResponse.json({ error: "No accounts found" }, { status: 404 });
    }

    // fetch payment
    const payment = await prisma.payments.findUnique({ where: { id } });

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // ownership verification
    if (!accountIds.includes(payment.account_id)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(payment);
  } catch (err: unknown) {
    console.error("GET /api/payments/[id] error:", err);

    const message = err instanceof Error && err.message ? err.message : "Internal server error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

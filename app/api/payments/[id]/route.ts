import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/requireSession";

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { user } = await requireSession(req);

    // unwrap params
    const { id } = await ctx.params;

    // fetch user's accounts
    const accounts = await prisma.account.findMany({
      where: { userId: user.id },
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

    if (err instanceof Response) return err;

    const message = err instanceof Error && err.message ? err.message : "Internal server error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

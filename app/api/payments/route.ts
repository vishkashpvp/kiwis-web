import { NextResponse } from "next/server";

import type { Prisma } from "@/generated/prisma";
import { PaymentStatus, Recurrence } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { parseEnum } from "@/utils/enum";

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // fetch user with accounts
    const userWithAccounts = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        accounts: { select: { id: true } },
      },
    });

    const accountIds = userWithAccounts?.accounts.map((a) => a.id) ?? [];

    if (accountIds.length === 0) {
      return NextResponse.json({ page: 1, limit: 0, total: 0, data: [] });
    }

    // parse query params
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit") ?? 20);
    const page = Number(searchParams.get("page") ?? 1);
    const skip = (page - 1) * limit;
    const status = searchParams.get("status");
    const recurrence = searchParams.get("recurrence");

    const statusEnum = parseEnum(status, PaymentStatus);
    const recurrenceEnum = parseEnum(recurrence, Recurrence);

    const where: Prisma.PaymentsWhereInput = {
      account_id: { in: accountIds },
      ...(statusEnum ? { status: statusEnum } : {}),
      ...(recurrenceEnum ? { recurrence: recurrenceEnum } : {}),
    };

    const [data, total] = await Promise.all([
      prisma.payments.findMany({
        where,
        orderBy: { date: "desc" },
        skip,
        take: limit,
      }),
      prisma.payments.count({ where }),
    ]);

    return NextResponse.json({ page, limit, total, data });
  } catch (err: unknown) {
    console.error("GET /api/payments error:", err);

    const message = err instanceof Error && err.message ? err.message : "Internal server error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

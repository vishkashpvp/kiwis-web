import { NextResponse } from "next/server";

import type { Prisma } from "@/generated/prisma";
import { handleApiError } from "@/lib/api/handleApiError";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/requireSession";

export async function GET(req: Request) {
  try {
    const { user } = await requireSession(req);

    // fetch user with accounts
    const userWithAccounts = await prisma.user.findUnique({
      where: { id: user.id },
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

    const statusFilter = status ?? undefined;
    const recurrenceFilter = recurrence ?? undefined;

    const where: Prisma.PaymentWhereInput = {
      account_id: { in: accountIds },
      ...(statusFilter ? { status: statusFilter } : {}),
      ...(recurrenceFilter ? { recurrence: recurrenceFilter } : {}),
    };

    const [data, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        orderBy: { date: "desc" },
        skip,
        take: limit,
      }),
      prisma.payment.count({ where }),
    ]);

    return NextResponse.json({ page, limit, total, data });
  } catch (err: unknown) {
    return handleApiError(err, "GET /api/payments");
  }
}

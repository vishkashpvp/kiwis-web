import { Payment } from "@/generated/prisma";

export interface PaginatedPayments {
  page: number;
  limit: number;
  total: number;
  data: Payment[];
}

export interface ApiResult<T> {
  error: boolean;
  status: number | null;
  data: T | null;
}

export async function getPayments(page = 1, limit = 4): Promise<ApiResult<PaginatedPayments>> {
  try {
    const res = await fetch(`/api/payments?page=${page}&limit=${limit}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      return { error: true, status: res.status, data: null };
    }

    const json: PaginatedPayments = await res.json();

    return { error: false, status: res.status, data: json };
  } catch (err) {
    console.error("getPayments error:", err);

    return { error: true, status: 500, data: null };
  }
}

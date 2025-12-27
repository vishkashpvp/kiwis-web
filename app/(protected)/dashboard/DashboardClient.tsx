"use client";

import { User } from "better-auth";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { SignOutButton } from "@/components/SignOutButton";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Payments } from "@/generated/prisma";
import type { PaginatedPayments } from "@/lib/api/payments";
import { getPayments } from "@/lib/api/payments";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/currency";
import { formatDate } from "@/utils/date";
import { capitalizeFirstLetter } from "@/utils/string";

/** Helper: build pages with ellipsis (maxButtons e.g. 7) */
function buildPages(total: number, limit: number, current: number, maxButtons = 7) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  if (totalPages <= maxButtons) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const pages: (number | "...")[] = [];
  const side = Math.floor((maxButtons - 3) / 2); // reserve first, last, current block
  const left = Math.max(2, current - side);
  const right = Math.min(totalPages - 1, current + side);

  pages.push(1);

  if (left > 2) pages.push("...");

  for (let p = left; p <= right; p++) pages.push(p);

  if (right < totalPages - 1) pages.push("...");

  pages.push(totalPages);
  return pages;
}

const DEFAULT_CLASSES = "bg-foreground text-background";
const paymentStatusClasses = {
  paid: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  due: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  upcoming: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  overdue: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  failed: "bg-red-200 text-red-900 dark:bg-red-900/40 dark:text-red-400",
} satisfies Record<string, string>;

/** status -> badge style */
function statusClass(status: string) {
  const key = status as keyof typeof paymentStatusClasses;
  return paymentStatusClasses[key] ?? DEFAULT_CLASSES;
}

export default function DashboardClient({ user }: { user: User }) {
  const [page, setPage] = useState<number>(1);
  const [result, setResult] = useState<PaginatedPayments | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);

      const res = await getPayments(page);

      if (ignore) return;

      if (res.error || !res.data) {
        setError("Failed to load payments");
        setLoading(false);
        return;
      }

      setResult(res.data);
      setError(null);
      setLoading(false);
    }

    load();

    return () => {
      ignore = true;
    };
  }, [page]);

  const pages = useMemo(() => {
    if (!result) return [1];
    return buildPages(result.total, result.limit, page, 5);
  }, [result, page]);

  return (
    <div className="w-full max-w-3xl p-5 mx-auto space-y-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-2xl font-semibold">Hey {user.name} 👋</h3>
        <Link
          href="/profile"
          className="inline-flex items-center gap-1 text-sm text-blue-500 hover:underline">
          Profile <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <Badge>Beta Access</Badge>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* TABLE */}
      <div className="relative p-2 border rounded-md">
        {/* loader overlay (keeps old rows visible underneath) */}
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-white/60 dark:bg-background/60" />
            <div className="relative z-20">
              <Spinner className="size-6" />
            </div>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="py-3">Merchant</TableHead>
              <TableHead className="py-3">Amount</TableHead>
              <TableHead className="py-3">Date</TableHead>
              <TableHead className="py-3">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* empty state */}
            {!loading && result && result.data.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="py-10 text-sm text-center text-gray-500">
                  Once your emails are processed, your subscriptions will appear here.
                </TableCell>
              </TableRow>
            )}

            {/* data rows with fade during loading */}
            {result &&
              result.data.length > 0 &&
              result.data.map((p: Payments) => (
                <TableRow key={p.id} className={loading ? "opacity-60" : "hover:bg-muted/50"}>
                  <TableCell className="py-3 max-w-[200px] truncate">{p.merchant}</TableCell>

                  <TableCell className="py-3 font-mono tabular-nums">
                    {formatCurrency(p.amount.toString(), p.currency)}
                  </TableCell>

                  <TableCell className="py-3">{formatDate(p.date)}</TableCell>

                  <TableCell className="py-3">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-xs",
                        statusClass(p.status)
                      )}>
                      {capitalizeFirstLetter(p.status)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* pagination (page numbers + prev/next) */}
      {result && result.total > result.limit && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => page > 1 && setPage((s) => s - 1)}
                className={page <= 1 ? "pointer-events-none opacity-40" : ""}
              />
            </PaginationItem>

            {pages.map((p, idx) =>
              p === "..." ? (
                <PaginationItem key={`e-${idx}`}>
                  <span className="px-3 text-sm">…</span>
                </PaginationItem>
              ) : (
                <PaginationItem key={p}>
                  <PaginationLink
                    onClick={() => setPage(Number(p))}
                    isActive={p === page}
                    className={p === page ? "pointer-events-none" : ""}>
                    {p}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => result.total > page * result.limit && setPage((s) => s + 1)}
                className={
                  result.total <= page * result.limit ? "pointer-events-none opacity-40" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <SignOutButton />
    </div>
  );
}

"use client";

import { User } from "better-auth";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { SignOutButton } from "@/components/SignOutButton";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
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
import { Payments } from "@/generated/prisma";
import { getPayments, PaginatedPayments } from "@/lib/api/payments";

export default function DashboardClient({ user }: { user: User }) {
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<PaginatedPayments | null>(null);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="w-full max-w-4xl p-5 mx-auto space-y-8">
      <div className="flex items-baseline gap-5 text-2xl font-semibold">
        <h3>Hey {user.name} 👋</h3>
        <Link
          href="/profile"
          className="inline-flex items-center gap-1 text-sm text-blue-500 hover:underline">
          Profile <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </div>

      <Badge>Beta Access</Badge>

      {/* ERROR */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* TABLE */}
      <div className="relative p-2 border rounded-md">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
            <Spinner className="size-6" />
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
            {/* EMPTY STATE ROW */}
            {!loading && result && result.data.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="py-10 text-sm text-center text-gray-500">
                  Once your emails are processed, your subscriptions will appear here.
                </TableCell>
              </TableRow>
            )}

            {/* PAYMENT ROWS */}
            {!loading &&
              result &&
              result.data.length > 0 &&
              result.data.map((p: Payments) => (
                <TableRow key={p.id} className="hover:bg-muted/50">
                  <TableCell className="py-3">{p.merchant}</TableCell>

                  <TableCell className="py-3">
                    {p.amount.toString()} {p.currency}
                  </TableCell>

                  <TableCell className="py-3">{new Date(p.date).toLocaleDateString()}</TableCell>

                  <TableCell className="py-3">
                    <Badge className="capitalize">{p.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      {result && result.total > result.limit && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => page > 1 && setPage(page - 1)}
                className={page <= 1 ? "pointer-events-none opacity-40" : ""}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => result.total > page * result.limit && setPage(page + 1)}
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

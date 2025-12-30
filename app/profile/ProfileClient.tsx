"use client";

import { User } from "better-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICONS_URL } from "@/lib/constants";
import { formatDate } from "@/utils/date";

export default function ProfileClient({ user }: { user: User }) {
  return (
    <main className="max-w-3xl p-6 mx-auto ">
      <div className="flex flex-col items-center mb-10">
        <div className="relative">
          <Avatar className="border w-28 h-28">
            <AvatarImage src={user.image || ICONS_URL.bitcoin} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
        <h1 className="mt-4 text-3xl font-semibold">{user.name}</h1>
        <div className="text-sm">Member since {formatDate(user.createdAt)}</div>
      </div>

      <section className="space-y-6">
        <div className="flex flex-col gap-2 p-4 border rounded-lg">
          <Label className="text-lg font-semibold">Name</Label>
          <div className="text-sm">This is the name associated with your account.</div>
          <div className="cursor-not-allowed">
            <Input name="name" value={user.name} disabled className="flex-1 h-10 border" />
          </div>
        </div>

        <div className="flex flex-col gap-2 p-4 border rounded-lg">
          <Label>Email</Label>
          <div className="text-sm">Email is connected via Google and cannot be edited here.</div>
          <div className="cursor-not-allowed">
            <Input name="email" value={user.email} disabled className="w-full h-10 border" />
          </div>
        </div>
      </section>
    </main>
  );
}

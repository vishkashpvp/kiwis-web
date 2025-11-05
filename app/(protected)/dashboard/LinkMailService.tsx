"use client";

import { SignOutButton } from "@/components/SignOutButton";
import { Button } from "@/components/ui/button";
import { requestGmailAccess } from "@/lib/auth-client";

export default function LinkMailService({ name }: { name: string }) {
  const handleClick = async () => {
    try {
      await requestGmailAccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-3xl px-6 py-6 mx-auto">
      <h3 className="text-2xl font-bold">Welcome {name}</h3>
      <p className="my-3">
        To get started, please link your Gmail account to sync emails and payments.
      </p>
      <div className="space-x-5">
        <Button onClick={handleClick} type="button" className="cursor-pointer">
          Link Gmail
        </Button>

        <SignOutButton />
      </div>
    </div>
  );
}

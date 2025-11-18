import { env } from "@/lib/env";

const APP_NAME = env.client.NEXT_PUBLIC_APP_NAME;

export default function Privacy() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>
      <h3>Effective: November 16, 2025</h3>
      <h3 className="mt-10 mb-5">Thank you for using {APP_NAME}!</h3>

      <p>
        {APP_NAME} is currently in its MVP phase. We collect only the minimum data required to
        operate the platform securely and reliably.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What We Collect</h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Email, name, date of birth, and gender from Google OAuth.</li>
        <li>Read-only Gmail access to detect upcoming and recurring payments.</li>
        <li>Only extracted fields: provider, amount, currency, due date, and payment mode.</li>
        <li>OAuth-related cookies and session information.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Use of Gmail Data</h2>
      <p className="mb-4">
        Gmail data is used solely to identify and display your upcoming and recurring payments. No
        raw Gmail messages are stored. We do not use Gmail data for ads, analytics, machine
        learning, or profiling. We do not transfer Gmail data to third parties except essential
        service providers required to operate the platform.
        <br />
        Human access to Gmail-derived data is rare and limited to situations like debugging or
        security reviews, typically initiated by a user support request and only when necessary.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What We Do NOT Collect</h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>No raw Gmail messages.</li>
        <li>No device, browser, or IP logs.</li>
        <li>No user-generated content.</li>
        <li>No analytics or tracking tools.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Storage & Access</h2>
      <p className="mb-4">
        Data is stored securely in a PostgreSQL database hosted on Hetzner infrastructure. Data is
        encrypted in transit and at rest. Access is restricted to the Next.js API backend and Go
        workers that process Gmail data.
        <br />
        We follow industry-standard security practices to protect your data from unauthorized
        access.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Retention</h2>
      <p className="mb-4">
        Data is retained until the user requests deletion or until automated retention and deletion
        controls are introduced. During the MVP phase, deletion requests are handled manually and
        may require identity verification.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">User Rights</h2>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Right to request access to your data.</li>
        <li>Right to request manual deletion during MVP.</li>
        <li>Right to request manual Gmail disconnection during MVP.</li>
        <li>Automated controls for all actions will be added in future versions.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p>For questions, reach us at {env.client.NEXT_PUBLIC_SUPPORT_CONTACT}</p>
    </main>
  );
}

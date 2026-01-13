import { env } from "@/lib/env";

const APP_NAME = env.client.NEXT_PUBLIC_APP_NAME;

export default function Terms() {
  return (
    <main className="max-w-3xl p-6 mx-auto">
      <h1 className="mb-4 text-3xl font-semibold">Terms of Service</h1>
      <h3>Effective: November 16, 2025</h3>
      <h3 className="mt-10 mb-5">Welcome to {APP_NAME}!</h3>

      <p>
        By accessing or using {APP_NAME}, you agree to these Terms of Service. If you do not agree
        with them, please do not use the platform.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Use of the Service</h2>
      <p className="mb-4">
        {APP_NAME} helps users identify upcoming and recurring payments using read-only Gmail
        access. You agree to use the platform only for lawful purposes and in compliance with all
        applicable laws.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Eligibility</h2>
      <p className="mb-4">
        Anyone with a valid Google account may use the service. We do not impose additional
        age-based restrictions beyond Google’s own account policies.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Account & Authentication</h2>
      <p className="mb-4">
        You must use your own Google account and ensure the confidentiality of your login
        credentials. Unauthorized access, impersonation, or sharing accounts is prohibited.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Gmail Access</h2>
      <p className="mb-4">
        The platform uses read-only Gmail permissions solely to detect upcoming and recurring
        payments. We do not send, delete, or modify emails. By using the service, you authorize us
        to read relevant payment-related emails for this specific purpose.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Accuracy of Information</h2>
      <p className="mb-4">
        Extracted payment details (provider, amount, due date, etc.) may not always be accurate due
        to email formatting or third-party changes. The platform provides best-effort results. Final
        responsibility for managing payments remains with you.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Prohibited Activities</h2>
      <ul className="pl-6 mb-4 space-y-1 list-disc">
        <li>Attempting to bypass or interfere with security features.</li>
        <li>Reverse engineering or abusing the service.</li>
        <li>Automated scraping, spamming, or overloading the platform.</li>
        <li>Using the service to harm, harass, or exploit others.</li>
      </ul>

      <h2 className="mt-6 mb-2 text-xl font-semibold">MVP Limitations</h2>
      <p className="mb-4">
        The service is currently in its MVP phase. Some controls such as account deletion, Gmail
        disconnection, and data export may not be available yet and will be added in future updates
        as the product evolves.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Service Availability</h2>
      <p className="mb-4">
        We may update, pause, or discontinue the service at any time for maintenance or
        improvements. We do not guarantee uninterrupted availability.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Liability</h2>
      <p className="mb-4">
        {APP_NAME} is provided on an “as-is” basis. We are not responsible for missed payments,
        financial loss, or damages arising from reliance on extracted data or the use of the
        service.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Changes to Terms</h2>
      <p className="mb-4">
        We may update these Terms from time to time. Continued use of the platform after changes
        means you accept the updated Terms.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Contact</h2>
      <p>For any questions, reach us at {env.client.NEXT_PUBLIC_SUPPORT_CONTACT}</p>
    </main>
  );
}

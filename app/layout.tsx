import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { ThemeProvider } from "@/components/theme-provider";
import { env } from "@/lib/env";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const origin = env.client.NEXT_PUBLIC_APP_URL;
const TITLE = env.client.NEXT_PUBLIC_APP_NAME;
const DESCRIPTION = "AI-powered insights from your email — see upcoming payments, fully private.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    images: [
      {
        url: `${origin}/og`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${origin}/og`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <div className="flex flex-col min-h-dvh">
            <AppHeader />
            <main className="flex-1">{children}</main>
            <AppFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/providers/theme-provider";

import ClientLayout from "@/components/ClientLayout";
import { DeviceProvider } from "./context/device";

import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "solana sign",
  description: "sign documents using solana wallets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className={cn("min-h-screen antialiased")}>
        {/* TODO: make this default to system ... dark mode is throwing color errors */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <DeviceProvider>
            <Toaster />
            {/* Your existing layout content */}
            <ClientLayout>
              {children}
            </ClientLayout>
          </DeviceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

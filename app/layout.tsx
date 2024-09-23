import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import { ThemeProvider } from "next-themes";
import { WalletProvider } from '@/components/WalletProvider';

import { cn } from "@/lib/utils";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

export const metadata: Metadata = {
  title: "SolanaSign",
  description: "Sign documents using Solana blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className={cn("min-h-screen antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ConvexClientProvider>
            <WalletProvider>
              {children}
            </WalletProvider>
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

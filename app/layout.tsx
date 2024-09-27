import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";
import { SolanaWalletProvider } from "@/components/providers/SolanaWalletProvider";
import Navbar from "./_components/Navbar";
import { GridPattern } from "@/components/ui/grid-pattern";

export const metadata: Metadata = {
  title: "SolanaSign",
  description: "Sign documents using Solana blockchain",
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SolanaWalletProvider>
          <GridPattern
          width={20}
          height={20}
              x={-1}
              y={-1}
              className={cn(
                "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] z-[-1]",
              )}
            />
            <Navbar />
            {/* Your existing layout content */}
            {children}
          </SolanaWalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

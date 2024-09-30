import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/providers/theme-provider";

import { cn } from "@/lib/utils";
import { SolanaWalletProvider } from "@/components/providers/SolanaWalletProvider";
import Navbar from "./_components/Navbar";
import { GridPattern } from "@/components/ui/grid-pattern";
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SolanaWalletProvider>
            <GridPattern
              width={10}
              height={10}
              x={-1}
              y={-1}
              className={cn(
                "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] z-[-1]",
              )}
            />
            <Toaster />
            <Navbar />
            {/* Your existing layout content */}
            {children}
          </SolanaWalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

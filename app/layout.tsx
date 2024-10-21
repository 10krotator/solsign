import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { cn } from "@/lib/utils";
import { SolanaWalletProvider } from "@/components/providers/SolanaWalletProvider";
import Navbar from "../components/common/Navbar";
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
            <SidebarProvider>
              <SidebarTrigger />
              <AppSidebar />
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
            </SidebarProvider>
          </SolanaWalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

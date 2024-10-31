import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/providers/theme-provider";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/app-sidebar";

import ClientLayout from "@/components/ClientLayout";
import { DeviceProvider } from "./context/device";

import { cn } from "@/lib/utils";
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
        {/* TODO: make this default to system ... dark mode is throwing color errors */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <DeviceProvider>
            <Toaster />
            {/* Your existing layout content */}
            <ClientLayout>
              <GridPattern
                width={10}
                height={10}
                x={-1}
                y={-1}
                className={cn(
                "[mask-image:linear-gradient(to_bottom,#09090b,#09090b)] z-[-1]",
                )}
              />
              {children}
            </ClientLayout>
            </DeviceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

'use client';

import AppWithSidebarAndWallet from '@/components/AppWithSidebar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <AppWithSidebarAndWallet>{children}</AppWithSidebarAndWallet>;
}

"use client";

// import { useMemo } from "react";
// import {
//   ConnectionProvider,
//   WalletProvider,
// } from "@solana/wallet-adapter-react";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
// import { clusterApiUrl } from "@solana/web3.js";
// import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
// import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";
// import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { SessionProvider } from "next-auth/react";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import "@solana/wallet-adapter-react-ui/styles.css";

export function SolanaWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: switch to mainnet
  // const network = WalletAdapterNetwork.Mainnet;
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // const wallets = useMemo(
  //   () => [
  //     new PhantomWalletAdapter(),
  //     new BackpackWalletAdapter(),
  //     new SolflareWalletAdapter(),
  //   ],[]);

  return (
    <SessionProvider>
      <ConvexClientProvider>
        {/* <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect> */}
            {/* <WalletModalProvider> */}
              {children}
            {/* </WalletModalProvider> */}
          {/* </WalletProvider>
        </ConnectionProvider> */}
      </ConvexClientProvider>
    </SessionProvider>
  );
}

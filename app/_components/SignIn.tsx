"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { SignInButton } from "./SignInButton";

export function SignIn() {
  const { connected } = useWallet();

  return (
    <div className="flex items-center space-x-2">
      <WalletMultiButton className="[&_button]: bg-white text-black"/>
      {connected && <SignInButton />}
    </div>
  );
}

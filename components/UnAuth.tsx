import { Hero } from "./Hero";
import { useWallet } from "@solana/wallet-adapter-react";
import { SignInButton } from "@/app/_components/SignInButton";

export const UnAuth = () => {
  const { connected } = useWallet();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Hero />
      {connected ?
      <SignInButton />
      :
      <span className="mb-8 leading-tight tracking-tighter">
        connect your wallet to get started
      </span>}
    </div>
  );
};

import { Hero } from "./Hero";
import { useWallet } from "@solana/wallet-adapter-react";

export const UnAuth = () => {
  const { connected } = useWallet();
  return (
    <div className="min-h-screen flex flex-col items-center mx-auto mt-24">
      <Hero />
      {connected ?
      <span className="mb-8 leading-tight tracking-tighter">
        sign in to get started
      </span>
      :
      <span className="mb-8 leading-tight tracking-tighter">
        connect your wallet to get started
      </span>}
    </div>
  );
};

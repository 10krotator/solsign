import { Hero } from "./Hero";

export const UnAuth = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Hero />
      <span className="mb-8 leading-tight tracking-tighter">
        connect your wallet to get started
      </span>
    </div>
  );
};

"use client";

import { Button } from "@/components/ui/button";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const signIn = useAction(api.signin.createJWT);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9945FF] to-[#14F195] p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-4xl mx-auto bg-white rounded-md shadow-2xl overflow-hidden border-2 border-black">
        <div className="p-8 space-y-8">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter text-center mb-4">
            welcome to sollinked-e
          </h1>
          
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-md blur opacity-75 group-hover:opacity-100 transition duration-2000 group-hover:duration-400 animate-tilt"></div>
            <div className="relative p-6 bg-white rounded-sm border-2 border-black ">
              <h2 className="text-2xl font-semibold leading-tight tracking-tighter mb-4">featured posts</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#">the future of blockchain technology</a>
                </li>
                <li>
                  <a href="#">10 tips for successful crypto trading</a>
                </li>
                <li>
                  <a href="#">understanding solana's proof of history</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => {
                const newSignIn = signIn({ walletAddress: "0x123" });
                console.log(newSignIn);
              }}
            >
              Start Reading
            </Button>
            <Button
            >
              Create Account
            </Button>
          </div>
        </div>
      </main>

      <footer className="mt-8 text-center text-white">
        <p>&copy; 2024 sollinked-e. all rights reserved.</p>
      </footer>
    </div>
  );
}

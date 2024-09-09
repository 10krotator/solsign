"use client";

import { Button } from "@/components/ui/button";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const signIn = useAction(api.signin.createJWT);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9945FF] to-[#14F195] p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="p-8 space-y-8">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter text-[#9945FF] text-center mb-4">
            Welcome to Solana Blogs
          </h1>
          
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9945FF] to-[#14F195] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative p-6 bg-white rounded-lg">
              <h2 className="text-2xl font-semibold leading-tight tracking-tighter text-[#9945FF] mb-4">Featured Posts</h2>
              <ul className="space-y-2">
                <li className="text-gray-700 hover:text-[#14F195] transition-colors">
                  <a href="#">The Future of Blockchain Technology</a>
                </li>
                <li className="text-gray-700 hover:text-[#14F195] transition-colors">
                  <a href="#">10 Tips for Successful Crypto Trading</a>
                </li>
                <li className="text-gray-700 hover:text-[#14F195] transition-colors">
                  <a href="#">Understanding Solana's Proof of History</a>
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
              className="px-6 py-3 bg-[#9945FF] text-white rounded-full hover:bg-[#7B3FCC] transition-colors"
            >
              Start Reading
            </Button>
            <Button
              className="px-6 py-3 bg-[#14F195] text-white rounded-full hover:bg-[#10C77A] transition-colors"
            >
              Create Account
            </Button>
          </div>
        </div>
      </main>

      <footer className="mt-8 text-center text-white">
        <p>&copy; 2023 Solana Blogs. All rights reserved.</p>
      </footer>
    </div>
  );
}

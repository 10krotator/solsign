"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 leading-tight tracking-tighter">
        welcome to{" "}
        <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-transparent bg-clip-text">
          solana sign
        </span>
      </h1>
      {session ? (
        <div className="flex gap-4 justify-between">
          <Button>
            <Link href="/sign-document">Sign a Document</Link>
          </Button>
          <Button>
            <Link href="/upload-document">Upload Document</Link>
          </Button>
        </div>
      ) : (
        <span>please connect your wallet to get started</span>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Hero } from "@/components/Hero";
import { UnAuth } from "@/components/UnAuth";

export default function Home() {
  const { status } = useSession();

  if (status !== "authenticated") {
    return <UnAuth />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Hero />
      <div className="flex gap-4 justify-between">
        <Button>
          <Link href="/sign-document">Sign a Document</Link>
        </Button>
        <Button>
          <Link href="/upload-document">Upload Document</Link>
        </Button>
      </div>
    </div>
  );
}
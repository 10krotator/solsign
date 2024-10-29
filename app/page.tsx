"use client";

import { useAuth } from "@/app/context/auth";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Hero } from "@/components/Hero";
import { UnAuth } from "@/components/UnAuth";

export default function Home() {
  const { status } = useAuth();
  const router = useRouter();

  if (status !== "authenticated") {
    return <UnAuth />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center mx-auto mt-24">
      <Hero />
      <div className="flex gap-4 justify-between">
        <Button onClick={() => router.push("/sign-document")}>
          Sign a Document
        </Button>
        <Button onClick={() => router.push("/upload-document")}>Upload Document</Button>
      </div>
    </div>
  );
}
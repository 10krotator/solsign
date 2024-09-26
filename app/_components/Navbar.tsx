"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import { SignIn } from "./SignIn";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const pubkey = session?.user?.name || "";
  console.log(pubkey + " on navbar");

  return (
    <nav className=" p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <Logo />
        </Link>
        <div className="flex items-center">
          {session ? (
            <>
              <Button onClick={() => router.push("/")} className="mr-4">
                home
              </Button>
              <Button onClick={() => signOut()} className="mr-4">
                logout
              </Button>
              <span>{session?.user?.name}</span>
            </>
          ) : (
            <SignIn />
          )}
        </div>
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { SignIn } from "./SignIn";

export default function Navbar() {
  const { data: session } = useSession();
  const pubkey = session?.user?.name || "";
  console.log(pubkey + " on navbar");

  return (
    <nav className=" p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          solana sign
        </Link>
        <div>
          {session ? (
            <>
              <Link href="/dashboard" className="mr-4">
                Dashboard
              </Link>
              <button onClick={() => signOut()} className="mr-4">
                Sign Out
              </button>
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

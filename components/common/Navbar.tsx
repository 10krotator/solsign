"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import { StarIcon } from "lucide-react";
import { SignIn } from "./SignIn";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ThemeSwitcher";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="backdrop-blur-[2px] p-3 fixed top-2 left-80 right-10 z-50 rounded-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold mr-4">
            <Logo />
          </Link>
        </div>
        <div className="flex items-center">
          <div className="mr-4">
            <ModeToggle />
          </div>
          <SignIn />
          {session && (
            <>
              <Button onClick={() => router.push("/")} className="ml-4 mr-4" size="sm">
                home
              </Button>
              <Button onClick={() => router.push("/roadmap")} className="mr-4" size="sm">
                Roadmap
              </Button>
              <Button onClick={() => {}} className="mr-4 items-center justify-center" size="sm">
                points <StarIcon className="h-auto w-4 ml-1" />
              </Button>
              <Button onClick={() => signOut()} className="mr-4" size="sm">
                logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

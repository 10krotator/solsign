"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useState, useCallback } from "react";
import { signIn, useSession } from "next-auth/react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

export const SignInButton = () => {
  const { publicKey, connected, signMessage } = useWallet();
  const { data: session, update } = useSession();
  const createUser = useMutation(api.users.createUser);
  const getUser = useQuery(api.users.getUserByPublicKey, {
    pubkey: publicKey?.toBase58() || "",
  });
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = useCallback(async () => {
    if (publicKey && connected && !isSigningIn && !session) {
      setIsSigningIn(true);
      const message = `Signing in to solana sign with your wallet ${publicKey.toBase58()}`;
      const encodedMessage = new TextEncoder().encode(message);
      try {
        if (signMessage) {
          const signedMessage = await signMessage(encodedMessage);
          const signature = Buffer.from(signedMessage).toString("hex");

          if (getUser === undefined) {
            await createUser({
              publicKey: publicKey.toBase58(),
            });
          }

          // Sign in with NextAuth without redirecting
          const result = await signIn("credentials", {
            publicKey: publicKey.toBase58(),
            signature,
            message,
            redirect: false,
          });

          if (result?.error) {
            console.error("Sign-in failed:", result.error);
          } else {
            // Manually update the session
            await update();
          }
        }
      } catch (error) {
        console.error("Error signing message:", error);
      } finally {
        setIsSigningIn(false);
      }
    }
  }, [publicKey, connected, signMessage, getUser, isSigningIn, createUser, session, update]);

  if (!connected || session) {
    return null;
  }

  return (
    <Button onClick={handleSignIn} disabled={isSigningIn}>
      {isSigningIn ? "Signing In..." : "Sign In"}
    </Button>
  );
}
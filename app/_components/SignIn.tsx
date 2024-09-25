"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function SignIn() {
  const { publicKey, connected } = useWallet();
  const createUser = useMutation(api.users.createUser);
  const getUser = useQuery(api.users.getUserByPublicKey, {
    pubkey: publicKey?.toBase58() || "",
  });
  const [usrState, setUsrState] = useState<boolean>(true);

  useEffect(() => {
    if (connected && publicKey) {
      if (getUser === undefined) {
        setUsrState(false);
      }
      handleSignIn();
    }
  }, [publicKey, connected, getUser]);

  const handleSignIn = async () => {
    if (publicKey) {
      const message = `Sign this message for authenticating with your wallet ${publicKey?.toBase58()}`;
      const encodedMessage = new TextEncoder().encode(message);
      try {
        const signedMessage = await window.solana.signMessage(
          encodedMessage,
          "utf8",
        );
        const signature = Buffer.from(signedMessage.signature).toString("hex");
        // Check if user exists in Convex
        console.log(usrState);
        if (!usrState) {
          // Create new user if not exists
          await createUser({
            publicKey: publicKey.toBase58(),
          });
        }

        // Sign in with NextAuth
        await signIn("credentials", {
          publicKey: publicKey.toBase58(),
          signature,
          message,
          callbackUrl: "/dashboard",
        });
      } catch (error) {
        console.error("Error signing message:", error);
      }
    }
  };

  return (
    <div>
      <WalletMultiButton />
    </div>
  );
}

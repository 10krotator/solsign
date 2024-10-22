"use client";

import React from "react"

import { Button } from "@/components/ui/button";

import { Transaction, SystemProgram } from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

const AdminPage = () => {
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();
  const adminPubkey = process.env.NEXT_PUBLIC_ADMIN_PUBKEY;

  const signThis = async () => {
    if (!publicKey || !signTransaction) {
      console.log("Wallet not connected");
      return;
    }

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey,
          lamports: 100,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signed = await signTransaction(transaction);
      console.log("Transaction signed:", signed);

      // Optional: Send the transaction
      // const signature = await connection.sendRawTransaction(signed.serialize());
      // console.log("Transaction sent:", signature);

    } catch (error) {
      console.error("Error signing transaction:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold leading-tight tracking-tighter">admin page</h1>
      {publicKey?.toBase58() === adminPubkey ? (
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-4">
            <Button onClick={signThis}>Sign Transaction</Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-4">
            <span>you are not authorized to access this page</span>
          </div>
        </div>
        )
      }
    </div>
  )
}

export default AdminPage

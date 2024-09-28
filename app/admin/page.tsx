"use client";

import React from "react"

import { Button } from "@/components/ui/button";

import { Connection, Transaction, SystemProgram } from "@solana/web3.js";
import { clusterApiUrl } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

const AdminPage = () => {
  const { publicKey } = useWallet();
  const adminPubkey = "8fA9f3vcq9xxgavvQsCVSz399JGP96siRNHZHJGEfvsL";

  const signThis = () => {
    const signTransaction = async () => {
      if (window.solana && window.solana.isConnected) {
        try {
          const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
          const transaction = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: window.solana.publicKey,
              toPubkey: window.solana.publicKey,
              lamports: 100,
            })
          );
          const { blockhash } = await connection.getLatestBlockhash();
          transaction.recentBlockhash = blockhash;
          transaction.feePayer = window.solana.publicKey;

          const signed = await window.solana.signTransaction(transaction);
          console.log("Transaction signed:", signed);
        } catch (error) {
          console.error("Error signing transaction:", error);
        }
      } else {
        console.log("Solana wallet not connected");
      }
    };

    signTransaction();
  }

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
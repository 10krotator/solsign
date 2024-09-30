"use client";

import React from "react"
import { useWallet } from '@solana/wallet-adapter-react';

interface SignDocumentPageProps {
  params: {
    documentId: string;
  }
}

const SignDocumentPage = ({ params }: SignDocumentPageProps) => {
  const { documentId } = params;
  const { publicKey } = useWallet();

  return (
    <div>
      <h1>Sign Document Page</h1>
      <span>{publicKey?.toBase58()}</span>
      <p>Document ID: {documentId}</p>
    </div>
  )
}

export default SignDocumentPage
"use client";

import React from "react"
import { useWallet } from '@solana/wallet-adapter-react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { ButtonGradient } from "@/components/ui/button-gradient";
import { UnAuth } from "@/components/UnAuth";

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from "@/convex/_generated/dataModel";

interface SignDocumentPageProps {
  params: {
    documentId: string;
  }
}

const SignDocumentPage = ({ params }: SignDocumentPageProps) => {
  const { status } = useSession();
  const { documentId } = params;
  const { publicKey, signMessage } = useWallet();
  const pubkeyShort = publicKey?.toBase58().slice(0, 5) + "..." + publicKey?.toBase58().slice(-5);
  const document = useQuery(api.documents.getDocumentById, { documentId: documentId as Id<"documents"> });
  const writeSign = useMutation(api.documents.writeSignature);
  const router = useRouter();

  const handleSign = async () => {
    if (!publicKey || !signMessage || !document) return;

    try {
        const message = new TextEncoder().encode(`Signing document -- documentName: ${document.title}, documentId: ${documentId}, with pubkey: ${publicKey.toBase58()}`);
        const signature = await signMessage(message);
        writeSign({ pubkey: publicKey.toBase58(), signature: Buffer.from(signature).toString("hex") });
        // TODO: write signature to database
        alert('Document signed successfully!');
        router.push("/sign-document");
    } catch (error) {
        console.error('Error signing document:', error);
        alert('Failed to sign document.');
    }
};

  if (status !== "authenticated") {
    return <UnAuth />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2">
      <span className="text-3xl font-bold leading-tight tracking-tighter mb-8">sign document {document?.title}</span>
      <span>{publicKey?.toBase58()}</span>
      <p>document ID: {documentId}</p>
      <p>document title: {document?.title}</p>
      <ButtonGradient onClick={handleSign} className="mt-4">Sign Document as {pubkeyShort}</ButtonGradient>
    </div>
  )
}

export default SignDocumentPage
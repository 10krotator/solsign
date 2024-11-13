"use client";

import React, { useEffect, useState } from "react"
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from "next/navigation";

import { ButtonGradient } from "@/components/ui/button-gradient";
import { UnAuth } from "@/components/UnAuth";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PDFViewer from "@/components/common/PDFViewer";

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@/app/context/auth";

interface SignDocumentPageProps {
  params: Promise<{
    documentId: string;
  }>
}


const SignDocumentPage = ({ params }: SignDocumentPageProps) => {
  const { status } = useAuth();
  const resolvedParams = React.use(params);
  const { documentId } = resolvedParams;
  const { publicKey, signMessage } = useWallet();
  const [file, setFile] = useState<File | null>(null);
  const pubkeyShort = publicKey?.toBase58().slice(0, 5) + "..." + publicKey?.toBase58().slice(-5);
  const document = useQuery(api.documents.getDocumentById, { documentId: documentId as Id<"documents"> });
  const writeSign = useMutation(api.documents.writeSignature);
  const signatures = useQuery(api.documents.getSignatureByDocumentId, { documentId: documentId as Id<"documents"> });
  const router = useRouter();
  const fileUrl = useQuery(
    api.documents.getFileUrl,
    document?.storageId ? { storageId: document.storageId } : "skip"
  );

  useEffect(() => {
    const fetchFileFromUrl = async (url: string): Promise<File> => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new File([blob], document?.title || 'document.pdf', { type: blob.type });
    };

    if (fileUrl) {
      fetchFileFromUrl(fileUrl).then(setFile);
    }
  }, [fileUrl, document?.title]);

  const handleSign = async () => {
    if (!publicKey || !signMessage || !document) return;

    try {
        const message = new TextEncoder().encode(`Signing document -- documentName: ${document.title}, documentId: ${documentId}, with pubkey: ${publicKey.toBase58()}`);
        const signature = await signMessage(message);
        writeSign({ documentId: documentId as Id<"documents">, pubkey: publicKey.toBase58(), signature: Buffer.from(signature).toString("hex") });
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
    <div className="min-h-screen flex flex-col items-center gap-2 mx-auto mt-24">
      <span className="text-3xl font-bold leading-tight tracking-tighter mb-2">sign document <span className="text-primary italic text-purple-500">{document?.title}</span></span>
      <div className="flex flex-col gap-2">
        {file ? <PDFViewer file={file} /> : <Badge className="bg-red-500 text-white">file not found</Badge>}
      </div>
      <p>signers:</p>
      <div className="flex flex-col gap-2">
      {signatures && signatures.map((signature) => (
        <div key={signature._id} className="flex flex-row gap-2 font-semibold">
          <p>{signature.pubkey}</p>
          {signature.signature && <p><Check className="w-4 h-4 text-green-500" /></p>}
          </div>
        ))}
      </div>
      <ButtonGradient onClick={handleSign} className="mt-4">Sign Document as {pubkeyShort}</ButtonGradient>
    </div>
  )
}

export default SignDocumentPage
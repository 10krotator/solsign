"use client";

import React, { useEffect, useState, useCallback } from "react"
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from "next/navigation";

import { ButtonGradient } from "@/components/ui/button-gradient";
import { UnAuth } from "@/components/UnAuth";
import { Check, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PDFViewer from "@/components/common/PDFViewer";

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@/app/context/auth";
import { addSignatureToPdf } from "@/lib/pdf";
import { toast } from "sonner";

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
  const [signedFile, setSignedFile] = useState<File | null>(null);
  const pubkeyShort = publicKey?.toBase58().slice(0, 5) + "..." + publicKey?.toBase58().slice(-5);
  const document = useQuery(api.documents.getDocumentById, { documentId: documentId as Id<"documents"> });
  const writeSign = useMutation(api.documents.writeSignature);
  const signatures = useQuery(api.documents.getSignatureByDocumentId, { documentId: documentId as Id<"documents"> });
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  const router = useRouter();

  const fileUrl = useQuery(
    api.documents.getFileUrl,
    document?.storageId ? { storageId: document.storageId } : "skip"
  );

  const currentUserSignature = signatures?.find((signature) => signature.pubkey === publicKey?.toBase58());
  const signedFileUrl = useQuery(
    api.documents.getFileUrl,
    currentUserSignature?.signedStorageId ? { storageId: currentUserSignature.signedStorageId } : "skip"
  );

  const fetchFileFromUrl = useCallback(async (url: string, fileName: string): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  }, []);

  useEffect(() => {
    if (fileUrl) {
      fetchFileFromUrl(fileUrl, document?.title || 'document.pdf').then(setFile);
    }
  }, [fileUrl, document?.title, fetchFileFromUrl]);

  useEffect(() => {
    if (signedFileUrl) {
      fetchFileFromUrl(signedFileUrl, `signed_${document?.title || 'document.pdf'}`).then(setSignedFile);
    }
  }, [signedFileUrl, document?.title, fetchFileFromUrl]);

  const handleSign = async () => {
    if (!publicKey || !signMessage || !document || !file) return;

    try {
      const message = new TextEncoder().encode(`Signing document -- documentName: ${document.title}, documentId: ${documentId}, with pubkey: ${publicKey.toBase58()}`);
      const signature = await signMessage(message);
      const signatureHex = Buffer.from(signature).toString("hex");
      const signedPdf = await addSignatureToPdf(
        file,
        signatureHex,
        publicKey.toBase58()
      );
      setSignedFile(signedPdf);

      const uploadUrl = await generateUploadUrl({
        contentType: signedPdf.type,
      });

      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: {
            "Content-Type": signedPdf.type,
        },
        body: signedPdf,
      });
      console.log("result -->", result);

      if(!result.ok) {
          toast.error("Failed to store signed file");
          return;
      }

      const signedStorageId = await result.json();
      writeSign({
          documentId: documentId as Id<"documents">,
          pubkey: publicKey.toBase58(),
          signature: Buffer.from(signature).toString("hex"),
          signedStorageId: signedStorageId.storageId
        });
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

  const fileNotFound = () => {
    if (document?.storageId) {
      return <Loader2 className="h-4 w-4 animate-spin" />
    }
    else {
      return <Badge className="bg-red-500 text-white">file not found</Badge>
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center gap-2 mx-auto mt-24">
      <span className="text-3xl font-bold leading-tight tracking-tighter mb-2">sign document <span className="text-primary italic text-purple-500">{document?.title}</span></span>
      <div className="flex flex-col gap-2">
      {signedFile ? (
          <PDFViewer file={signedFile} />
        ) : file ? (
          <PDFViewer file={file} />
        ) : (
          fileNotFound()
        )}
      </div>
      <p>signers:</p>
      <div className="flex flex-col gap-2">
      {signatures && signatures.map((signature) => (
        <div key={signature._id} className="flex flex-row gap-2 font-semibold">
          <p>{signature.pubkey}</p>
          {signature.signature && <p className="flex flex-row items-center text-green-600 font-normal text-sm">signed <Check className="w-4 h-4" /></p>}
          </div>
        ))}
      </div>
      <ButtonGradient onClick={handleSign} className="mt-4">Sign Document as {pubkeyShort}</ButtonGradient>
    </div>
  )
}

export default SignDocumentPage
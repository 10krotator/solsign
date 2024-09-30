"use client";

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import DocumentUpload from '@/components/DocumentUpload';
import SignatureArea from '@/components/SignatureArea';
import { useSession } from "next-auth/react";
import { UnAuth } from "@/components/UnAuth";

export default function SignDocument() {
    const { status } = useSession();

    const [document, setDocument] = useState<File | null>(null);
    const { publicKey, signMessage } = useWallet();
    console.log(publicKey?.toBase58());

    const handleDocumentUpload = (file: File) => {
        setDocument(file);
    };

    const handleSign = async () => {
        if (!publicKey || !signMessage || !document) return;

        try {
            const message = new TextEncoder().encode(`Sign document -- documentName: ${document.name}, documentSize: ${document.size}`);
            const signature = await signMessage(message);
            console.log('Document signed:', signature);
            // Here you would typically send the signature to your backend
            alert('Document signed successfully!');
        } catch (error) {
            console.error('Error signing document:', error);
            alert('Failed to sign document.');
        }
    };

    if (status !== "authenticated") {
        return <UnAuth />;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter mb-8">sign your document</h1>
            <WalletMultiButton className="mb-8" />
            <div className="flex flex-col gap-4">
                {publicKey ? (
                <>
                <DocumentUpload onUpload={handleDocumentUpload} />
                    {document && <SignatureArea onSign={handleSign} />}
                </>
                ) : (
                    <p className="text-zinc-600 dark:text-zinc-400">Please connect your wallet to sign documents.</p>
                )}
            </div>
        </div>
    );
}
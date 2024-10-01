"use client";

import { useWallet } from '@solana/wallet-adapter-react';

import { useSession } from "next-auth/react";
import Link from 'next/link';
import { UnAuth } from "@/components/UnAuth";

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function SignDocument() {
    const { status } = useSession();

    const { publicKey } = useWallet();
    console.log(publicKey?.toBase58());
    const signatures = useQuery(api.documents.getDocumentByPubkey, { pubkey: publicKey?.toBase58() as string });
    console.log(signatures);

    if (status !== "authenticated") {
        return <UnAuth />;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter mb-8">sign your document</h1>
            <div className="flex flex-col gap-4">
                {publicKey ? (
                <>
                    {signatures?.map((signature) => (
                        <div key={signature._id}>
                            <Link href={`/sign-document/${signature.documentId}`} className="text-blue-500 hover:underline">{signature.documentId}</Link>
                        </div>
                    ))}
                </>
                ) : (
                    <p className="text-zinc-600 dark:text-zinc-400">please connect your wallet to sign documents.</p>
                )}
            </div>
        </div>
    );
}
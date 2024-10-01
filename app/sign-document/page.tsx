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
    const docs = useQuery(api.documents.getDocs);
    console.log(signatures);

    if (status !== "authenticated") {
        return <UnAuth />;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter mb-8">select document to sign</h1>
            <div className="flex flex-col gap-1">
                {publicKey ? (
                <>
                    {signatures ? signatures?.map((signature) => (
                        <div key={signature._id} className="grid grid-cols-2">
                            <Link href={`/sign-document/${signature.documentId}`} className="text-blue-500 hover:underline">{docs?.find((doc) => doc._id === signature.documentId)?.title}</Link>
                            <span>{signature.documentId}</span>
                        </div>
                    )):
                    <span>looks like you don&apos;t have any documents to sign.</span>}
                </>
                ) : (
                    <span>connect your wallet to view your documents</span>
                )}
            </div>
        </div>
    );
}
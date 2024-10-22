"use client";

import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import Link from 'next/link';
import { UnAuth } from "@/components/UnAuth";
import { Check } from 'lucide-react';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function SignDocument() {
    const { status } = useSession();
    const router = useRouter();

    const { publicKey } = useWallet();
    console.log(publicKey?.toBase58());
    const signatures = useQuery(api.documents.getDocumentByPubkey, { pubkey: publicKey?.toBase58() as string });
    const docs = useQuery(api.documents.getDocs);

    // FIXME: this gets triggered coz there's a delay in the hook execution & homepage is mounted first
    if (!publicKey) {
        setTimeout(() => {
            router.push("/");
        }, 1000);
    }

    if (status !== "authenticated") {
        return <UnAuth />;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center mx-auto">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter mb-8">select document to sign</h1>
            <div className="flex flex-col gap-1">
                {publicKey ? (
                <>
                    <div className="grid grid-cols-3 gap-4">
                        <span className="font-bold">title</span>
                        <span className="font-bold">id</span>
                        <span className="font-bold">signed</span>
                    </div>
                    <hr className="w-full" />
                    {signatures ? signatures?.map((signature) => (
                        <div key={signature._id} className="grid grid-cols-3 gap-4">
                            <Link href={`/sign-document/${signature.documentId}`} className="text-blue-500 hover:underline">{docs?.find((doc) => doc._id === signature.documentId)?.title}</Link>
                            <span>{signature.documentId}</span>
                            {signature.signature && (
                                <span className="flex items-center">
                                    <span>{signature.signature.slice(0, 5)}...{signature.signature.slice(-5)}</span>
                                    <Check className="w-4 h-4 text-green-500 ml-1" />
                                </span>
                            )}
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
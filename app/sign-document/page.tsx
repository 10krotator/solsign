"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { UnAuth } from "@/components/UnAuth";
import { Check } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/app/context/auth";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function SignDocument() {
    const { status } = useAuth();
    const { publicKey } = useWallet();
    const signatures = useQuery(api.documents.getDocumentByPubkey, { pubkey: publicKey?.toBase58() as string });
    const docs = useQuery(api.documents.getDocs);

    if (status !== "authenticated") {
        return <UnAuth />;
    }

    return (
        <div className="h-screen overflow-y-auto">
            <div className="container flex flex-col items-center mx-auto py-24 px-4">
                <h1 className="text-3xl font-bold leading-tight tracking-tighter mb-8">select document to sign</h1>
                {publicKey ? (
                    signatures && signatures.length > 0 ? (
                        <div className="w-full max-w-3xl">
                            <Table className="max-w-3xl w-full bg-primary/5 p-4 rounded-lg">
                                <TableHeader className="bg-primary/10">
                                    <TableRow>
                                        <TableHead>title</TableHead>
                                        <TableHead className="hidden md:table-cell">id</TableHead>
                                        <TableHead>status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {signatures.map((signature) => (
                                        <TableRow key={signature._id}>
                                            <TableCell>
                                                <Link href={`/sign-document/${signature.documentId}`} className="text-blue-500 hover:underline">
                                                    {docs?.find((doc) => doc._id === signature.documentId)?.title}
                                                </Link>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {signature.documentId}
                                            </TableCell>
                                            <TableCell>
                                                {signature.signature && (
                                                    <span className="flex items-center">
                                                        <span className="hidden md:inline">{signature.signature.slice(0, 5)}...{signature.signature.slice(-5)}</span>
                                                        <Check className="w-4 h-4 text-green-500 ml-1" />
                                                    </span>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <span>looks like you don&apos;t have any documents to sign.</span>
                    )
                ) : (
                    <span>connect your wallet to view your documents</span>
                )}
            </div>
        </div>
    );
}
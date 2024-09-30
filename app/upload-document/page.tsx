'use client'

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useSession } from "next-auth/react";
import { UnAuth } from "@/components/UnAuth";
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useWallet } from '@solana/wallet-adapter-react';

const UploadDocumentPage = () => {
    const { status } = useSession();
    const { publicKey } = useWallet();
    const [title, setTitle] = useState<string>('');
    const [walletAddresses, setWalletAddresses] = useState<string[]>(['']);
    const setDocTitle = useMutation(api.documents.createDocument);

    const addWalletInput = () => {
        setWalletAddresses([...walletAddresses, '']);
    };

    const removeWalletInput = (index: number) => {
        const updatedAddresses = walletAddresses.filter((_, i) => i !== index);
        setWalletAddresses(updatedAddresses.length ? updatedAddresses : ['']);
    };

    const handleWalletChange = (index: number, value: string) => {
        const updatedAddresses = [...walletAddresses];
        updatedAddresses[index] = value;
        setWalletAddresses(updatedAddresses);
    };

    const handleSubmit = async () => {
        try {
            await setDocTitle({ title: title, creator: publicKey?.toString() || '' });
            console.log('Document title set successfully');
        } catch (error) {
            console.error('Error setting document title:', error);
        }
    };

    if (status !== "authenticated") {
        return <UnAuth />;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter mb-8">upload document</h1>
            <div className="flex flex-col gap-2 w-full max-w-md mb-8">
                <span className="leading-tight tracking-tighter">document title</span>
                <Input
                    type="text"
                    placeholder="Enter document title"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-2 w-full max-w-md">
                <h1 className="text-3xl font-bold leading-tight tracking-tighter">add wallets to sign the document</h1>
                <div className="flex flex-col gap-2">
                    {walletAddresses.map((address, index) => (
                        <div key={index} className="flex gap-2">
                            <Input
                                type="text"
                                placeholder="Enter wallet address"
                                value={address}
                                onChange={(e) => handleWalletChange(index, e.target.value)}
                            />
                            {walletAddresses.length > 1 && (
                                <Button onClick={() => removeWalletInput(index)} variant="destructive">
                                    <Trash2 size={16} />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-2">
                    <Button onClick={addWalletInput} className="w-fit">Add Another Wallet</Button>
                </div>
            </div>
            <Button onClick={handleSubmit} className="mt-2 w-fit justify-end">create document</Button>
        </div>
    );
};

export default UploadDocumentPage;
'use client'

import { useState, FormEvent } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

import { useSession } from "next-auth/react";
import { UnAuth } from "@/components/UnAuth";
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'sonner';

const UploadDocumentPage = () => {
    const { status } = useSession();
    const { publicKey } = useWallet();
    const [title, setTitle] = useState<string>('');
    const [walletAddresses, setWalletAddresses] = useState<string[]>(['']);
    const createDocument = useMutation(api.documents.createDocument);

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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createDocument({ title: title, creator: publicKey?.toString() || '', pubkeys: walletAddresses });
            console.log('Document created successfully');
            // Reset form or redirect user
            setTitle('');
            setWalletAddresses(['']);
            // Show success message using toast
            toast.success('Document created successfully');
        } catch (error) {
            console.error('Error creating document:', error);
        }
    };

    if (status !== "authenticated") {
        return <UnAuth />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 mt-10">
            <div className="w-full max-w-md bg-secondary rounded-lg shadow-md p-8">
                <span className="text-3xl font-bold leading-tight tracking-tighter mb-6 text-center">upload document</span>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-medium leading-tight tracking-tighter">
                            document title
                        </Label>
                        <Input
                            id="title"
                            type="text"
                            placeholder="Enter document title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-4">
                        <span className="text-xl font-bold leading-tight tracking-tighter mb-2">add wallets to sign the document</span>
                        {walletAddresses.map((address, index) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    type="text"
                                    placeholder="Enter wallet address"
                                    value={address}
                                    onChange={(e) => handleWalletChange(index, e.target.value)}
                                    required
                                    className="flex-grow"
                                />
                                {walletAddresses.length > 1 && (
                                    <Button type="button" onClick={() => removeWalletInput(index)} variant="destructive" className="shrink-0">
                                        <Trash2 size={16} />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button type="button" onClick={addWalletInput} className="w-full">Add Another Wallet</Button>
                    </div>
                    <Button type="submit" className="w-full">Create Document</Button>
                </form>
            </div>
        </div>
    );
};

export default UploadDocumentPage;
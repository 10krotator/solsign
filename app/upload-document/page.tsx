'use client'

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const UploadDocumentPage = () => {
    const [walletAddresses, setWalletAddresses] = useState<string[]>(['']);

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

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter mb-8">upload document</h1>

            <div className="flex flex-col gap-4 w-full max-w-md">
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
        </div>
    );
};

export default UploadDocumentPage;
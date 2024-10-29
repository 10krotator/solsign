'use client'

import { useState, FormEvent } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

import { UnAuth } from "@/components/UnAuth";

import { UploadComponent } from "./_components/UploadComponent";
import { WalletAddressInputs } from "./_components/WalletAddressInputs";
import { Button } from "@/components/ui/button";

const UploadDocumentPage = () => {
    const { status } = useAuth();
    const router = useRouter();
    const { publicKey } = useWallet();
    const [walletAddresses, setWalletAddresses] = useState<string[]>(['']);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const createDocument = useMutation(api.documents.createDocument);

    const handleFileSelect = (file: File | null) => {
        setSelectedFile(file);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedFile) {
            toast.error('Please select a file to upload');
            return;
        }

        try {
            const fileBase64 = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = error => reject(error);
            });

            const base64Content = fileBase64.split(',')[1];
            console.log(base64Content);

            await createDocument({
                title: selectedFile.name,
                creator: publicKey?.toString() || '',
                pubkeys: walletAddresses,
                // TODO: write file content to database
                // fileContent: base64Content,
                // fileName: selectedFile.name
            });

            setWalletAddresses(['']);
            setSelectedFile(null);
            toast.success('Document created successfully');
            router.push("/");
        } catch (error) {
            console.error('Error creating document:', error);
            toast.error('Error creating document');
        }
    };

    if (status !== "authenticated") {
        return <UnAuth />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 mt-10 mx-auto">
            <div className="w-full max-w-md bg-muted rounded-lg shadow-md p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <UploadComponent onFileSelect={handleFileSelect} />
                    <WalletAddressInputs walletAddresses={walletAddresses} setWalletAddresses={setWalletAddresses} />
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </div>
    );
};

export default UploadDocumentPage;
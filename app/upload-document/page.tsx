"use client";

import { useState, FormEvent } from "react";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { getSignerWebIrys } from "@/lib/web_irys";

import { Button } from "@/components/ui/button";
import { UploadComponent } from "./_components/UploadComponent";
import { Card, CardDescription, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { WalletAddressInputs } from "./_components/WalletAddressInputs";
import { UnAuth } from "@/components/UnAuth";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Dynamically import react-pdf components
const PDFViewer = dynamic(() => import('@/components/common/PDFViewer'), {
    ssr: false
});

const UploadDocumentPage = () => {
    const { status } = useAuth();
    const router = useRouter();
    const wallet = useWallet();
    const { publicKey } = useWallet();
    const [walletAddresses, setWalletAddresses] = useState<string[]>(['']);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [useIrys, setUseIrys] = useState(false);
    const createDocument = useMutation(api.documents.createDocument);
    const generateUploadUrl = useMutation(api.documents.generateUploadUrl);

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
            const uploadUrl = await generateUploadUrl({
                contentType: selectedFile.type,
            });

            const result = await fetch(uploadUrl, {
                method: "POST",
                headers: {
                    "Content-Type": selectedFile.type,
                },
                body: selectedFile,
            });

            if(!result.ok) {
                toast.error("Failed to upload file");
                return;
            }

            const storageId = await result.json();

            const irys = await getSignerWebIrys(wallet);
            if (!irys) {
                toast.error('Failed to get signer web irys');
                return;
            }

            let fileId = '';
            if (useIrys) {
                // Upload file to Irys
                const fileBuffer = await selectedFile.arrayBuffer();
                const tags = [
                { name: 'Content-Type', value: selectedFile.type },
                { name: 'App-Name', value: 'SolSign' },
                { name: 'Title', value: selectedFile.name }
            ];

                // Convert ArrayBuffer to File object
                const file = new File([fileBuffer], selectedFile.name, { type: selectedFile.type });
                const receipt = await irys.uploadFile(file, { tags });
                fileId = receipt.id;
                console.log(fileId);
            }

            await createDocument({
                title: selectedFile.name,
                creator: publicKey?.toString() || '',
                pubkeys: walletAddresses,
                irysFileId: fileId || '',
                storageId: storageId.storageId,
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
        <div className="flex-1 relative overflow-y-auto h-full w-full">
            <div className="flex flex-col items-center p-4 gap-4 pb-20">
                {selectedFile && (
                    <PDFViewer file={selectedFile} />
                )}
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold leading-tight tracking-tighter">upload document</CardTitle>
                        <CardDescription>
                            upload a document and add wallet addresses for signing
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <UploadComponent onFileSelect={handleFileSelect} />
                            <WalletAddressInputs
                                walletAddresses={walletAddresses}
                                setWalletAddresses={setWalletAddresses}
                            />
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="irys-upload" className="flex flex-1 font-semibold">
                                    upload to Irys (Permanent Storage)
                                </Label>
                                <Switch
                                    id="irys-upload"
                                    checked={useIrys}
                                    onCheckedChange={setUseIrys}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                upload document
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UploadDocumentPage;
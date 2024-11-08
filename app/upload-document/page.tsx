"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth";
import { useWallet } from "@solana/wallet-adapter-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { UploadComponent } from "./_components/UploadComponent";
import { Card, CardDescription, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { WalletAddressInputs } from "./_components/WalletAddressInputs";
import { UnAuth } from "@/components/UnAuth";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const UploadDocumentPage = () => {
    const { status } = useAuth();
    const router = useRouter();
    const { publicKey } = useWallet();
    const [walletAddresses, setWalletAddresses] = useState<string[]>(['']);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
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

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    if (status !== "authenticated") {
        return <UnAuth />;
    }

    return (
        <div className="flex flex-col items-center min-h-screen p-4 mt-24 mx-auto">
            {selectedFile && (
                <div className="mt-8 max-h-[350px] overflow-y-auto border rounded-lg p-4">
                    <Document
                        file={selectedFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>
                    <div className="flex justify-center items-center gap-4 mt-2 sticky bottom-0 bg-background/50 backdrop-blur-sm p-2">
                        <Button
                            disabled={pageNumber <= 1}
                            onClick={() => setPageNumber(pageNumber - 1)}
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <p>
                            Page {pageNumber} of {numPages}
                        </p>
                        <Button
                            disabled={pageNumber >= (numPages || 0)}
                            onClick={() => setPageNumber(pageNumber + 1)}
                        >
                            <ArrowRight />
                        </Button>
                    </div>
                </div>
            )}
            <br />
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
                        <Button type="submit" className="w-full">
                            upload document
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UploadDocumentPage;
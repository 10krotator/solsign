import { useState } from 'react';

interface DocumentUploadProps {
    onUpload: (file: File) => void;
}

export default function DocumentUpload({ onUpload }: DocumentUploadProps) {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
    } else if (e.type === "dragleave") {
        setDragActive(false);
    }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onUpload(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            onUpload(e.target.files[0]);
        }
    };

    return (
        <div
            className={`w-full max-w-md p-4 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
                dragActive ? 'border-primary bg-primary/10' : 'border-zinc-300 dark:border-zinc-700'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
    >   
        <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleChange}
        accept=".pdf,.doc,.docx"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
            <p className="text-zinc-600 dark:text-zinc-400">
                Drag and drop your document here, or click to select
            </p>
        </label>
        </div>
    );
}
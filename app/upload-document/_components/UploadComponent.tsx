'use client'

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

interface UploadComponentProps {
  onFileSelect: (file: File | null) => void;
}

export const UploadComponent = ({ onFileSelect }: UploadComponentProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0); // New state for upload progress

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
    onFileSelect(file);

    // Simulate file upload progress
    if (file) {
      simulateFileUpload();
    } else {
      setUploadProgress(0);
    }
  };

  const simulateFileUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold leading-tight tracking-tighter mb-8">upload</h1>
      <span className="text-lg font-semibold leading-tight tracking-tight">upload a document to sign</span>
      <Input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        className="w-full file:bg-blue-600 file:rounded-sm file:text-white file:cursor-pointer"
      />
      {selectedFile && (
        <div className="text-sm font-light mt-4">
          <p>selected file: {selectedFile.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <p>upload progress: {uploadProgress}%</p>
          </div>
          <Progress value={uploadProgress} className="w-full mt-2 h-2" />
        </div>
      )}
    </div>
  );
};
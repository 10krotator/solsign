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
      <span className="text-2xl font-semibold leading-tight tracking-tighter mb-6 text-center">upload document</span>
      <Input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        className="w-full mt-2 file:bg-blue-500 file:rounded-sm file:text-white file:cursor-pointer"
      />
      {selectedFile && (
        <div className="text-sm font-light mt-4">
          <p>selected file: {selectedFile.name}</p>
          <Progress value={uploadProgress} className="w-full mt-2 h-2" />
          <div className="flex items-center gap-2 mt-1">
            <p className="text-black">upload progress: {uploadProgress}%</p>
          </div>
        </div>
      )}
    </div>
  );
};
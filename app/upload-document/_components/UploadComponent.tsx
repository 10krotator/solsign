'use client'

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';

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
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="file-upload">Upload Document</Label>
        <Input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="w-full cursor-pointer"
        />
      </div>
      {selectedFile && (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            Selected file: {selectedFile.name}
          </div>
          <div className="text-sm text-muted-foreground">
            Upload progress: {uploadProgress}%
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}
    </div>
  );
};
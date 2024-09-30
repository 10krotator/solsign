'use client'

import { useState } from 'react';
import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

interface UploadComponentProps {
  onFileSelect: (file: File | null) => void;
}

export const UploadComponent = ({ onFileSelect }: UploadComponentProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
    onFileSelect(file);
  };

  return (
    <div>
      {/* <Label htmlFor="file-upload" className="text-sm font-medium leading-tight tracking-tighter">
        Upload Document
      </Label> */}
      <span className="text-2xl font-bold leading-tight tracking-tighter mb-6 text-center">upload document</span>
      <Input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        className="w-full mt-2 file:bg-blue-500 file:rounded-sm file:text-white file:cursor-pointer"
      />
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
    </div>
  );
};
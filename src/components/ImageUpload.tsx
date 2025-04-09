
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { UploadCloud, X } from 'lucide-react';

interface ImageUploadProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  imageUrl, 
  onImageChange,
  label = "Question Image"
}) => {
  const [preview, setPreview] = useState<string | null>(imageUrl || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // For simplicity, we're using a data URL. In a production app,
    // you would upload this to your server or cloud storage.
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      onImageChange(result);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setPreview(null);
    onImageChange('');
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {!preview ? (
        <div className="border border-dashed border-gray-300 rounded-md p-6">
          <div className="flex flex-col items-center justify-center space-y-2">
            <UploadCloud className="h-8 w-8 text-muted-foreground" />
            <div className="text-sm text-muted-foreground text-center">
              Drag and drop an image, or click to select
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('image-upload')?.click()}
              type="button"
            >
              Select Image
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img 
            src={preview} 
            alt="Preview" 
            className="max-h-64 rounded-md mx-auto border border-gray-200" 
          />
          <Button
            size="sm"
            variant="outline"
            className="absolute top-2 right-2 h-8 w-8 p-0"
            onClick={clearImage}
            type="button"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

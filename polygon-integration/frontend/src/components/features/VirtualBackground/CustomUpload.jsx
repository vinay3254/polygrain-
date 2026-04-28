import { useState } from 'react';
import { Upload, Image } from 'lucide-react';
import Button from '../../ui/Button';

export default function CustomUpload({ onUpload }) {
  const [preview, setPreview] = useState(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="p-4 space-y-4">
      <label className="block">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="bg-upload"
        />
        <div className="glass-card rounded-xl aspect-video cursor-pointer hover:bg-app-surface transition-colors flex flex-col items-center justify-center gap-3">
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
          ) : (
            <>
              <Upload size={40} className="text-app-primary" />
              <p className="text-sm text-gray-400">Click to upload image</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </>
          )}
        </div>
      </label>
      
      {preview && (
        <Button variant="ghost" onClick={() => {setPreview(null); onUpload(null);}}>
          Remove Image
        </Button>
      )}
    </div>
  );
}

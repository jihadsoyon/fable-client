 "use client";

import { useState } from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { uploadToImgbb } from "@/lib/uploadToImgbb";
import toast from "react-hot-toast";

export default function CoverImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file!");
      return;
    }

    setUploading(true);
    try {
      const url = await uploadToImgbb(file);
      onChange(url);
    } catch (error) {
      toast.error(error.message || "Cover image upload failed!");
    } finally {
      setUploading(false);
      e.target.value = ""; // allow re-selecting the same file
    }
  };

  if (value) {
    return (
      <div className="relative h-48 w-36 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
        <Image src={value} alt="Cover preview" fill className="object-cover" />
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
          aria-label="Remove cover image"
        >
          <X size={13} />
        </button>
      </div>
    );
  }

  return (
    <label className="flex h-48 w-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 text-center text-xs text-gray-500 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-gray-700 dark:text-gray-400">
      {uploading ? (
        <Loader2 size={22} className="animate-spin" />
      ) : (
        <>
          <UploadCloud size={22} />
          <span className="px-2">Upload cover image</span>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="hidden"
      />
    </label>
  );
}
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
      <div className="relative h-48 w-36 overflow-hidden rounded-lg border border-gold-600/20 dark:border-gold-600/20">
        <Image src={value} alt="Cover preview" fill className="object-cover" />
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-1.5 top-1.5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-ink-900/60 text-white transition-colors hover:bg-ink-900/80"
          aria-label="Remove cover image"
        >
          <X size={13} />
        </button>
      </div>
    );
  }

  return (
    <label className="flex h-48 w-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-parchment-300 text-center font-body text-xs text-ink-700/70 transition-colors hover:border-gold-400 hover:text-gold-600 dark:border-ink-700 dark:text-parchment-200/70">
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
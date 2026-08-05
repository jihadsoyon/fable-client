
"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";
import { uploadToImgbb } from "@/lib/uploadToImgbb";
import toast from "react-hot-toast";

export default function AvatarUpload({ value, onChange, fallbackText }) {
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
      toast.success("Photo uploaded!");
    } catch (error) {
      toast.error(error.message || "Image upload failed!");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <label className="group relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full">
      {value ? (
        <Image
          src={value}
          alt="Profile photo"
          fill
          className="rounded-full object-cover ring-2 ring-gold-400/30"
        />
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-100 font-display text-2xl font-bold text-gold-700 dark:bg-gold-500/20 dark:text-gold-400">
          {fallbackText}
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-ink-900/0 transition-colors group-hover:bg-ink-900/40">
        {uploading ? (
          <Loader2 size={20} className="animate-spin text-white" />
        ) : (
          <Camera
            size={18}
            className="text-white opacity-0 transition-opacity group-hover:opacity-100"
          />
        )}
      </div>

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
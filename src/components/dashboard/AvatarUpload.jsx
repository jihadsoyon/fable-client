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
          className="rounded-full object-cover"
        />
      ) : (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 text-2xl font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-400">
          {fallbackText}
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 transition-colors group-hover:bg-black/40">
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
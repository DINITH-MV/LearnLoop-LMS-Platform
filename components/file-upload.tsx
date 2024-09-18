"use client";

import toast from "react-hot-toast";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
};

export const FileUpload = ({
  onChange,
  endpoint
}: FileUploadProps) => {
  return (
    <>
    <UploadDropzone
    className="bg-gradient-to-br from-[#ff3a96] via-[#8c1ff7] to-[#511aea] 
    ut-label:text-2xl 
    ut-button:text-[24pt] 
    w-[700px] rounded-[26px] text-center mx-auto"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
    />
    
    </>
  )
}
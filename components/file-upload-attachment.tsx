"use client";

import toast from "react-hot-toast";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
};

export const FileUploadAttachment = ({
  onChange,
  endpoint
}: FileUploadProps) => {
  return (
    <UploadDropzone
    className="bg-gradient-to-br from-[#ff3a96] via-[#8c1ff7] to-[#511aea] 
    ut-upload-icon:text-[#fff] h-[380px]
    ut-label:text-[18pt] ut-label:text-[#fff] ut-label:w-[400px] ut-label:mb-[16px]    
    ut-allowed-content:text-[16pt] ut-allowed-content:text-[#fff] ut-allowed-content:mb-[24px]  
    ut-button:text-[17pt] ut-button:w-[150px] ut-button:bg-gradient-to-tl ut-button:from-[#896fffe3] ut-button:to-[#ea1aba] ut-button:rounded-[12px] 
    w-[500px] rounded-[26px] text-center mx-auto
    border-white border-[3px]
    "
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
    />
  )
}
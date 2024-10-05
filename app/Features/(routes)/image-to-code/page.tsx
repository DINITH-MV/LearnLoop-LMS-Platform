"use client";

import * as z from "zod";
import axios from "axios";
import { ImageIcon, PlusCircle, PlusIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { FileUpload } from "@/components/file-upload";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export default function ImageToCode() {
  const [submittedImageUrl, setSubmittedImageUrl] = useState<string | null>(
    null
  );
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      toast.success("Image uploaded");
      setSubmittedImageUrl(values.imageUrl);
      generateCode(values.imageUrl);
    } catch {
      toast.error("Something went wrong");
    }
  };

  const generateCode = async (imageUrl: string) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/imageToCode", { imageUrl });
      if (response) {
        console.log(response);
        setGeneratedCode(response.data.message.content);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error generating code:", error);
      toast.error("Error generating code");
    } finally {
      setLoading(false);
    }
  };

  const handleNewImageUpload = () => {
    // Reset the form and state to allow uploading a new image
    setSubmittedImageUrl(null);
    setGeneratedCode(null);
  };

  return (
    <div className="gap-4 mt-[-10px] mx-[300px] bg-[#fbf6f2] h-[300%]">
      {/* Header */}
      <div className="text-center pt-[40px] mb-[20px] font-bold text-[30pt]">
        IMAGE TO CODE ANALYZER
      </div>

      {/* Drag and Drop Upload Area */}
      <div className="min-h-[600px] flex items-center justify-center flex-col">
        <div className="bg-[#efefef] px-[30px] py-[65px] rounded-[41px] border-[#fff] border-[5px] h-[490px] w-[800px] text-center mx-auto">
          {!submittedImageUrl ? (
            <div className="border mt-[-40px]">
              <FileUpload
                endpoint="imageToCode"
                onChange={(url) => {
                  if (url) {
                    onSubmit({ imageUrl: url });
                  }
                }}
                
              />
              <div className="text-[15px] text-muted-foreground mt-4 text-red-400 tracking-wide font-medium text-center">
                Blur image not recommended
              </div>
            </div>
          ) : (
            <div className="relative h-[360px] mt-[-30px]">
              <Image
                src={submittedImageUrl}
                alt="Submitted Image"
                className="object-cover rounded-[24px]"
                width={720}
                height={300}
              />
              {/* New Button for Uploading a New Image */}
              <div className="absolute top-[-15px] right-[-10px]">
                <button
                  onClick={handleNewImageUpload}
                  className="bg-gradient-to-tl from-[#896fffe3] to-[#ea1aba] text-[14pt] border-[4px] border-white w-[190px] h-[55px] rounded-[20px] text-white"
                >
                  {" "}
                  Upload New Image
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Generated Code Output */}
        <div className="w-[800px]">
          {generatedCode ? (
            <div className="px-[40px] py-[30px] mt-[10px] border-[#fff] border-[5px] rounded-[37px] min-h-[200px] text-[18px] bg-[#efefef]">
              <pre>{generatedCode}</pre>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

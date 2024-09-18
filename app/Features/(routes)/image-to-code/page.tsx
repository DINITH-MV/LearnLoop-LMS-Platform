"use client";

import * as z from "zod";
import axios from "axios";
import { ImageIcon } from "lucide-react";
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
  const [submittedImageUrl, setSubmittedImageUrl] = useState<string | null>(null);
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
    <div className="gap-4 mt-[-10px] mb-8 mx-[300px]">
      {/* Header */}
      <div className="text-center pt-[40px] mb-[40px] font-bold text-[30pt]">
        IMAGE TO CODE ANALYZER
      </div>

      {/* Drag and Drop Upload Area */}
      <div className="bg-[#efefef] p-[30px] rounded-[41px]">
        {!submittedImageUrl ? (
          <div>
            <FileUpload
              endpoint="imageToCode"
              onChange={(url) => {
                if (url) {
                  onSubmit({ imageUrl: url });
                }
              }}
            />
            <div className="text-xs text-muted-foreground mt-4 text-red-400 tracking-wide font-medium">
              Blur image not recommended
            </div>
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              src={submittedImageUrl}
              alt="Submitted Image"
              className="object-cover rounded-md"
              width={400}
              height={300}
            />
          </div>
        )}
      </div>

      {/* Generated Code Output */}
      <div>
        {generatedCode ? (
          <div className="overflow-auto mb-8 p-5 border border-dashed border-black rounded-md">
            <pre>{generatedCode}</pre>

            {/* New Button After Code Generation */}
            <div className="mt-4 flex justify-center">
              <Button onClick={handleNewImageUpload} className="bg-blue-500 text-white">
                Upload New Image
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-5 border border-dashed border-black rounded-md">
            <pre>Code Line Here</pre>
            {loading ? (
              <div className="space-y-2 mt-2">
                <Skeleton className="h-4 w-[550px] bg-slate-400" />
                <Skeleton className="h-4 w-[500px] bg-slate-400" />
                <Skeleton className="h-4 w-[525px] bg-slate-400" />
                <Skeleton className="h-4 w-[450px] bg-slate-400" />
                <Skeleton className="h-4 w-[500px] bg-slate-400" />
                <Skeleton className="h-4 w-[550px] bg-slate-400" />
                <Skeleton className="h-4 w-[400px] bg-slate-400" />
              </div>
            ) : (
              <div>Upload an image to generate the code.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

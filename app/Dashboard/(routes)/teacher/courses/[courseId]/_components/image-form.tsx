"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { FileUploadCourses } from "@/components/file-upload-courses";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 w-[500px] rounded-md p-4">
      <div className="font-medium text-[14pt] flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>
              <p className="text-[14pt]">Cancel</p>
            </>
          )}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-3 w-3 mr-2 " />
              <p className="text-[14pt]">Add an image</p>
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-3 w-3 mr-2" />
              <p className="text-[14pt]">Edit image</p>
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md mt-[20px]">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-[20px]">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUploadCourses
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};

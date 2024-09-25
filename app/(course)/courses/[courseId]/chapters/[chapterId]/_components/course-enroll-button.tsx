"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`, {
        courseId,
      });

      // Log the response to ensure it has the expected format
      console.log("Response:", response.data);

      // Check if response has a URL
      if (response.data.url) {
        window.location.assign(response.data.url);
      } else {
        throw new Error("No URL returned from the API");
      }
    } catch (error) {
      // Log the error to understand why it failed
      console.error("Error:", error);
      if (axios.isAxiosError(error)) {
        // Axios-specific error handling
        console.error("Axios error response:", error.response?.data);
      } else {
        console.error("Unknown error:", error);
      }
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="default"
      className="text-[14pt] w-full md:w-auto"
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
};

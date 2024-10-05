"use client";

import * as React from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { EditDialogBox } from "./editDialogBox";
import { NewCodeSnippet } from "./NewCodeSnippet";

interface CodeSnippet {
  id: string;
  title: string;
  code: string;
  // Add other properties if needed
}

interface CodeSnippetsProps {
  data: CodeSnippet[];
}

export const CodeSnippets: React.FC<CodeSnippetsProps> = ({ data }) => {
  const router = useRouter();

  const onDelete = async (codeId: string) => {
    try {
      await axios.delete(`/api/codeSnippets/${codeId}`);
      toast.success("Code deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="h-[1100px] lg:px-8 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full ">
        {data.map((codeSnippet) => (
          <Card key={codeSnippet.id} className="w-[400px] ">
            <CardHeader>
              <CardTitle className="line-clamp-1 text-[26px]">
                {codeSnippet.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="border border-dashed border-black h-[200px] mx-6 p-[15px] rounded-md line-clamp-1">
              {codeSnippet.code}
            </CardContent>
            <CardFooter className="flex flex-col gap-2 mt-5">
              {/* <Button className="w-full" variant="outline"> */}
              <EditDialogBox dataSet={codeSnippet} />
              {/* </Button> */}
              <Button
                className="w-full text-[14pt]"
                onClick={() => onDelete(codeSnippet.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

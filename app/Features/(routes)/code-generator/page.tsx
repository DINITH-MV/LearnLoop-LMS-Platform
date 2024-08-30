"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { History } from "lucide-react";

const FormSchema = z.object({
  prompt: z.string().min(10, {
    message: "Prompt must be at least 10 characters.",
  }),
});

export default function CodeGenerator() {
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setGeneratedCode(null);
      setLoading(true);
      const response = await axios.post("/api/codeGenerator/", data);
      toast.success("Code generated successfully");
      console.log(response);
      if (response) {
        console.log(response.data.generatedCode);
        setGeneratedCode(response.data.generatedCode);
      } else {
        throw new Error("Invalid response format");
      }
      form.reset();
    } catch (error) {
      console.error("Error generating ai code:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-[1100px] lg:px-8 py-4">
      <div className="flex justify-end mb-4">
      </div>
      <div className="text-center font-bold text-[30pt]">
        CODE GENERATOR
      </div>
        <Button>
          <Link href="/Features/code-generator/code-history" className="flex items-center gap-x-1">
            <History className="w-5 h-5"/>
            History
          </Link>
        </Button>
      <Card>
        <CardContent className="space-y-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-2 space-y-4"
            >
              <div className="bg-[#fff] p-[30px] rounded-[7px]">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[18pt] font-normal">INPUT YOUR PROMPT HERE</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E.g: Generate a python code to verify email address"
                        {...field}
                        className="border text-[14pt]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  
                )}
                />
                </div>
              <Button type="submit" className="w-[740px] h-[50px] bg-[#beb228] rounded-[8px] text-[20px] text-[#fff]">Submit</Button>
            </form>
          </Form>
          <div>
            {generatedCode && (
              <div className="overflow-auto mb-8 p-5 border border-dashed border-black rounded-md">
                <pre>{generatedCode}</pre>
              </div>
            )}
            <div className="text-[18pt] mb-[10px]">YOUR CODE WILL DISPLAY HERE</div>
            {!generatedCode &&
              (loading ? (
                <div className="bg-[#fff] p-5 overflow-auto h-[400px] border border-dashed border-black rounded-md">
                  <pre>Code Line Here</pre>
                  <div className="bg-[#fff] space-y-2 mt-2">
                    <Skeleton className="h-4 w-[550px] bg-slate-400" />
                    <Skeleton className="h-4 w-[500px] bg-slate-400" />
                    <Skeleton className="h-4 w-[525px] bg-slate-400" />
                    <Skeleton className="h-4 w-[450px] bg-slate-400" />
                    <Skeleton className="h-4 w-[500px] bg-slate-400" />
                    <Skeleton className="h-4 w-[550px] bg-slate-400" />
                    <Skeleton className="h-4 w-[400px] bg-slate-400" />
                  </div>
                </div>
              ) : (
                <div className="text-[14pt] p-5 h-[400px] border-[2pt] border-dashed border-black rounded-md">
                  <pre>Code Line Here</pre>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

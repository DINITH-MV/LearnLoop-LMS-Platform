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
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { History } from "lucide-react";
import { Textarea } from "@nextui-org/input";

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
      <div className="flex justify-end mb-4"></div>
      <div className="text-center mb-[40px] font-bold text-[30pt]">CODE GENERATOR</div>
      <Button className="float-right mr-[20px] text-[#444444] bg-[#f0d643] hover:bg-[#b6aa5d] hover:text-[#fff] w-[250px] h-[80px] rounded-[9px]">
        <Link
          href="/Features/code-generator/code-history"
          className="flex items-center gap-x-1"
        >
          <History className="w-8 h-8 mr-[5px]" />
          
          <div className="text-[18pt] font-semibold">HISTORY</div>
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
                      <FormLabel className="text-[18pt] font-normal">
                        INPUT YOUR PROMPT BELOW
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          placeholder="E.g: Generate a python code to verify email address"
                          {...field}
                          className="border rounded-[8px] text-[14pt] h-[180px] appearance-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-[740px] h-[50px] bg-[#f0d643] hover:bg-[#ae9f4f] hover:text-[#fff] rounded-[8px] text-[20px] text-[#444444]"
              >
                GENERATE CODE
              </Button>
            </form>
          </Form>
          <div className="bg-[#fff] p-[30px] rounded-[7px]">
            <div>
              <div className="text-[18pt] mb-[10px]">
                YOUR CODE WILL DISPLAY HERE
              </div>
              {generatedCode && (
                <div className="overflow-auto border mb-8 p-5 bg-[#fff] rounded-[12px]">
                  <pre className="text-[12pt]">{generatedCode}</pre>
                </div>
              )}

              {!generatedCode &&
                (loading ? (
                  <div className="p-5 overflow-auto h-[400px] bg-[#fff] rounded-[12px]">
                    <pre></pre>
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
                  <pre className="text-[14pt] p-5 h-[400px] border bg-[#fff] rounded-[8px]">
                    <pre> </pre>
                  </pre>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

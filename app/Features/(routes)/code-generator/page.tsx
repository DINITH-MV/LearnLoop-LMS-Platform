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
    <div className="min-h-screen lg:px-8 py-4">
      <div className="flex justify-end mb-4">
        <Button className="text-[#444444] bg-[#f0d643] hover:bg-[#b6aa5d] hover:text-[#fff] w-[160px] h-[60px] rounded-[9px]">
          <Link
            href="/Features/code-generator/code-history"
            className="flex items-center gap-x-1"
          >
            <History className="w-4 h-4 mr-[5px]" />
            <div className="ptSans text-[16pt] font-semibold">HISTORY</div>
          </Link>
        </Button>
      </div>
      <div className="YeonSung text-center mb-[40px] font-bold text-[30pt]">
        CODE GENERATOR
      </div>
      <div className="flex justify-center">
        <Card className="w-[900px]">
          <CardContent className="space-y-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-2 space-y-4"
              >
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ptSans text-[18pt] font-semibold">
                        Input your prompt below
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={7}
                          placeholder="E.g: Generate a python code to verify email address"
                          {...field}
                          className="placeholder:ptSans border rounded-[18px] text-[14pt] text-[#fff] h-[220px] max-h-[220px] bg-[#000]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="ptSans w-[93.7%] h-[50px] bg-[#f0d643] hover:bg-[#ae9f4f] hover:text-[#fff] rounded-[8px] text-[20px] text-[#444444]"
                >
                  GENERATE CODE
                </Button>
              </form>
            </Form>
            <div>
              <div className="ptSans text-[18pt] font-semibold mb-[10px]">
                Prompt Output
              </div>
              {generatedCode && (
                <div className="overflow-auto border mb-4 p-5 text-[#fff] bg-[#000] rounded-[18px]">
                  <pre className="text-[12pt]  text-left whitespace-pre font-mono">
                    {generatedCode}
                  </pre>
                </div>
              )}

              {!generatedCode &&
                (loading ? (
                  <div className="p-5 overflow-auto h-[350px] bg-[#fff] rounded-[18px]">
                    <pre></pre>
                    <div className="bg-[#000] space-y-2 mt-2">
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
                  <pre className="text-[14pt] text-[#fff] bg-[#000] rounded-[18px] p-5 h-[400px] overflow-auto">
                    <pre>Generated code will display here</pre>
                  </pre>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

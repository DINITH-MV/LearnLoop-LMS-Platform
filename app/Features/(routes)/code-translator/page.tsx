"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";

import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  fromLanguage: z.string().min(2, {
    message: "language must be at least 2 characters.",
  }),
  toLanguage: z.string().min(2, {
    message: "language must be at least 2 characters.",
  }),
  code: z.string().min(10, {
    message: "Code must be at least 10 characters.",
  }),
});

export default function CodeTranslator() {
  const [translatedCode, setTranslatedCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fromLanguage: "",
      toLanguage: "",
      code: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setTranslatedCode(null);
      setLoading(true);
      const response = await axios.post("/api/codeTranslator", data);
      if (response) {
        setTranslatedCode(response.data.content);
        console.log(response);
      } else {
        throw new Error("Invalid response format");
      }
      toast.success("Code translated!");
    } catch (error) {
      console.error("Error generating ai code:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="text-center pt-[40px] mb-[80px] font-bold text-[30pt]">
        CODE TRANSLATOR
      </div>
      <div className="flex justify-around bg-[#efefef] mx-[45px] p-[25px] rounded-[40px]">
        <div className="border bg-white rounded-[20px] p-4 h-fit w-[670px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fromLanguage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="float-left mb-[10px]">
                      From: Programming Language
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g: Javascript" {...field} className="bg-[#000]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="toLanguage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="float-left mb-[10px]">
                      To: Programming Language
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g: Python" {...field} className="bg-[#000]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g: const number = 4"
                        className="resize-none bg-[#000]"
                        rows={15}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Translate
                <Sparkles className="w-3 h-3 ml-[10px]" />
              </Button>
            </form>
          </Form>
        </div>

        {/* right */}
        <div className="border bg-white rounded-[20px] p-4 h-fit w-[670px]">
          {translatedCode && (
            <div className="overflow-auto p-5 border border-dashed border-black bg-black rounded-md">
              <pre className="text-[14pt] text-white">{translatedCode}</pre>
            </div>
          )}
          {!translatedCode &&
            (loading ? (
              <div className="p-5 overflow-auto border border-dashed border-black rounded-md">
                <pre>Code Line Here</pre>
                <div className="space-y-2 mt-2">
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
              <div className="p-5 border border-dashed border-black bg-black rounded-md">
                <pre className="text-[14pt] text-white">Code Line Here</pre>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { History } from "lucide-react";

import { Button } from "../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <div className="min-h-screen lg:px-8 py-4">
      <div className="text-center YeonSung pt-[16px] mb-[0px] font-bold text-[30pt]">
        CODE TRANSLATOR
      </div>
      <div className="flex justify-end mb-4">
        <Button className="bg-[#f0d643] hover:bg-[#b6aa5d] hover:text-[#fff] text-black">
          <Link
            href="/Features/code-translator/translate-history"
            className="flex items-center gap-x-1"
          >
            <History className="w-4 h-4" />
            History
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* left */}
        <div className="bg-[#efefef] p-[30px] rounded-[14px]">
          <div className="border bg-[#fff] rounded-[14px] p-4 h-fit">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="fromLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[18pt] font-semibold ptSans">
                        From Language
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border rounded-[8px] text-[14pt] h-[45px] bg-[#000] text-[#fff]">
                            <SelectValue placeholder="Select source language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#fff]">
                          <SelectItem className="text-[14pt]" value="python">
                            Python
                          </SelectItem>
                          <SelectItem className="text-[14pt]" value="java">
                            Java
                          </SelectItem>
                          <SelectItem
                            className="text-[14pt]"
                            value="javascript"
                          >
                            JavaScript
                          </SelectItem>
                          <SelectItem
                            className="text-[14pt]"
                            value="typescript"
                          >
                            TypeScript
                          </SelectItem>
                          <SelectItem className="text-[14pt]" value="cpp">
                            C++
                          </SelectItem>
                          <SelectItem className="text-[14pt]" value="csharp">
                            C#
                          </SelectItem>
                          <SelectItem className="text-[14pt]" value="dart">
                            Dart
                          </SelectItem>
                          <SelectItem className="text-[14pt]" value="go">
                            Go
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="toLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[18pt] font-semibold ptSans">
                        To Language
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border rounded-[8px] text-[14pt] h-[45px] bg-[#000] text-[#fff]">
                            <SelectValue placeholder="Select target language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#fff]">
                          <SelectItem className="text-[14pt]" value="python">
                            Python
                          </SelectItem>
                          <SelectItem className="text-[14pt]" value="java">
                            Java
                          </SelectItem>
                          <SelectItem
                            className="text-[14pt]"
                            value="javascript"
                          >
                            JavaScript
                          </SelectItem>
                          <SelectItem
                            className="text-[14pt]"
                            value="typescript"
                          >
                            TypeScript
                          </SelectItem>
                          <SelectItem className="text-[14pt]" value="cpp">
                            C++
                          </SelectItem>
                          <SelectItem className="text-[14pt]" value="csharp">
                            C#
                          </SelectItem>
                          <SelectItem className="text-[14pt]" value="dart">
                            Dart
                          </SelectItem>
                          <SelectItem className="text-[14pt]" value="go">
                            Go
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[18pt] font-bold ptSans">
                        Code Input
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="E.g: const number = 4"
                          className="resize-none border rounded-[8px] text-[#fff] bg-[#000] text-[14pt]"
                          rows={15}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full h-[50px] bg-[#f0d643] hover:bg-[#ae9f4f] hover:text-[#fff] rounded-[8px] text-[20px] text-[#444444]"
                >
                  TRANSLATE CODE
                </Button>
              </form>
            </Form>
          </div>
        </div>
        {/* right */}
        <div className="border bg-[#efefef] p-[30px] rounded-[14px] h-fit">
          {translatedCode && (
            <div className="overflow-auto p-5 border rounded-[14px] text-[#000] text-[12pt] border-dashed border-black">
              <pre className="text-left whitespace-pre font-mono">
                {translatedCode}
              </pre>
            </div>
          )}
          {!translatedCode &&
            (loading ? (
              <div className="p-5 overflow-auto border rounded-[14px] text-[#fff] text-[12pt] border-black bg-[#000]">
                <pre className="text-[#fff]">Code Line Here</pre>
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
              <div className="bg-[#ffffff] p-[20px] rounded-[14px]">
                <div className="p-5 overflow-auto border rounded-[11px] text-[#fff] text-[14pt] border-black bg-[#000] h-[200px]">
                  <pre className="text-[#fff]">
                    Translated code will display here
                  </pre>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

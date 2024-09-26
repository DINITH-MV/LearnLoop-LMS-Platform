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

export default function CodeRefactor() {
  const [loading, setLoading] = useState(false);
  const [refactoredCode, setRefactoredCode] = useState<string>("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setRefactoredCode("");
      setLoading(true);
      const response = await fetch("/api/codeRefactor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ javaCode: data.prompt }), // Send the prompt in the body
      });

      const ResponseData = await response.json();
      if (response.ok) {
        setRefactoredCode(ResponseData.refactoredCode);
      } else {
        alert("Error: " + ResponseData.error);
      }
      form.reset();
    } catch (error) {
      console.error("Error refactoring code:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-[1400px] lg:px-8 py-4">
      <div className="flex justify-end mb-4"></div>
      <div className="text-center mb-[40px] font-bold text-[30pt]">
        JAVA CODE REFACTORING TOOL
      </div>

      <div className="flex justify-center">
        <Card className=" w-[900px]">
          <CardContent className="space-y-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-2 space-y-4"
              >
                <div className="bg-[#fff] p-[30px] mt-[30px] rounded-[7px]">
                  <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[18pt] font-semibold">
                          INPUT THE JAVA CODE
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={7}
                            placeholder={`E.g: public class HelloWorld {
          public static void main(String[] args) {
            // Print 'Hello, World!' to the console
            System.out.println('Hello, World!');
            System.out.println('This is a test.');
            }
        }`}
                            {...field}
                            className="border rounded-[8px] text-[14pt] text-[#fff] h-[220px] max-h-[220px] bg-[#000]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-[100%] h-[50px] bg-[#f0d643] hover:bg-[#ae9f4f] hover:text-[#fff] rounded-[8px] text-[20px] text-[#444444]"
                >
                  REFACTOR THE CODE
                </Button>
              </form>
            </Form>
            <div className="bg-[#fff] p-[30px] rounded-[7px]">
              <div>
                <div className="text-[18pt] font-semibold mb-[10px]">
                  PROMPT OUTPUT
                </div>
                {refactoredCode && (
                  <div className="overflow-auto border mb-8 p-5 text-[#fff] bg-[#000] rounded-[12px]">
                    <pre className="text-[12pt]">{refactoredCode}</pre>
                  </div>
                )}

                {!refactoredCode &&
                  (loading ? (
                    <div className="p-5 overflow-auto h-[400px] bg-[#fff] rounded-[12px]">
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
                    <pre className="text-[14pt] p-5 h-[400px] border  text-[#fff] bg-[#000] rounded-[8px]">
                      <pre> </pre>
                    </pre>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

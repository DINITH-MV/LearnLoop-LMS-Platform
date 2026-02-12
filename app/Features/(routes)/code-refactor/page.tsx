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
  const [refactoredCode, setRefactoredCode] = useState<string>("");  const [appliedRules, setAppliedRules] = useState<string[]>([]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setRefactoredCode("");
      setAppliedRules([]);
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
        setAppliedRules(ResponseData.appliedRules || []);
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
    <div className="min-h-screen lg:px-8 py-4">
      <div className="flex justify-end mb-4"></div>
      <div className="YeonSung text-center mb-[40px] font-bold text-[30pt]">
        JAVA CODE REFACTORING TOOL
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
                          Input the code below
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
                  REFACTOR THE CODE
                </Button>
              </form>
            </Form>
              <div>
                <div className="ptSans text-[18pt] font-semibold mb-[10px]">
                  Prompt Output
                </div>
                {refactoredCode && (
                  <div>
                    <div className="overflow-auto border mb-4 p-5 text-[#fff] bg-[#000] rounded-[18px]">
                      <pre className="text-[12pt] text-left whitespace-pre font-mono">{refactoredCode}</pre>
                    </div>
                    {appliedRules.length > 0 && (
                      <div className="border p-4 bg-[#f8f9fa] rounded-[18px]">
                        <h4 className="font-semibold text-[16pt] mb-2 text-[#333]">Applied Refactoring Rules:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {appliedRules.map((rule, index) => (
                            <li key={index} className="text-[14pt] text-[#555]">
                              {rule}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {!refactoredCode &&
                  (loading ? (
                    <div className="p-5 overflow-auto h-[400px] bg-[#fff] rounded-[18px]">
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
                      <pre> </pre>
                    </pre>
                  ))}
              </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

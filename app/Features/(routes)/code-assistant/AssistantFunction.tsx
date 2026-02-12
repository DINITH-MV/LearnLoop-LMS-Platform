"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Send } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@nextui-org/input";

const FormSchema = z.object({
  question: z.string().min(10, {
    message: "Question must be at least 10 characters.",
  }),
});

type FormData = {
  question: string;
};

export default function AssistantFunction() {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      setQuestion(data.question);
      const response = await axios.post("/api/codeAssistant", data);

      setAnswer(response.data);
      toast.success("Generating answer...");
      form.reset();
    } catch (error) {
      console.error("Error assistant code:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-4 lg:px-8 mt-[0px] w-[550px] ">
      <div className="max-w-[900px] m-auto w-full ml-[-115px]">
        {/* Initial system prompt */}
        {!question && (
          <div className="mt-12">
            <div className="max-w-[900px] m-auto w-full space-y-8">
              <div className="flex gap-5 items-center">
                <span
                className="fa-stack fa-x"
                style={
                  {
                    fontSize: "16pt",
                    top: "3px",
                    left: "-4.5px",
                  } as React.CSSProperties
                }
              >
                <i
                  className="fa-solid fa-circle fa-stack-2x"
                  style={
                    {
                      color: "#fb5d5d",
                      borderRadius: "30px",
                    } as React.CSSProperties
                  }
                ></i>
                <i
                  className="fa-duotone fa-solid fa-message-bot z-[102]"
                  style={
                    {
                      "--fa-primary-color": "#fff",
                      "--fa-secondary-color": "#fff",
                      "--fa-secondary-opacity": "0.8",
                      fontSize: "18pt",
                      top: "0px",
                      left: "10px",
                    } as React.CSSProperties
                  }
                ></i>
              </span>
                <p className="text-md font-medium text-white">
                  How can I help you?
                </p>
              </div>
            </div>
          </div>
        )}

        {question && (
          <>
            {loading ? (
              <div className="mt-[0px] ">
                <div className="max-w-[900px] m-auto w-full space-y-8">
                  <div className="flex gap-5 items-center  w-[600px] ml-[5px]">
                    <Image
                      src="/user.svg"
                      alt="user"
                      width={35}
                      height={35}
                      className="w-[28px]"
                    />
                    <p className="ptSans ml-[10px] text-[18pt] w-[600px] font-bold text-white">{question}</p>
                  </div>

                  <div className="flex gap-5">
                    <Image
                      src="/bot.svg"
                      alt="assistant"
                      width={35}
                      height={35}
                      className="w-[40px] h-[40px]"
                    />
                    <div className="space-y-2 mt-2 h-full overflow-y-auto overflow-x-auto ptSans block whitespace-pre-wrap w-[600px] mr-[-90px] text-[15pt] ... scroll-ml-[35px] max-h-[240px] mb-[40px] text-justify text-white overflow-scroll pr-4">
                      <Skeleton className="h-3 w-[400px] bg-slate-400" />
                      <Skeleton className="h-3 w-[400px] bg-slate-400" />
                      <Skeleton className="h-3 w-[400px] bg-slate-400" />
                      <Skeleton className="h-3 w-[400px] bg-slate-400" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-[30px]">
                <div className="max-w-[900px] m-auto w-full space-y-8">
                  {/* User's question */}
                  <div className="flex gap-5 items-center w-[600px] ml-[5px]">
                    <Image
                      src="/user.svg"
                      alt="user"
                      width={35}
                      height={35}
                      className="w-[28px]"
                    />
                    <p className="ptSans ml-[10px] text-[18pt] w-[600px] font-bold text-white">{question}</p>
                  </div>

                  {/* Assistant's answer */}
                  <div className="flex gap-5">
                    <div>
                      <Image
                        src="/bot.svg"
                        alt="user"
                        width={70}
                        height={80}
                        className="w-[47px]"
                      />
                    </div>
                    <pre className="ptSans block whitespace-pre-wrap w-[600px] mr-[-90px] text-[15pt] ... scroll-ml-[35px] max-h-[240px] mb-[60px] text-justify h-full overflow-x-hidden text-white overflow-scroll pr-4">
                      {answer}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Search input */}
        <div className="p-5 pt-[40px] mt-[60px] w-[600px]">
          <div className="mb-5 absolute bottom-0">
            <div className="max-w-[900px] h-[120px] text-center ml-[36.5px] mx-auto">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex gap-2 "
                >
                  <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl className="flex-grow h-[120px] w-[400px] rounded-[11px] border-[3px] border-[#ffffff] text-[14pt] bg-[#fff]">
                          <Textarea
                            placeholder="What the unique funtions?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-white text-[14pt] font-normal" />
                      </FormItem>
                    )}
                  />
                  <button
                    className="h-[60px] w-[60px] border-[3px] border-white rounded-[11px] bg-gradient-to-r from-[#cb6866] to-[#dda815] flex justify-center items-center"
                    type="submit"
                  >
                    <Send className="text-white" />
                  </button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

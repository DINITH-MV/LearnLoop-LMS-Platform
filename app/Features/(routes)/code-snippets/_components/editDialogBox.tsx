"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { Button } from "@/app/Modules/components/ui/button";
import { Input } from "@/app/Modules/components/ui/input";
import { Textarea } from "@/app/Modules/components/ui/textarea";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/Modules/components/ui/form";

import {
  DialogContent,
  DialogTrigger,
  Dialog,
} from "@/app/Modules/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  title: z.string().min(5, {
    message: "name must be at least 2 characters.",
  }),
  code: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

export const EditDialogBox = ({ dataSet }: any) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: `${dataSet.title}`,
      code: `${dataSet.code}`,
    },
  });

  const codeId = dataSet.id;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await axios.patch(`/api/codeSnippets/${codeId}`, data);
      toast.success("Code snippet updated");
      console.log(data);
      form.reset();
      setIsDialogOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          onClick={() => setIsDialogOpen(true)}
          className="w-full"
        >
          <span className="hidden sm:inline">Edit Code</span>
        </Button>
      </DialogTrigger>
      {isDialogOpen && (
        <DialogContent className="sm:max-w-[500px] rounded-lg bg-[#b9b9b9]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code Snippet</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        {...field}
                        className="border rounded-[8px] text-[14pt] text-[#000] h-[40px] bg-[#fff]"
                      />
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
                        rows={5}
                        {...field}
                        className="border rounded-[8px] text-[14pt] text-[#000] h-[180px] bg-[#fff]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Update
              </Button>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
};

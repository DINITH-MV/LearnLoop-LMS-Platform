"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { DialogContent, DialogTrigger, Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  name: z.string().min(5, {
    message: "Feedback must be at least 2 characters.",
  }),
  code: z.string().min(0, {
    
  }),
});

export const Newfeedback = () => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      code: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await axios.post("/api/feedback", {
        messages: data.name,
        reply: data.code,
      });
      toast.success("New feedback created");
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
        <Button variant="default"  className="bg-black" onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline text-[14pt]">New feedback</span>
        </Button>
      </DialogTrigger>
      {isDialogOpen && (
        <DialogContent className="sm:max-w-[500px] rounded-lg">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Feedback</FormLabel>
                    <FormControl>
                    
                      <Textarea
                        placeholder="Write Feedback"
                        className="resize-none"
                        rows={10}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[14pt] text-white"/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    
                    <FormControl>
                    <Input type="hidden"
                        readOnly
                       
                        className="resize-none"
                    
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[14pt] text-white"/>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
};

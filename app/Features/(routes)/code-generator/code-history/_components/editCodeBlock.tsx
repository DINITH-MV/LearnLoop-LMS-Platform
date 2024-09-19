import z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/Modules/components/ui/button";

import {
  DialogContent,
  DialogTrigger,
  Dialog,
} from "@/app/Modules/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/Modules/components/ui/form";
import { Input } from "@/app/Modules/components/ui/input";
import { Textarea } from "@/app/Modules/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";

const FormSchema = z.object({
  prompt: z.string().min(10, {
    message: "Prompt must be at least 10 characters.",
  }),
  generatedCode: z.string().min(10).optional(),
});

export const EditCodeBlock = ({ dataSet }: any) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: `${dataSet.prompt}`,
      generatedCode: `${dataSet.generatedCode}`,
    },
  });

  const codeId = dataSet.id;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await axios.patch(`/api/codeGenerator/${codeId}`, {
        prompt: data.prompt,
      });
      toast.success("Prompt Name updated");
      console.log(data);
      //   form.reset();
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
          <span>Edit Title</span>
        </Button>
      </DialogTrigger>
      {isDialogOpen && (
        <DialogContent className="sm:max-w-[500px] rounded-lg bg-[#cfcfcf]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PROMPT</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        {...field}
                        className="border rounded-[8px] text-[14pt] bg-[#fff] text-[#000] h-[010px] appearance-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="generatedCode"
                disabled
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CODE OUTPUT</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="border rounded-[11px] text-[14pt] bg-[#fff] text-[#000] h-[400px] resize-none"
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

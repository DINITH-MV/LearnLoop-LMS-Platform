import z, { late } from "zod";
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
  language: z.string().min(2, {
    message: "language must be at least 02 characters.",
  }),
  code: z.string().min(10).optional(),
  solution: z.string().min(10).optional(),
});

export const EditCodeBlock = ({ dataSet }: any) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      language: `${dataSet.language}`,
      code: `${dataSet.code}`,
      solution: `${dataSet.solution}`,
    },
  });

  const codeId = dataSet.id;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await axios.patch(`/api/codeDebugger/${codeId}`, {
        language: data.language,
        code: data.code,
      });
      toast.success("Code Updated");
      console.log(data);
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
          <span>Update</span>
        </Button>
      </DialogTrigger>
      {isDialogOpen && (
        <DialogContent className="sm:max-w-[800px] rounded-lg">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#fff]">LANGUAGE</FormLabel>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
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
                <FormField
                  control={form.control}
                  name="solution"
                  disabled
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Solution</FormLabel>
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
              </div>
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

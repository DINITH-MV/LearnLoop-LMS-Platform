import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Define schema
const FormSchema = z.object({
  messages: z.string().min(2, { message: "Message must be at least 2 characters." }),
  reply: z.string().min(0, { message: "Reply must be at least 2 characters." }),
});

export const EditDialogBox = ({ dataSet }: any) => {
  const { userId } = useAuth(); // Use useAuth inside the functional component
  const teacherId = process.env.NEXT_PUBLIC_TEACHER_ID;
  const isTeacher = userId === teacherId;

  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      messages: dataSet.messages,
      reply: dataSet.reply,
    },
  });

  const feedbackId = dataSet.id;
  const hasReply = !!dataSet.reply;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await axios.patch(`/api/feedback/${feedbackId}`, {
        messages: data.messages,
        reply: data.reply,
      });
      toast.success("Feedback updated");
      form.reset();
      setIsDialogOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  // Check if the current user is a teacher and if the reply field is empty
  const isReplyFieldEmpty = !form.getValues("reply");
  const buttonText = isTeacher ? (isReplyFieldEmpty ? <p className="text-[14pt]">Reply</p> : <p className="text-[14pt]">Update</p>) : <p className="text-[14pt]">Update</p>;
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="default"
          onClick={() => setIsDialogOpen(true)}
          className="w-80% bg-blue-900"
        >
          <span className="hidden sm:inline">{buttonText}</span>
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
                name="messages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Messages</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your feedback here"
                        className="resize-none"
                        rows={10}
                        {...field}
                        disabled={isTeacher}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reply"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reply</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your reply here"
                        className="resize-none"
                        rows={10}
                        {...field}
                        disabled={!isTeacher} // Make input read-only for non-teachers
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
              >
                {buttonText}
              </Button>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
};

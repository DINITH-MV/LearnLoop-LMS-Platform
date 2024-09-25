import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import FeedbackClient from "./_components/FeedbackClient";
import { format } from "date-fns";

type FeedbackWithFormattedDate = {
  id: string;
  messages: string;
  reply: string;
  createdAt: string;
};

const Feedbackpage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const teacherId = process.env.NEXT_PUBLIC_TEACHER_ID;
  const isTeacher = userId === teacherId;

  const FEEDBACK = await db.feedback.findMany({
    where: {
      ...(isTeacher ? {} : { userId }),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Format the createdAt field to a string
  const formattedFeedbacks: FeedbackWithFormattedDate[] = FEEDBACK.map(feedback => ({
    id: feedback.id,
    messages: feedback.messages,
    reply: feedback.reply,
    createdAt: format(feedback.createdAt, 'yyyy-MM-dd HH:mm:ss'),
  }));

  return (
    <FeedbackClient formattedFeedbacks={formattedFeedbacks} isTeacher={isTeacher} />
  );
};

export default Feedbackpage;

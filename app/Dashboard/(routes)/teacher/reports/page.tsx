import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { format } from "date-fns";
import FeedbackClient from "./_components/FeedbackClient";
import { Button } from "@/components/ui/button";

type FeedbackWithFormattedDate = {
  id: string;
  messages: string;
  reply: string;
  createdAt: string;
};

const reports = async () => {
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
  const formattedFeedbacks: FeedbackWithFormattedDate[] = FEEDBACK.map(
    (feedback) => ({
      id: feedback.id,
      messages: feedback.messages,
      reply: feedback.reply,
      createdAt: format(feedback.createdAt, "yyyy-MM-dd HH:mm:ss"),
    })
  );

  return (
    <div>
      <table className="mt-[40px]">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Feedback</td>
            <td>
              <FeedbackClient formattedFeedbacks={formattedFeedbacks} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default reports;

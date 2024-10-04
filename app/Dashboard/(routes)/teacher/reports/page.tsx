import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FeedbackReport from "./_components/FeedbackReport";
import CourseReport from "./_components/CourseReport";
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
      <Table className="mt-[40px] w-[670px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[220px]">Topic</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Course Analytics</TableCell>
            <TableCell>
              {" "}
              <CourseReport />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Feedback</TableCell>
            <TableCell>
              {" "}
              <FeedbackReport formattedFeedbacks={formattedFeedbacks} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default reports;

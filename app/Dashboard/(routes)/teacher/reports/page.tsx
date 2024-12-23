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
import DebugReport from "./_components/DebugReport";
import CodeGeneratorReport from "./_components/CodeGenReport";
import CodeGenReport from "./_components/CodeGenReport";
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
      <Table className="mt-[40px] w-[790px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[220px]">Topic</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="">
            <TableCell className="font-medium w-[320px] ">Course Analytics</TableCell>
            <TableCell>
              {" "}
              <CourseReport />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium w-[320px]">Feedback</TableCell>
            <TableCell>
              {" "}
              <FeedbackReport formattedFeedbacks={formattedFeedbacks} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium w-[320px]">Debugged Code Analysis</TableCell>
            <TableCell>
              {" "}
              <DebugReport />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium w-[320px]">Generated Code Analysis</TableCell>
            <TableCell>
              {" "}
              <CodeGenReport />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default reports;

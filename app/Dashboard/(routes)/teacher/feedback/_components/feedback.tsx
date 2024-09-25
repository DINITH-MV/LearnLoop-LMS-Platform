"use client";

import * as React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { EditDialogBox } from "./editDialogBox";
import { useAuth } from "@clerk/nextjs";

interface Feedbacks {
  id: string;
  messages: string;
  reply: string;
  
}

interface FeedbackProps {
  data: Feedbacks[];
}

export const Feedback: React.FC<FeedbackProps> = ({ data }) => {
  const router = useRouter();
  const { userId } = useAuth(); 
  const teacherId = process.env.NEXT_PUBLIC_TEACHER_ID;
  const isTeacher = userId === teacherId;
  const onDeletef = async (feedbackId: string) => {
    try {
      if (feedbackId) {
        await axios.delete(`/api/feedback/${feedbackId}`);
        toast.success("Feedback deleted");
        router.refresh();
      } else {
        toast.error("Invalid ID");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
        
            <th scope="col" className="px-6 py-3 w-230 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Feedback
            </th>
            <th scope="col" className="px-6 py-3 w-230 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reply
            </th>
            <th scope="col" className="px-6 py-3 w-230 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((feedback) => (
            <tr key={feedback.id}>
             
             <td className="px-6 w-32 py-4 whitespace-nowrap text-[14pt] text-gray-500">{feedback.messages}</td>
              <td className="px-6 py-4 whitespace-nowrap text-[14pt] text-gray-500">{feedback.reply}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-[14pt] font-medium">
              {feedback.reply&&!isTeacher  ? (
        <span className="text-gray-500">Replied</span> 
      ) : (
        <EditDialogBox dataSet={feedback} />
      )}
               { !isTeacher && <Button className="ml-2 bg-red-500" onClick={() => onDeletef(feedback.id)}>
                  Delete
                </Button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

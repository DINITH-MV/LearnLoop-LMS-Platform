"use client"; // This file is a Client Component

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { InputFeedback } from "@/components/ui/inputFeedback";
import ReportGeneration from "./FeedbackReportGenerator";

type FeedbackWithFormattedDate = {
  id: string;
  messages: string;
  reply: string;
  createdAt: string;
};

interface FeedbackClientProps {
  formattedFeedbacks: FeedbackWithFormattedDate[];
}

const CourseReport: React.FC<FeedbackClientProps> = ({
  formattedFeedbacks,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [replyQuery, setReplyQuery] = useState("");
  const [filteredFeedbacks, setFilteredFeedbacks] =
    useState<FeedbackWithFormattedDate[]>(formattedFeedbacks);

  useEffect(() => {
    const results = formattedFeedbacks.filter(
      (feedback) =>
        feedback.messages.toLowerCase().includes(searchQuery.toLowerCase()) &&
        feedback.reply.toLowerCase().includes(replyQuery.toLowerCase())
    );
    setFilteredFeedbacks(results);
  }, [searchQuery, replyQuery, formattedFeedbacks]);

  return (
    <div className="pl-6 ">
      <ReportGeneration feedbacks={filteredFeedbacks} />
      {/* Pass filtered feedbacks */}
    </div>
  );
};

export default CourseReport;

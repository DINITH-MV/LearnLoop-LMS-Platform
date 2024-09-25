"use client"; // This file is a Client Component

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Feedback } from "./feedback";
import ReportGeneration from "./ReportGeneration";
import { format } from "date-fns";

type FeedbackWithFormattedDate = {
  id: string;
  messages: string;
  reply: string;
  createdAt: string;
};

interface FeedbackClientProps {
  formattedFeedbacks: FeedbackWithFormattedDate[];
  isTeacher: boolean;
}

const FeedbackClient: React.FC<FeedbackClientProps> = ({ formattedFeedbacks, isTeacher }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [replyQuery, setReplyQuery] = useState('');
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<FeedbackWithFormattedDate[]>(formattedFeedbacks);

  useEffect(() => {
    const results = formattedFeedbacks.filter(feedback =>
      feedback.messages.toLowerCase().includes(searchQuery.toLowerCase()) &&
      feedback.reply.toLowerCase().includes(replyQuery.toLowerCase())
    );
    setFilteredFeedbacks(results);
  }, [searchQuery, replyQuery, formattedFeedbacks]);

  return (
    <div className="px-6 py-10">
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <Input
            placeholder="Filter feedbacks by message"
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Input
            placeholder="Filter feedbacks by reply"
            className="w-full"
            value={replyQuery}
            onChange={(e) => setReplyQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-12">
        <Feedback data={filteredFeedbacks} />
      </div>
      <div>
        {isTeacher && <ReportGeneration feedbacks={filteredFeedbacks} />} {/* Pass filtered feedbacks */}
      </div>
    </div>
  );
};

export default FeedbackClient;

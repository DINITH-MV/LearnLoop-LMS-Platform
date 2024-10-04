"use client"; // This file is a Client Component

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Feedback } from "./feedback";
import { format } from "date-fns";
import { InputFeedback } from '@/components/ui/inputFeedback';

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
      <div className="flex gap-2 w-[900px]">
        <div className="flex-1">
          <InputFeedback
            placeholder="Search feedbacks by message"
            className="w-[400px] text-[14pt]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <InputFeedback
            placeholder="Search feedbacks by reply"
            className="w-[400px] text-[14pt]"
            value={replyQuery}
            onChange={(e) => setReplyQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-12">
        <Feedback data={filteredFeedbacks} />
      </div>
    </div>
  );
};

export default FeedbackClient;

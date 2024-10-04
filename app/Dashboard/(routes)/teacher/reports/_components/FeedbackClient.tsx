"use client"; // This file is a Client Component

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { InputFeedback } from '@/components/ui/inputFeedback';
import ReportGeneration from './ReportGeneration';

type FeedbackWithFormattedDate = {
  id: string;
  messages: string;
  reply: string;
  createdAt: string;
};

interface FeedbackClientProps {
  formattedFeedbacks: FeedbackWithFormattedDate[];
}

const FeedbackClient: React.FC<FeedbackClientProps> = ({ formattedFeedbacks }) => {
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
        
      </div>
      <div>
        <ReportGeneration feedbacks={filteredFeedbacks} />{/* Pass filtered feedbacks */}
      </div>
    </div>
  );
};

export default FeedbackClient;

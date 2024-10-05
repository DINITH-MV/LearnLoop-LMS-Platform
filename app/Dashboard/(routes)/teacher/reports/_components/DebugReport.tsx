import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { InputFeedback } from "@/components/ui/inputFeedback";
import ReportGeneration from "./FeedbackReportGenerator";
import ReportGenerationAnalytics from "./CourseReportGeneration";
import { auth } from "@clerk/nextjs/server";
import { getCourses } from "@/actions/get-courses";
import { getEnrolledCourses } from "@/actions/get-enrolled-courses";
import { getDebugAnalysis } from "@/actions/get-debugCodeAnalysis";
import DebugReportGeneration from "./DebugReportGeneration";

const DebugReport = async () => {
  const { codeIdCount, analysis } = await getDebugAnalysis();

  const enrolledCourses = await getEnrolledCourses();

  return (
    <div className="pl-6 ">
      {/* Pass filteredFeedbacks, totalRevenue, and totalSales to the report */}
      <DebugReportGeneration
        analysis={analysis}
        codeIdCount={codeIdCount}
      />
    </div>
  );
};

export default DebugReport;
function redirect(arg0: string) {
  throw new Error("Function not implemented.");
}

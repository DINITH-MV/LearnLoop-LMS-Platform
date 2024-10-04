import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { InputFeedback } from "@/components/ui/inputFeedback";
import ReportGeneration from "./FeedbackReportGenerator";
import ReportGenerationAnalytics from "./ReportGenerationAnalytics";
import { getAnalytics } from "@/actions/get-analytics";
import { auth } from "@clerk/nextjs/server";
import { getCourses } from "@/actions/get-courses";

const CourseReport = async () => {

  const { totalRevenue, totalSales } = await getAnalytics();

  return (
    <div className="pl-6 ">
        {/* Pass filteredFeedbacks, totalRevenue, and totalSales to the report */}
        <ReportGenerationAnalytics 
          totalRevenue={totalRevenue} 
          totalSales={totalSales} 
        />
    </div>
  );
};

export default CourseReport;
function redirect(arg0: string) {
  throw new Error("Function not implemented.");
}

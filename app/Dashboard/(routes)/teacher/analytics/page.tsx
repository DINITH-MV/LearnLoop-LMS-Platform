import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getAnalytics } from "@/actions/get-analytics";

import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import ReportGeneration from "../reports/_components/CourseReportGeneration"; // Assuming this handles the PDF generation and chart rendering

const AnalyticsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { data, totalRevenue, totalSales } = await getAnalytics();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* <ReportGeneration 
          feedbacks={data} // Assuming data contains an array of feedback, if not, rename accordingly
          totalRevenue={totalRevenue} 
          totalSales={totalSales} 
        /> */}
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
        <DataCard label="Total Sales" value={totalSales} />
      </div>
      {/* Render the chart */}
      <div className="w-full overflow-x-auto">
        <Chart data={data} />
      </div>
    </div>
  );
};

export default AnalyticsPage;

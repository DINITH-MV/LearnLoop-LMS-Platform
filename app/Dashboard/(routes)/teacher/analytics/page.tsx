import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getAnalytics } from "@/actions/get-analytics";

import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import ReportGeneration from "./_components/ReportGenerationAnalytics"; // Assuming this handles the PDF generation and chart rendering

const AnalyticsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* <ReportGeneration 
          feedbacks={data} // Assuming data contains an array of feedback, if not, rename accordingly
          totalRevenue={totalRevenue} 
          totalSales={totalSales} 
        /> */}
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
        <DataCard label="Total Sales" value={totalSales} />
      </div>
      {/* Render the chart */}
      <Chart data={data} />
    </div>
  );
};

export default AnalyticsPage;

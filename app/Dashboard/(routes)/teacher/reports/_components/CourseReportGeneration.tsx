"use client";

import { useState, useRef } from "react";
import { format } from "date-fns";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Chart, ChartType, registerables } from "chart.js";
import { font } from "./RobotoCondensed-normal"; // Load your custom font

Chart.register(...registerables); // Register Chart.js components

type ReportGenerationProps = {
  totalRevenue: number;
  totalSales: number;
  enrolledCourses: { title: string }[]; // Define the course structure
};

const FeatuCourseReportGenerationres = ({
  totalRevenue,
  totalSales,
  enrolledCourses,
}: ReportGenerationProps) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    format(new Date(), "yyyy-MM")
  );
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const generateChart = () => {
    const chartInstance = new Chart(chartRef.current as HTMLCanvasElement, {
      type: "bar" as ChartType,
      data: {
        labels: [
          "5G Communication System Using Matlab",
          "The Basics of Rocket Science",
        ],
        datasets: [
          {
            label: "total",
            data: [90, 20], // Example values, replace with actual data if needed
            backgroundColor: ["#00C49F", "#FF8042"], // Green for high revenue, Orange for low
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return chartInstance;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const startX = 10;
    const startY = 20;
    const borderWidth = 190; // Adjust this based on your page size
    const borderHeight = 278; // Adjust based on the content height
    const borderRadius = 2; // Radius for rounded corners

    // Add a border to the report
    doc.setLineWidth(0.5); // Set the border line thickness
    doc.roundedRect(
      startX,
      startY - 10,
      borderWidth,
      borderHeight,
      borderRadius,
      borderRadius
    );

    const base64Logo =
    "data:image/png;base64,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"; // Add your Base64 logo here


    // Logo placeholder (you can update the base64Logo)
    if (base64Logo) {
      doc.addImage(base64Logo, "JPEG", startX + 76, startY - 2, 41, 13);
    }

    // Set PDF Title
    doc.setFontSize(18);
    doc.addFileToVFS("WorkSans-normal.ttf", font); // Assuming you're using WorkSans
    doc.addFont("WorkSans-normal.ttf", "WorkSans", "normal");
    doc.setFont("WorkSans");
    doc.text("COURSE ANALYTICS REPORT", startX + 60, startY + 20);
    doc.setFontSize(13);
    doc.text(
      `For the month starting from: ${selectedMonth}`,
      startX + 63.5,
      startY + 28
    );

    // Add enrolled courses
    doc.setFontSize(15);
    doc.text("Totally Enrolled Courses:", startX + 10, startY + 45);
    enrolledCourses.forEach((course, index) => {
      doc.text(
        `${index + 1}. ${course.title}`,
        startX + 10,
        startY + 54 + index * 8
      );
    });

    // Add data cards for revenue and sales
    doc.setFontSize(15);
    doc.text(`Total Revenue & Sales of the month:`, startX + 10, startY + 82);
    doc.text(
      `- Total Revenue : $${totalRevenue.toFixed(2)}`,
      startX + 10,
      startY + 90
    );
    doc.text(`- No of courses sold : ${totalSales}`, startX + 10, startY + 97);

    // Generate chart and add to PDF
    const chartInstance = generateChart();
    const chartImage = chartRef.current?.toDataURL("image/png");

    // Add a border with radius around the chart
    const chartX = startX + 20;
    const chartY = startY + 100 + enrolledCourses.length * 8;
    const chartWidth = 150;
    const chartHeight = 75;
    const chartBorderRadius = 2; // Adjust for the desired roundness

    // Add the border for the chart area
    doc.setLineWidth(0.5);
    doc.roundedRect(chartX - 4, chartY - 4, chartWidth + 8, chartHeight + 8, chartBorderRadius, chartBorderRadius);

    // Add chart image to PDF
    if (chartImage) {
      doc.addImage(chartImage, "PNG", chartX, chartY, chartWidth, chartHeight);
    }

    // Add legend
    doc.setFontSize(14);
    doc.setTextColor(0, 200, 159); // Green color
    doc.text(
      "Revenue > $60: Green",
      27,
      startY + 190 + enrolledCourses.length * 8
    );
    doc.setTextColor(255, 191, 40); // Yellow color
    doc.text(
      "Revenue > $20: Yellow",
      82,
      startY + 190 + enrolledCourses.length * 8
    );
    doc.setTextColor(255, 128, 66); // Orange color
    doc.text(
      "Revenue <= $20: Orange",
      137,
      startY + 190 + enrolledCourses.length * 8
    );

    // Create a Blob and open it in a new tab
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");

    // Destroy the chart instance after PDF generation
    chartInstance.destroy();
  };

  return (
    <div className="mt-4 mb-6 flex gap-2">
    <Input
      type="month"
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
      className="w-[160px] h-9 text-[14pt] text-black"
    />
    <Button onClick={generatePDF} size="default" className="font-normal text-[14pt]">View PDF Report</Button>
      {/* Chart display */}
      <canvas ref={chartRef} className="hidden" />
  </div>
    
  );
};

export default FeatuCourseReportGenerationres;

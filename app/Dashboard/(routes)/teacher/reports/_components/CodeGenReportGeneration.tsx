"use client";

import { useState, useRef } from "react";
import { format } from "date-fns";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Chart, ChartType, registerables } from "chart.js";
import { font } from "./RobotoCondensed-normal"; // Load your custom font
import { base64Logo } from "./logo";

Chart.register(...registerables); // Register Chart.js components

type ReportGenerationProps = {
  codeIdCount: number;
  analysis: {
    id: string;
    prompt: string;
    generatedCode: string;
  }[];
};

const CodeGenReportGeneration = ({
  codeIdCount,
  analysis,
}: ReportGenerationProps) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    format(new Date(), "yyyy-MM")
  );
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const generateChart = () => {
    const chartInstance = new Chart(chartRef.current as HTMLCanvasElement, {
      type: "bar" as ChartType,
      data: {
        labels: ["Prompt 1", "Prompt 2"], // Example values, replace with actual data if needed
        datasets: [
          {
            label: "Code Generation Count",
            data: [90, 20], // Example values, replace with actual data if needed
            backgroundColor: ["#00C49F", "#FF8042"], // Green for high count, Orange for low
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
    let startY = 20; // Dynamic starting Y position
    const borderWidth = 190;
    const borderHeight = 278;
    const borderRadius = 2;

    const addPageBorder = () => {
      doc.setLineWidth(0.5);
      doc.roundedRect(
        startX,
        startY - 10, // Adjust starting point for the border
        borderWidth,
        borderHeight,
        borderRadius,
        borderRadius
      );
    };

    // Add a border to the first page
    addPageBorder();

    // Logo placeholder
    if (base64Logo) {
      doc.addImage(base64Logo, "JPEG", startX + 76, startY - 2, 41, 13);
    }

    // Set PDF Title
    doc.setFontSize(18);
    doc.addFileToVFS("WorkSans-normal.ttf", font);
    doc.addFont("WorkSans-normal.ttf", "WorkSans", "normal");
    doc.setFont("WorkSans");
    doc.text("CODE GENERATION REPORT", startX + 60, startY + 20);
    startY += 30; // Move Y position after the title
    doc.setFontSize(13);
    doc.text(
      `For the month starting from: ${selectedMonth}`,
      startX + 62,
      startY
    );
    startY += 10; // Move Y position after the subtitle

    // Add total count
    doc.setFontSize(15);
    doc.text(`Total Generated Codes: ${codeIdCount}`, startX + 10, startY + 12);
    startY += 25; // Move Y position for code generation entries

    // Add prompt and generated code
    doc.setFontSize(14);
    analysis.forEach((item, index) => {
      doc.text(`Entry No:${index + 1}`, startX + 10, startY);
      startY += 7;
      doc.setFontSize(12);
      doc.text(`Prompt:`, startX + 10, startY);
      startY += 5;

      // Add prompt text (this may be large, so we need to handle wrapping)
      const promptLines = doc.splitTextToSize(item.prompt, 180); // Split long prompt lines to fit
      promptLines.forEach((line: string) => {
        if (startY >= 270) {
          doc.addPage(); // Add new page if the content exceeds page height
          startY = 20;
          addPageBorder(); // Add border to the new page
        }
        doc.text(line, startX + 10, startY);
        startY += 5; // Adjust line spacing
      });

      doc.setFontSize(14);

      // Add generated code
      startY += 7; // Space between prompt and generated code
      doc.text(`Generated Code:`, startX + 10, startY);
      startY += 5;
      doc.setFontSize(12);

      const codeLines = doc.splitTextToSize(item.generatedCode, 180); // Split long code lines to fit
      doc.setFont("courier", "normal"); // Change font to courier for code style
      codeLines.forEach((line: string) => {
        if (startY >= 270) {
          doc.addPage(); // Add new page if the content exceeds page height
          startY = 20;
          addPageBorder(); // Add border to the new page
        }
        doc.text(line, startX + 10, startY);
        startY += 5; // Adjust line spacing
      });

      // Space before the next entry
      startY += 10;

      // Add a new page if necessary
      if (startY >= 270) {
        doc.addPage();
        startY = 20; // Reset Y position for the new page
        addPageBorder(); // Add border to the new page
      }
    });

    // Generate chart and add to PDF
    const chartInstance = generateChart();
    const chartImage = chartRef.current?.toDataURL("image/png");

    if (chartImage) {
      doc.addPage(); // Ensure the chart is on a new page
      startY = 20; // Reset Y position for the new page
      addPageBorder(); // Add border to the new page
      doc.addImage(chartImage, "PNG", startX + 20, startY, 150, 75);
    }

    // Create a Blob and open it in a new tab
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");

    // Destroy the chart instance after PDF generation
    chartInstance.destroy();
  };

  return (
    <div className="mt-1 mb-1 flex gap-2">
      <Input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="w-[160px] h-9 text-[14pt] text-black"
      />
      <Button
        onClick={generatePDF}
        size="default"
        className="font-normal text-[14pt]"
      >
        View PDF Report
      </Button>

      {/* Chart display */}
      <canvas ref={chartRef} className="hidden" />
    </div>
  );
};

export default CodeGenReportGeneration;

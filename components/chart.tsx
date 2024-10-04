"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";
import { Card } from "@/components/ui/card";

interface ChartProps {
  data: {
    name: string;
    total: number;
  }[];
}

export const Chart = ({ data }: ChartProps) => {
  // Dynamic color assignment based on the value
  const getBarColor = (value: number) => {
    if (value > 60) return "#00C49F"; // Green for high values
    if (value > 20) return "#FFBB28"; // Yellow for mid values
    return "#FF8042"; // Orange for low values
  };

  return (
    <Card>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />{" "}
          {/* Light grid lines */}
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip formatter={(value) => [`$${value}`, "Total"]} />{" "}
          {/* Tooltip for value details */}
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="total" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.total)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="p-4">
        {/* Description explaining the color coding */}
        <ul className="mb-4 list-none flex justify-between">
          <li>
            <span style={{ color: "#00C49F", fontWeight: "bold" }}>●</span>{" "}
            Revenue {">"} $60: Green
          </li>
          <li>
            <span style={{ color: "#FFBB28", fontWeight: "bold" }}>●</span>{" "}
            Revenue {">"} $20: Yellow
          </li>
          <li>
            <span style={{ color: "#FF8042", fontWeight: "bold" }}>●</span>{" "}
            Revenue {"<="} $20: Orange
          </li>
        </ul>
      </div>
    </Card>
  );
};

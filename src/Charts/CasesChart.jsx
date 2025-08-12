import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import supabase from "../Supabase/supabase_config";

export default function CasesChart() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    fetchCases();
  }, []);

  async function fetchCases() {
    const { data, error } = await supabase
      .from("cases")
      .select("diagnosis, status");

    if (error) {
      console.error("Error fetching cases:", error.message);
    } else {
      setCases(data);
    }
  }

  // Group data for stacked chart
  const chartData = Object.values(
    cases.reduce((acc, { diagnosis, status }) => {
      if (!acc[diagnosis]) {
        acc[diagnosis] = { diagnosis, target: 0, progress: 0 };
      }
      if (status === "high") {
        acc[diagnosis].target += 1;
      } else if (status === "low" || status === "medium") {
        acc[diagnosis].progress += 1;
      }
      return acc;
    }, {})
  );

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold text-center mb-6">
        Cases by Diagnosis (Target vs Progress)
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="diagnosis" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Legend />
          <Bar dataKey="progress" stackId="a" fill="#9b7ede" />
          <Bar dataKey="target" stackId="a" fill="#c4a9f5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

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
import supabase from "../../Supabase/supabase_config";

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

  // Group data for separate low, medium, high bars
  const chartData = Object.values(
    cases.reduce((acc, { diagnosis, status }) => {
      if (!acc[diagnosis]) {
        acc[diagnosis] = { diagnosis, low: 0, medium: 0, high: 0 };
      }
      if (status === "low") {
        acc[diagnosis].low += .25;
      } else if (status === "medium") {
        acc[diagnosis].medium += .5;
      } else if (status === "high") {
        acc[diagnosis].high += .75;
      }
      return acc;
    }, {})
  );

  return (
    <div className="p-6 w-full bg-gray-300 rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        Cases by Diagnosis (Low / Medium / High)
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="diagnosis" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Legend />
          <Bar dataKey="low" fill="#99cc77" name="Low" />
          <Bar dataKey="medium" fill="#ffcc66" name="Medium" />
          <Bar dataKey="high" fill="#ff4455" name="High" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

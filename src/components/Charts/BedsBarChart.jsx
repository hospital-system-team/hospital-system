import { Bar } from "react-chartjs-2";
import supabase from "../../Supabase/supabase_config";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BedsBarChart() {
  const [statusCounts, setStatusCounts] = useState({});
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");

  async function fetchBeds() {
    try {
      await supabase.auth.setSession({
        access_token,
        refresh_token,
      });
      const { data, error } = await supabase.from("beds").select("is_occupied");
      if (error) {
        console.error("Error fetching Beds:", error.message);
      } else {
        const counts = data.reduce((acc, bed) => {
          const status = bed.is_occupied ? "Occupied" : "Available";
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});
        setStatusCounts(counts);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  }

  useEffect(() => {
    fetchBeds();
  }, []);

  const labels = ["Available", "Occupied"];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Available",
        data: [statusCounts["Available"] || 0, 0],
        backgroundColor: "#1E90FF",
        maxBarThickness: 60,
        categoryPercentage: 0.6,
        barPercentage: 0.6,
      },
      {
        label: "Occupied",
        data: [0, statusCounts["Occupied"] || 0],
        backgroundColor: "#dc3545", 
        maxBarThickness: 60,
        categoryPercentage: 0.6,
        barPercentage: 0.6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { font: { size: 16 } },
      },
      title: {
        display: true,
        text: "Number of Beds by Status",
        font: { size: 20 },
      },
    },
    scales: {
      x: {
        grid: { offset: true },
        ticks: { font: { size: 14 }, align: "center", padding: 10 },
        categoryPercentage: 0.6,
        barPercentage: 0.6,
        maxBarThickness: 25,
      },
      y: { ticks: { font: { size: 14 } } },
    },
  };

  return (
    <div style={{ width: "90%", maxWidth: "1000px", height: "550px", margin: "auto" }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default BedsBarChart;


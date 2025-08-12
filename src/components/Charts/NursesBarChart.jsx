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
function NursesBarChart() {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  const [shiftCounts, setShiftCounts] = useState({});
  async function fetchNurses() {
    try {
      await supabase.auth.setSession({
        access_token: access_token,
        refresh_token: refresh_token,
      });
      const { data, error } = await supabase.from("nurses").select("shift");
      if (error) {
        console.error("Error fetching Nurses:", error.message);
      } else {
        const counts = data.reduce((acc, nurse) => {
          acc[nurse.shift] = (acc[nurse.shift] || 0) + 1;
          return acc;
        }, {});
        setShiftCounts(counts);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  }

  useEffect(() => {
    fetchNurses();
  }, []);
  
useEffect(() => {
  console.log('shiftCounts entries:', Object.entries(shiftCounts));
}, [shiftCounts]);

const labels = Object.keys(shiftCounts); 
console.log("Labels:", labels);// ['pm', 'am']

const chartData = {
  labels: labels,
 datasets: [
  {
    label: "Morning",
    data: [shiftCounts["am"] || 0, 0],
    backgroundColor: "#1E90FF",
    maxBarThickness: 60,
    categoryPercentage: 0.6,
    barPercentage: 0.6,
  },
  {
    label: "Evening",
    data: [0, shiftCounts["pm"] || 0],
    backgroundColor: "#FF6347",
    maxBarThickness: 60,
      categoryPercentage: 0.6,
      barPercentage: 0.6,
  },
]

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
      text: "Number of Nurses by Shift",
      font: { size: 20 },
    },
  },
  scales: {
    x: {
      grid: {
        offset: true,
      },
      ticks: {
        font: { size: 14 },
        align: "center",
        padding: 10,
        
      },
      categoryPercentage: 0.6, 
      barPercentage: 0.6, 
      maxBarThickness: 25,
    },
    y: {
      ticks: { font: { size: 14 } },
    },
  },
};



  return (
    <div style={{ width: "90%", maxWidth: "1000px", height: "550px", margin: "auto" }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default NursesBarChart;
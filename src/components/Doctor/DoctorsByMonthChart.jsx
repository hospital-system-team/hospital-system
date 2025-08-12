// src/components/DoctorsByMonthChart.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
  Filler,
} from "chart.js";
import {
  subMonths,
  startOfMonth,
  formatISO,
  parseISO,
  format,
  parse,
} from "date-fns";
import { ar } from "date-fns/locale";
import supabase from "../../Supabase/supabase_config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
  Filler
);

export default function DoctorsByMonthChart({
  months = 12,
  title = "إضافات الدكاترة شهريًا",
}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const canvasRef = useRef(null);

  // جلب created_at لآخر X شهور
  useEffect(() => {
    (async () => {
      try {
        const access_token = localStorage.getItem("access_token");
        const refresh_token = localStorage.getItem("refresh_token");
        await supabase.auth.setSession({ access_token, refresh_token });

        const fromDate = startOfMonth(subMonths(new Date(), months - 1));
        const { data, error } = await supabase
          .from("doctors")
          .select("id, created_at")
          .gte("created_at", formatISO(fromDate));
        if (error) throw error;
        setRows(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [months]);

  // labels: yyyy-MM  | counts: أعداد
  const { labels, counts } = useMemo(() => {
    const map = new Map();
    for (let i = months - 1; i >= 0; i--) {
      const d = subMonths(new Date(), i);
      const key = format(d, "yyyy-MM");
      map.set(key, 0);
    }
    rows.forEach((r) => {
      const d = parseISO(r.created_at);
      const key = format(d, "yyyy-MM");
      if (map.has(key)) map.set(key, (map.get(key) || 0) + 1);
    });
    return { labels: Array.from(map.keys()), counts: Array.from(map.values()) };
  }, [rows, months]);

  // جراديانت احترافي
  const gradient = (ctx) => {
    const chart = ctx.chart;
    const { top, bottom } = chart.chartArea || {};
    if (!top || !bottom) return "rgba(30,144,255,0.8)";
    const g = chart.ctx.createLinearGradient(0, top, 0, bottom);
    g.addColorStop(0, "rgba(30,144,255,0.95)"); // DodgerBlue
    g.addColorStop(1, "rgba(30,144,255,0.15)");
    return g;
  };

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "عدد المضافين",
          data: counts,
          backgroundColor: (ctx) => gradient(ctx),
          borderColor: "rgba(30,144,255,0.9)",
          borderWidth: 1,
          borderSkipped: false,
          barThickness: "flex",
          maxBarThickness: 36,
          borderRadius: 10,
          hoverBorderWidth: 2,
        },
      ],
    }),
    [labels, counts]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      locale: "ar-EG",
      layout: { padding: { top: 8, right: 8, bottom: 0, left: 8 } },
      plugins: {
        title: {
          display: true,
          text: title,
          color: "#111",
          font: { weight: "600", size: 16 },
          padding: { bottom: 12 },
        },
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0f172a",
          titleColor: "#fff",
          bodyColor: "#e5e7eb",
          padding: 10,
          displayColors: false,
          callbacks: {
            title: (items) => {
              const raw = items?.[0]?.label || "";
              // من yyyy-MM إلى "MMM yyyy" بالعربي
              const d = parse(raw, "yyyy-MM", new Date());
              return format(d, "MMM yyyy", { locale: ar });
            },
            label: (ctx) => `عدد: ${ctx.parsed.y}`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            callback: (val, idx) => {
              const raw = labels[idx];
              const d = parse(raw, "yyyy-MM", new Date());
              return format(d, "MMM", { locale: ar }); // اختصار الشهر بالعربي
            },
            color: "#374151",
            maxRotation: 0,
            autoSkip: false,
          },
        },
        y: {
          beginAtZero: true,
          grid: { color: "rgba(0,0,0,0.06)" },
          ticks: { stepSize: 1, color: "#374151", precision: 0 },
          border: { display: false },
        },
      },
      animation: {
        duration: 700,
        easing: "easeOutQuart",
      },
      interaction: { mode: "index", intersect: false },
    }),
    [labels, title]
  );

  return (
    <div className="w-full h-[380px] rounded-2xl bg-white p-4 shadow-sm">
      {loading ? (
        <div className="h-full flex items-center justify-center text-gray-500">
          جارٍ التحميل…
        </div>
      ) : (
        <Bar ref={canvasRef} data={data} options={options} />
      )}
    </div>
  );
}

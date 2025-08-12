import { useEffect, useState } from "react";

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

  // Group by diagnosis and status
  const groupedData = {};
  cases.forEach(({ diagnosis, status }) => {
    if (!groupedData[diagnosis]) groupedData[diagnosis] = {};
    groupedData[diagnosis][status] = (groupedData[diagnosis][status] || 0) + 1;
  });

  // Find max value for scaling bar heights
  const maxCount = Math.max(
    ...Object.values(groupedData).flatMap((statuses) =>
      Object.values(statuses)
    ),
    1
  );

  const statusColors = {
    pending: "bg-yellow-500",
    completed: "bg-green-500",
    cancelled: "bg-red-500",
    default: "bg-gray-500",
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Cases by Diagnosis & Status
      </h2>

      <div className="flex gap-8 overflow-x-auto">
        {Object.entries(groupedData).map(([diagnosis, statuses]) => (
          <div key={diagnosis} className="flex flex-col items-center">
            <div className="flex items-end gap-2 h-64">
              {Object.entries(statuses).map(([status, count]) => (
                <div
                  key={status}
                  className={`w-10 ${
                    statusColors[status] || statusColors.default
                  } rounded-t-lg text-white flex items-end justify-center`}
                  style={{
                    height: `${(count / maxCount) * 100}%`,
                    minHeight: "20px",
                  }}
                  title={`${status}: ${count}`}
                >
                  {count}
                </div>
              ))}
            </div>
            <span className="mt-2 text-center w-24 text-sm">{diagnosis}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex gap-4 justify-center">
        {Object.keys(statusColors).map(
          (status) =>
            status !== "default" && (
              <div key={status} className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded ${
                    statusColors[status] || statusColors.default
                  }`}
                ></div>
                <span className="capitalize">{status}</span>
              </div>
            )
        )}
      </div>
    </div>
  );
}

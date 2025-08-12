import CasesChart from "../Charts/CasesChart";
import DoctorsByMonthChart from "../Doctor/DoctorsByMonthChart";

export default function Home() {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-center text-blue-700">
        Hospital Dashboard
      </h1>
      <div className="flex flex-wrap justify-between items-center gap-6">
        <div className="flex-1 min-w-[300px]">
          <CasesChart />
        </div>
        <div className="flex-1 min-w-[300px]">
          <DoctorsByMonthChart />
        </div>
      </div>
    </div>
  );
}
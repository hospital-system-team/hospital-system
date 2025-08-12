import CasesChart from "../Charts/CasesChart";

export default function Home() {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-center text-blue-700">
        Hospital Dashboard
      </h1>
      <CasesChart />
    </div>
  );
}

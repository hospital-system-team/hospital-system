import BedsBarChart from "../components/Charts/BedsBarChart"
import NursesBarChart from "../components/Charts/NursesBarChart"


function Analytics() {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-[#1E90FF] mb-6">Analytics</h1>
      <div className="mb-8">
        <BedsBarChart />
      </div>
      <div className="mb-8">
        <NursesBarChart />
      </div>
    </div>
  )
}

export default Analytics

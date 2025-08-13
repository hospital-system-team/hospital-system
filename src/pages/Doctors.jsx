import { useEffect, useMemo, useState } from "react";
import DeleteDialog from "../components/DeleteDialog";
import DoctorDialog from "../components/Doctor/DoctorDialog";
import DoctorDialogView from "../components/Doctor/DoctorDialogView";
import DoctorTable from "../components/Doctor/DoctorTable";
import { useDoctorsCtx } from "../Context/DoctorContext";
import PatientBarChart from "../Charts/PatientBarChart";

export default function Doctors() {
  const { doctors, fetchDoctors, openView, openAdd, openEdit, askDelete } =
    useDoctorsCtx();

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  // فلترة بناءً على البحث
  const filteredDoctors = useMemo(() => {
    return doctors.filter(
      (doc) =>
        doc.name?.toLowerCase().includes(search.toLowerCase()) ||
        doc.phone?.toLowerCase().includes(search.toLowerCase())
    );
  }, [doctors, search]);

  return (
    <div className="p-6 bg-[var(--light-color)] rounded-2xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <div className="flex gap-2 items-center justify-between">
          <h2 className="text-[20px] font-semibold text-[#1E90FF]">
            Doctors Table
          </h2>

          <input
            type="text"
            placeholder="Search doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[50%] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          onClick={openAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Add Doctor
        </button>
      </div>

      <DoctorTable
        doctors={filteredDoctors}
        openView={openView}
        openEdit={openEdit}
        askDelete={askDelete}
      />

      <DoctorDialog />
      <DoctorDialogView />
      <DeleteDialog />
    </div>
  );
}

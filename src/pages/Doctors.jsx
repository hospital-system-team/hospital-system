import { useEffect } from "react";

import DeleteDialog from "../components/DeleteDialog";
import DoctorDialog from "../components/Doctor/DoctorDialog";
import DoctorDialogView from "../components/Doctor/DoctorDialogView";
import DoctorTable from "../components/Doctor/DoctorTable";
import { useDoctorsCtx } from "../Context/DoctorContext";

export default function Doctors() {
  const { doctors, fetchDoctors, openView, openAdd, openEdit, askDelete } =
    useDoctorsCtx();

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return (
    <div className="p-6 bg-white rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#1E90FF]">Doctors Table</h2>
        <button
          onClick={openAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Doctor
        </button>
      </div>

      <DoctorTable
        doctors={doctors}
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

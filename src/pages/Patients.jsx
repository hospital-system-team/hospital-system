import { Dialog, DialogPanel } from "@headlessui/react";
import { useEffect, useState } from "react";
import { IoAddSharp, IoEyeSharp } from "react-icons/io5";

import AddPatientForm from './AddPatientForm';
import supabase from "../Supabase/supabase_config";


const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchPatients = async () => {
    const { data, error } = await supabase.from("patients").select("*");
    if (error) {
      console.error("Error fetching Patient:", error);
    } else {
      setPatients(data);
      console.log(data)
    }
  };




  useEffect(() => {
    fetchPatients()
  }, []);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="flex items-start justify-center p-6 min-h-screen">
      <div className="w-full max-w-5xl rounded-xl p-6 bg-white shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-[#1E90FF]">
            Patients List
          </h2>
          <button onClick={()=>{openDialog()}} className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center text-lg gap-2">
            <span>add new patient</span>
            <IoAddSharp color="white" />
          </button>
        </div>

        {patients.length === 0 ? (
          <p className="text-center text-gray-500">No patients found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left rounded-lg overflow-hidden">
              <thead className="bg-[#1E90FF] text-white">
                <tr>
                  <th className="px-6 py-3 font-medium">Patient Name</th>
                  <th className="px-6 py-3 font-medium">Age</th>
                  <th className="px-6 py-3 font-medium">Gender</th>
                  <th className="px-6 py-3 font-medium">Created Date</th>
                  <th className="px-6 py-3 font-medium">Phone</th>
                  <th className="px-6 py-3 font-medium">Address</th>
                </tr>
              </thead>
              <tbody className="text-[#1E90FF] bg-white divide-y divide-blue-500/40">
                {patients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-[#f0f8ff] transition duration-150">
                    <td className="px-6 py-4">{patient.name}</td>
                    <td className="px-6 py-4">{patient.age}</td>
                    <td className="px-6 py-4">{patient.gender}</td>
                    <td className="px-6 py-4">{patient.created_at}</td>
                    <td className="px-6 py-4">{patient.phone}</td>
                    <td className="px-6 py-4">{patient.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
             <AddPatientForm/>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default Patients;


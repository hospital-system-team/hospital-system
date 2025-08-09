import { Dialog, DialogPanel } from "@headlessui/react";
import  { useEffect, useState } from "react";
import { IoAddSharp, IoEyeSharp } from "react-icons/io5";
import supabase from "../Supabase/supabase_config";


const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchDoctors = async () => {
    const { data, error } = await supabase.from("doctors").select("*");
    if (error) {
      console.error("Error fetching doctors:", error.message);
    } else {
      setDoctors(data);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const openDialog = (doctor) => {
    setSelectedDoctor(doctor);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedDoctor(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex items-start justify-center p-6 min-h-screen">
      <div className="w-full max-w-5xl rounded-xl p-6 bg-white shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#1E90FF] mb-4">
            Doctors Table
          </h2>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            <IoAddSharp color="white" />
          </button>
        </div>

        {doctors.length === 0 ? (
          <p className="text-center text-gray-500">No doctors found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left rounded-lg overflow-hidden">
              <thead className="bg-[#1E90FF] text-white">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Phone</th>
                  <th className="px-6 py-3 font-medium">Shift</th>
                  <th className="px-6 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="text-[#1E90FF] bg-white divide-y divide-blue-500/40">
                {doctors.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-[#f0f8ff] transition duration-150">
                    <td className="px-6 py-4">{doc.name}</td>
                    <td className="px-6 py-4">{doc.phone || "—"}</td>
                    <td className="px-6 py-4">
                      {doc.shift === "am"
                        ? "Morning"
                        : doc.shift === "pm"
                        ? "Evening"
                        : "Unspecified"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openDialog(doc)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                        <IoEyeSharp />
                      </button>
                    </td>
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
            {selectedDoctor && (
              <div className="space-y-3 text-gray-700">
                <div className="w-[300px] h-[300px] overflow-hidden m-auto my-5">
                  <img
                    src={selectedDoctor.Img}
                    alt={selectedDoctor.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p>
                    <strong>Name:</strong> {selectedDoctor.name}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedDoctor.phone || "—"}
                  </p>
                </div>
                <p className="text-center">
                  <strong>Shift:</strong>
                  {selectedDoctor.shift === "am"
                    ? " Morning"
                    : selectedDoctor.shift === "pm"
                    ? " Evening"
                    : " Unspecified"}
                </p>
              </div>
            )}
            <div className="text-right mt-6">
              <button
                onClick={closeDialog}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default Doctors;

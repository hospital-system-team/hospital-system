import { Dialog, DialogPanel } from "@headlessui/react";
import { useDoctorsCtx } from "../../Context/DoctorContext";

export default function DoctorDialogView() {
  const { isViewOpen, closeView, selectedDoctor, openEdit, askDelete } =
    useDoctorsCtx();

  if (!selectedDoctor) return null;

  return (
    <Dialog open={isViewOpen} onClose={closeView} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <div className="space-y-3 text-gray-700">
            <div className="w-[300px] h-[300px] overflow-hidden m-auto my-5">
              <img
                src={selectedDoctor.img}
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

            <div className="flex items-center justify-end gap-2 pt-4">
              <button
                onClick={() => openEdit(selectedDoctor)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                Edit
              </button>
              <button
                onClick={() => askDelete(selectedDoctor)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Delete
              </button>
              <button
                onClick={closeView}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                Close
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

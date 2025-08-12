import { useContext } from 'react'
import { Dialog, DialogPanel } from "@headlessui/react";
import { ViewDialogContext } from '../Context/ViewDialogContext';
function ViewDialog() {
  const {isDialogOpen,viewData,closeViewDialog} = useContext(ViewDialogContext);
  
  return (
    <Dialog open={isDialogOpen} onClose={closeViewDialog} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          {viewData && (
            <div className="space-y-3 text-gray-700">
              <div className="w-[200px] h-[200px] overflow-hidden m-auto mb-4">
                <img
                  src={viewData.Img}
                  alt={viewData.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex justify-between">
                <p><strong>Name:</strong> {viewData.name}</p>
                <p><strong>Phone:</strong> {viewData.phone || "—"}</p>
              </div>
              <p className="text-center">
                <strong>Shift:</strong>{" "}
                {viewData.shift === "am"
                  ? "Morning"
                  : viewData.shift === "pm"
                    ? "Evening"
                    : "Unspecified"}
              </p>
            </div>
          )}
          <div className="text-right mt-6">
            <button
              onClick={closeViewDialog}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 cursor-pointer">
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default ViewDialog

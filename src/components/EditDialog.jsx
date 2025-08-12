import React, { useContext, useEffect, useState } from 'react'
import { Dialog, DialogPanel } from "@headlessui/react";
import { EditDialogContext } from '../Context/EditDialogContext';
function EditDialog() {
  const { isDialogOpen, closeDialog, editType, editData , setBeds } = useContext(EditDialogContext);  {/* Destructure the context values */ }
  const [bedId, setBedId] = useState('');
  const [bedStatus, setBedStatus] = useState('');
  const [bedRoom, setBedRoom] = useState('');
  useEffect(() => {
    if (editType === "bed" && editData) {
      setBedId(editData.id || '');
      setBedStatus(editData.status || '');
      setBedRoom(editData.room || '');
    }
  }, [editData, editType]);
  function handleSubmit(e) {
    e.preventDefault();

    if (editType === "bed") {
      setBeds((prevBeds) =>
        prevBeds.map((bed) =>
          bed.id === editData.id
            ? { ...bed, id: bedId, status: bedStatus, room: bedRoom }
            : bed
        )
      );
    }

    closeDialog();
  }

  return (
    <Dialog open={isDialogOpen} onClose={closeDialog} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">
            Edit {editType === "nurse" ? "Nurse" : "Bed"}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {editType === "nurse" ? (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full border p-2 rounded"
                />
                <select className="w-full border p-2 rounded">
                  <option value="am">Morning</option>
                  <option value="pm">Evening</option>
                </select>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Bed ID"
                  className="w-full border p-2 rounded"
                  value={bedId}
                  onChange={(e) => setBedId(e.target.value)}
                />
                <select
                  className="w-full border p-2 rounded"
                  value={bedStatus}
                  onChange={(e) => setBedStatus(e.target.value)}
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                </select>
                <input
                  type="text"
                  placeholder="Room"
                  className="w-full border p-2 rounded"
                  value={bedRoom}
                  onChange={(e) => setBedRoom(e.target.value)}
                />
              </>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={closeDialog}
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default EditDialog

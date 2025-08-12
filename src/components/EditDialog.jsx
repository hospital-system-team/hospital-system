import React, { useContext, useEffect, useState } from 'react'
import { Dialog, DialogPanel } from "@headlessui/react";
import { EditDialogContext } from '../Context/EditDialogContext';
function EditDialog({ onUpdateInUI }) {
  const { isDialogOpen, closeDialog, editType, editData,handleEdit } = useContext(EditDialogContext); {/* Destructure the context values */ }
  // State for bed fields
  const [bedStatus, setBedStatus] = useState('');
  const [bedRoom, setBedRoom] = useState('');
  // State for nurse fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [shift, setShift] = useState('');
  useEffect(() => {
    // Set initial values based on editType and editData
    // If editType is "bed", set bed fields; if "nurse", set nurse fields
  if (editType === "bed" && editData) {
    setBedStatus(editData.status || '');
    setBedRoom(editData.room || '');
  } else if (editType === "nurse" && editData) {
    setName(editData.name || '');
    setPhone(editData.phone || '');
    setShift(editData.shift || '');
  }
}, [editData, editType]);
  // Handle form submission
  // This function will be called when the form is submitted
  async function handleSubmit(e) {
    e.preventDefault();// prevent page reload
    // Prepare the updated item based on editType
    const updatedItem = editType === "nurse"
      ? { id: editData.id, name, phone, shift }
      : { id: editData.id, room: bedRoom, is_occupied: bedStatus === "occupied" };
     // Call the handleEdit function from the context to update in Database
      try {
      const updatedData = await handleEdit(updatedItem);
      if (updatedData && onUpdateInUI) {    // If the update is successful, call onUpdateInUI callback if provided
        onUpdateInUI(updatedData);
      }
    } catch (error) {
      console.error("Error editing item:", error);
    }

    closeDialog(); // Close the dialog after successful update
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full border p-2 rounded"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <select
                  className="w-full border p-2 rounded"
                  value={shift}
                  onChange={(e) => setShift(e.target.value)}
                >
                  <option value="am">Morning</option>
                  <option value="pm">Evening</option>
                </select>
              </>
            ) : (
              <>
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

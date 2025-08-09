import React from 'react'
import { Dialog, DialogPanel } from "@headlessui/react";
function EditDialog({ isDialogOpen, closeDialog, type }) {
  return (
    <Dialog open={isDialogOpen} onClose={closeDialog} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">
            Edit {type === "nurse" ? "Nurse" : "Bed"}
          </h2>
          <form className="space-y-4">
            {type === "nurse" ? (
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
                />
                <select className="w-full border p-2 rounded">
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                </select>
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

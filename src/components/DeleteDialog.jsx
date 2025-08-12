import { Dialog, DialogPanel } from "@headlessui/react";
import { useContext } from "react";
import { DeleteDialogContext } from "../Context/DeleteDialogContext";
function DeleteDialog() {
  const {isDeleteDialogOpen,deleteData,deleteType,closeDeleteDialog,handleDelete} = useContext(DeleteDialogContext);
  return (
    <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
          <p>
            Are you sure you want to delete this {deleteType === "bed" ? "bed" : "nurse"}?
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={closeDeleteDialog}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleDelete(deleteData?.id);
                console.log('from button ' ,deleteData?.id);
                closeDeleteDialog();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default DeleteDialog

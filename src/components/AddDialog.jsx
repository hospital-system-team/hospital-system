import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useContext, useEffect, useState } from 'react';
import { AddDialogContext } from '../Context/AddDialogContext';
function AddDialog({ onAddSuccess }) {
  const { isAddDialogOpen, closeAddDialog, addType, handleAdd } = useContext(AddDialogContext);
  const [formData, setFormData] = useState({ // State to store form inputs
    name: '',
    phone: '',
    shift: '',
    room: '',
    status: '',
  });
  useEffect(() => {// Clear form data when addType changes (nurse or bed)
    setFormData({
      name: '',
      shift: '',
      room: '',
      status: '',
    });
  }, [addType]);
  function handleChange(e) {
    const { name, value } = e.target;
    // console.log(e.target.name, e.target.value);
    setFormData((prev) => {
      // console.log('prev:', prev, 'name:', name, 'value:', value);
      return ({ ...prev, [name]: value })
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();// prevent page reload
    let filteredData = {};
    // Prepare data object based on addType
    if (addType === 'nurse') {
      filteredData = {
        name: formData.name,
        phone: formData.phone,
        shift: formData.shift,
      };
    } else if (addType === 'bed') {
      filteredData = {
        room: formData.room,
        is_occupied: formData.status.trim() === "occupied" ? true : false,
      };
    }
    try {
      // Try to add the new item to the database
      const addedItem = await handleAdd(filteredData); // Call handleAdd function from context to add data
      // if the item was not added successfully, log an error and return
      if (!addedItem) {
        console.log('Failed to add item');
        return;
      }
      // If the item was added successfully, call onAddSuccess callback if provided
      if (onAddSuccess) {
        onAddSuccess(addedItem);
      }
      // Close the dialog after successful addition
      closeAddDialog();
    } catch (error) {
      console.error('Add error:', error);
    }
  }
  return (
    <Dialog
      open={isAddDialogOpen}
      onClose={closeAddDialog}
      className="fixed inset-0 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm z-50"
    >
      <DialogPanel className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        <DialogTitle className="text-xl font-semibold mb-6 p-3 bg-[#1E90FF] text-white rounded-md shadow">
          Add {addType === 'nurse' ? 'Nurse' : 'Bed'}
        </DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-5">
          {addType === 'nurse' && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
              <select
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="">Select Shift</option>
                <option value="am">Morning (AM)</option>
                <option value="pm">Evening (PM)</option>
              </select>
            </>
          )}

          {addType === 'bed' && (
            <>
              <input
                type="text"
                name="room"
                placeholder="Room"
                value={formData.room || ''}
                onChange={handleChange}
                className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E90FF]  transition"
                required
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E90FF] transition"
                required
              >
                <option value="">Select Status</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
              </select>
            </>
          )}
          <div className="flex flex-wrap justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={closeAddDialog}
              className="flex-grow sm:flex-grow-0 sm:w-[130px] px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-grow sm:flex-grow-0 sm:w-[130px] px-5 py-2 bg-[#1E90FF] text-white rounded-md hover:bg-blue-700 transition text-center"
            >
              Add
            </button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
}

export default AddDialog;

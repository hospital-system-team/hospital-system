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
    <Dialog open={isAddDialogOpen} onClose={closeAddDialog} className="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <DialogTitle className="text-lg font-semibold mb-4">
          Add {addType === 'nurse' ? 'Nurse' : 'Bed'}
        </DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          {addType === 'nurse' && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
              <input
                type="text"
                name="shift"
                placeholder="Shift"
                value={formData.shift}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
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
                className="border p-2 w-full rounded"
                required
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              >
                <option value="">Status</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
              </select>
            </>
          )}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeAddDialog}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
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

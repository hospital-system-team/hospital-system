import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useContext, useEffect, useState } from 'react';
import { AddDialogContext } from '../Context/AddDialogContext';

function AddDialog({ onSubmit }){
  const { isAddDialogOpen, closeAddDialog, addType } = useContext(AddDialogContext);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    shift: '',
    bedNumber: '',
    room: '',
    status: '',
  });
  useEffect(() => {
    setFormData({
      name: '',
      phone: '',
      shift: '',
      bedNumber: '',
      room: '',
      status: '',
    });
  }, [addType]);
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
    closeAddDialog();
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
                name="bedNumber"
                placeholder="Bed ID"
                value={formData.bedNumber}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
              <input
                type="text"
                name="room"
                placeholder="Room"
                value={formData.room || ''}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
              <input
                type="text"
                name="status"
                placeholder="Status"
                value={formData.status}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
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

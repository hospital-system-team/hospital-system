import React, { useState } from 'react'
import { IoEyeSharp, IoTrashSharp, IoPencil, IoAddSharp } from "react-icons/io5";
import EditDialog from '../components/EditDialog';
import DeleteDialog from '../components/DeleteDialog';
function BedsTable() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const openDeleteDialog = () => setIsDeleteDialogOpen(true);
  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  
  return (
    <section className="flex justify-center">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-[#1E90FF] ">
            Beds Table
          </h2>
          <button className=" px-4 py-3 bg-blue-500 text-white rounded-md flex items-center justify-center">
            <IoAddSharp color="white" />
          </button>
        </div>
        <div className="overflow-x-auto rounded border border-gray-300 shadow-sm ">
          <table className="min-w-full divide-y-2 border-separate border-spacing-y-4">
            <thead className="bg-[#1E90FF] text-white">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap font-medium">Bed ID</th>
                <th className="px-6 py-4 whitespace-nowrap font-medium">Room</th>
                <th className="px-6 py-4 whitespace-nowrap font-medium">Status</th>
                <th className="px-6 py-4 whitespace-nowrap font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="*:text-gray-900 *:first:font-medium *:text-center ">
                <td className="px-6 py-4 whitespace-nowrap">B001</td>
                <td className="px-6 py-4 whitespace-nowrap">101</td>
                <td className="px-6 py-4 whitespace-nowrap">Available</td>
                <td className="px-6 py-2 whitespace-wrap flex gap-2 justify-center">
                  <button className="w-[40px] h-[30px] bg-[#f00] text-white flex items-center justify-center gap-2 px-3 py-2 rounded hover:bg-red-600 cursor-pointer" onClick={() => { openDeleteDialog(); }}>
                    <IoTrashSharp className="text-lg" />
                  </button>
                  <button className="w-[40px] h-[30px] bg-[#1E90FF] text-white flex items-center justify-center gap-2 px-3 py-2 rounded hover:bg-[#1e8fffbd] cursor-pointer" onClick={openDialog}>
                    <IoPencil className="text-lg" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <EditDialog isDialogOpen={isDialogOpen} closeDialog={closeDialog} type="bed" />
      <DeleteDialog isDeleteDialogOpen={isDeleteDialogOpen} closeDeleteDialog={closeDeleteDialog} type="bed" />
      </section>
  )
}

export default BedsTable

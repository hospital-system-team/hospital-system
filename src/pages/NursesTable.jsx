import React, { useState } from "react";
import { IoEyeSharp, IoTrashSharp, IoPencil, IoAddSharp } from "react-icons/io5";
import ViewDialog from "../components/ViewDialog";
import DeleteDialog from "../components/DeleteDialog";
import EditDialog from "../components/EditDialog";
function NursesTable() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedNurse, setSelectedNurse] = useState({
  name: "Noorhan Taha",
  phone: "0123456789",
  shift: "am",
  Img: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
});

  const openDeleteDialog = () => setIsDeleteDialogOpen(true);
  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <section className="flex justify-center">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-[#1E90FF] ">
            Nurses Table
          </h2>
          <button className=" px-4 py-3 bg-blue-500 text-white rounded-md flex items-center justify-center">
            <IoAddSharp color="white" />
          </button>
        </div>
        <div className="overflow-x-auto rounded border border-gray-300 shadow-sm ">
          <table className="min-w-full divide-y-2 border-separate border-spacing-y-4">
            <thead className="bg-[#1E90FF] text-white">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap font-medium">Name</th>
                <th className="px-6 py-4 whitespace-nowrap font-medium">Phone</th>
                <th className="px-6 py-4 whitespace-nowrap font-medium">Shift</th>
                <th className="px-6 py-4 whitespace-nowrap font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="*:text-gray-900 *:first:font-medium *:text-center ">
                <td className="px-6 py-2 whitespace-nowrap">Asmaa</td>
                <td className="px-6 py-2 whitespace-nowrap">01111111111</td>
                <td className="px-6 py-2 whitespace-nowrap">Morning</td>
                <td className="px-6 py-2 whitespace-wrap flex gap-2 justify-center">
                  <button className="w-[40px] h-[30px] bg-[#f00] text-white flex items-center justify-center gap-2 px-3 py-2 rounded hover:bg-red-600 cursor-pointer" onClick={() => {openDeleteDialog(); }}>
                    <IoTrashSharp className="text-lg" />
                  </button>
                  <button className="w-[40px] h-[30px] bg-[#1E90FF] text-white flex items-center justify-center gap-2 px-3 py-2 rounded hover:bg-[#1e8fffbd] cursor-pointer" onClick={openDialog}>
                    <IoPencil className="text-lg" />
                  </button>
                  <button className="w-[40px] h-[30px] bg-[#1E90FF] text-white flex items-center justify-center gap-2 px-3 py-2 rounded hover:bg-[#1e8fffbd] cursor-pointer" onClick={() => {setIsViewDialogOpen(true);}}>
                    <IoEyeSharp className="text-lg"/>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <EditDialog isDialogOpen={isDialogOpen} closeDialog={closeDialog} type="nurse" />
      <DeleteDialog isDeleteDialogOpen={isDeleteDialogOpen} closeDeleteDialog={closeDeleteDialog} type="nurse" />
      <ViewDialog isViewDialogOpen={isViewDialogOpen} setIsViewDialogOpen={setIsViewDialogOpen} selectedNurse={selectedNurse} />
    </section>
  )
}
export default NursesTable

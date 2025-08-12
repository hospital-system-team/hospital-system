import { useContext, useEffect, useState } from "react";
import { IoEyeSharp, IoTrashSharp, IoPencil, IoAddSharp } from "react-icons/io5";
import ViewDialog from "../components/ViewDialog";
import DeleteDialog from "../components/DeleteDialog";
import EditDialog from "../components/EditDialog";
import supabase from "../Supabase/supabase_config";
import { EditDialogContext } from "../Context/EditDialogContext";
import { DeleteDialogContext } from "../Context/DeleteDialogContext";
import { ViewDialogContext } from "../Context/ViewDialogContext";
import AddDialog from "../components/AddDialog";
import { AddDialogContext } from "../Context/AddDialogContext";

function NursesTable() {
  const [nurses, setNurses] = useState([]);
  const { openDialog } = useContext(EditDialogContext);
  const {openDeleteDialog} = useContext(DeleteDialogContext);
  const { openViewDialog } = useContext(ViewDialogContext);
  const { openAddDialog } = useContext(AddDialogContext);
  async function fetchNurses() {
    const { data, error } = await supabase.from('nurses').select('*');
    if (error) {
      console.error('Error fetching Nurses:', error);
    } else {
      setNurses(data);
      console.log('data:', data);
    }
  }
  async function handleAddNurse(newNurse) {
    const { data, error } = await supabase.from('nurses').insert([newNurse]);
    if (error) {
      console.error('Error adding nurse:', error);
    } else {
      setNurses((prev) => [...prev, ...data]);
    }
  }
  useEffect(() => {
    fetchNurses();
  }, []);
  return (
    <section className="flex justify-center p-6">
      <div className="container w-full max-w-5xl rounded-xl p-6 bg-white shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-[#1E90FF] ">
            Nurses Table
          </h2>
          <button className=" px-4 py-3 bg-blue-500 text-white rounded-md flex items-center justify-center" onClick={() => openAddDialog('nurse')}>
            <IoAddSharp color="white" />
          </button>
        </div>
        {nurses.length === 0 ? (
          <p className="text-center text-gray-500">No nurses found.</p>
        ) : (
          <div className="overflow-x-auto rounded border border-gray-300 shadow-sm ">
            <table className="min-w-full divide-y-2 border-separate border-spacing-y-4">
              <thead className="bg-[#1E90FF] text-white">
                <tr >
                  <th className="px-6 py-4 whitespace-nowrap font-medium">Name</th>
                  <th className="px-6 py-4 whitespace-nowrap font-medium">Phone</th>
                  <th className="px-6 py-4 whitespace-nowrap font-medium">Shift</th>
                  <th className="px-6 py-4 whitespace-nowrap font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {nurses.map((nurse) => (<tr key={nurse.id} className="*:text-gray-900 *:first:font-medium *:text-center ">
                  <td className="px-6 py-2 whitespace-nowrap">{nurse.name}</td>
                  <td className="px-6 py-2 whitespace-nowrap">{nurse.phone}</td>
                  <td className="px-6 py-2 whitespace-nowrap">{nurse.shift}</td>
                  <td className="px-6 py-2 whitespace-wrap flex gap-2 justify-center">
                    <button className="w-[40px] h-[30px] bg-[#f00] text-white flex items-center justify-center gap-2 px-3 py-2 rounded hover:bg-red-600 cursor-pointer" onClick={() => openDeleteDialog("nurse", nurse)}>
                      <IoTrashSharp className="text-lg" />
                    </button>
                    <button className="w-[40px] h-[30px] bg-[#1E90FF] text-white flex items-center justify-center gap-2 px-3 py-2 rounded hover:bg-[#1e8fffbd] cursor-pointer" onClick={() => openDialog('nurse', nurse)}>
                      <IoPencil className="text-lg" />
                    </button>
                    <button className="w-[40px] h-[30px] bg-[#1E90FF] text-white flex items-center justify-center gap-2 px-3 py-2 rounded hover:bg-[#1e8fffbd] cursor-pointer" onClick={() => openViewDialog(nurse)}>
                      <IoEyeSharp className="text-lg" />
                    </button>
                  </td>
                </tr>))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <AddDialog
        onSubmit={handleAddNurse}
      />
      <EditDialog />
      <DeleteDialog />
      <ViewDialog />
    </section>
  )
}
export default NursesTable

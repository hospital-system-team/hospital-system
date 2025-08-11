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
  const { openDeleteDialog , closeDeleteDialog , isDeleteDialogOpen } = useContext(DeleteDialogContext);
  const { openViewDialog } = useContext(ViewDialogContext);
  const { openAddDialog } = useContext(AddDialogContext);
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  async function fetchNurses() {
    await supabase.auth.setSession({
      access_token: access_token,
      refresh_token: refresh_token,
    });
    const { data, error } = await supabase.from('nurses').select('*');
    if (error) {
      console.error('Error fetching Nurses:', error.message);
    } else {
      setNurses(data);
      console.log('data:', data);
    }
  }
    useEffect(() => {
    fetchNurses();
  }, []);
  const addNurseToUI = (newNurse) => {
  setNurses((prev) => [newNurse, ...prev]);
};
  const removeNurseFromUI = (id) => {
    setNurses((prev) => prev.filter((nurse) => nurse.id !== id));
  };
  const updateNurseInUI = (updatedNurse) => {
  setNurses((prev) => {
    console.log('prev:', prev, 'updatedNurse:', updatedNurse);
    return prev.map((nurse) =>
      nurse.id === updatedNurse.id ? updatedNurse : nurse
    );
  });
};
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
          <div className="overflow-x-auto ">
            <table className="min-w-full text-sm rounded-lg overflow-hidden">
              <thead className="bg-[#1E90FF] text-white">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap font-medium">Name</th>
                  <th className="px-6 py-4 whitespace-nowrap font-medium">Phone</th>
                  <th className="px-6 py-4 whitespace-nowrap font-medium">Shift</th>
                  <th className="px-6 py-4 whitespace-nowrap font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {nurses && nurses.length > 0 && nurses.map((nurse) =>{ 
                  console.log('nursemap:', nurse);
                  return(<tr key={nurse.id} className="*:text-gray-900 *:first:font-medium *:text-center ">
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
                </tr>)})}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <AddDialog onAddSuccess={addNurseToUI} />
      <EditDialog onUpdateInUI={updateNurseInUI} />
      <DeleteDialog onDeleteFromUI={removeNurseFromUI}/>
      <ViewDialog />
    </section>
  )
}
export default NursesTable
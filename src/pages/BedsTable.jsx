import { useContext, useEffect, useState } from 'react'
import { IoTrashSharp, IoPencil, IoAddSharp } from "react-icons/io5";
import supabase from "../Supabase/supabase_config";
import EditDialog from '../components/EditDialog';
import DeleteDialog from '../components/DeleteDialog';
import { EditDialogContext } from '../Context/EditDialogContext';
import { DeleteDialogContext } from '../Context/DeleteDialogContext';
import AddDialog from '../components/AddDialog';
import { AddDialogContext } from '../Context/AddDialogContext';
function BedsTable() {
  const [beds, setBeds] = useState([]);
  const { openDeleteDialog } = useContext(DeleteDialogContext);
  const { openAddDialog } = useContext(AddDialogContext);
  const { openDialog } = useContext(EditDialogContext); 
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  async function fetchBeds() {
    await supabase.auth.setSession({
      access_token: access_token,
      refresh_token: refresh_token,
    });
    const { data, error } = await supabase.from('beds').select('*');
    if (error) {
      console.error('Error fetching Nurses:', error.message);
    } else {
      setBeds(data);
      console.log('data:', data);
    }
  }
  useEffect(() => {
    fetchBeds();
  }, []);
  const addBedToUI = (newBed) => {
  setBeds((prev) => [newBed, ...prev]);
};
  const removeBedFromUI = (id) => {
    setBeds((prev) => prev.filter((bed) => bed.id !== id));
  };
  const updateBedsInUI = (updatedBed) => {
  setBeds((prev) =>
    prev.map((bed) =>
      bed.id === updatedBed.id ? updatedBed : bed
    )
  );
};

  return (
    <section className="flex justify-center p-6">
      <div className="container w-full max-w-5xl rounded-xl p-6 bg-white shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-[#1E90FF] ">
            Beds Table
          </h2>
          <button className=" px-4 py-3 bg-blue-500 text-white rounded-md flex items-center justify-center" onClick={() => openAddDialog('bed')}>
            <IoAddSharp color="white" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm rounded-lg overflow-hidden">
            <thead className="bg-[#1E90FF] text-white">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap font-medium">Room</th>
                <th className="px-6 py-4 whitespace-nowrap font-medium">Status</th>
                <th className="px-6 py-4 whitespace-nowrap font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {beds.map((bed) => (
                <tr key={bed.id} className="*:text-gray-900 *:first:font-medium *:text-center ">
                  <td className="px-6 py-4 whitespace-nowrap">{bed.room}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {bed.is_occupied ? "Occupied" : "Available"}
                  </td>
                  <td className="px-6 py-2 whitespace-wrap flex gap-2 justify-center">
                    <button
                      className="w-[40px] h-[30px] bg-[#f00] text-white flex items-center justify-center gap-2 px-3 py-2 rounded hover:bg-red-600 cursor-pointer"
                      onClick={() => openDeleteDialog("bed", bed)}
                    >
                      <IoTrashSharp className="text-lg" />
                    </button>
                    <button
                      className="w-[40px] h-[30px] bg-[#1E90FF] text-white flex items-center justify-center gap-2 px-3 py-2 rounded hover:bg-[#1e8fffbd] cursor-pointer"
                      onClick={() => openDialog('bed', bed)}
                    >
                      <IoPencil className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddDialog onAddSuccess={addBedToUI}/>
      <EditDialog onUpdateInUI={updateBedsInUI} />
      <DeleteDialog onDeleteFromUI={removeBedFromUI} />
    </section>
  )
}

export default BedsTable
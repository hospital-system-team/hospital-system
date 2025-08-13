import { useContext, useEffect, useState } from 'react'
import { IoTrashSharp, IoPencil, IoAddSharp } from "react-icons/io5";
import supabase from "../Supabase/supabase_config";
import EditDialog from '../components/EditDialog';
import DeleteDialog from '../components/DeleteDialog';
import { EditDialogContext } from '../Context/EditDialogContext';
import { DeleteDialogContext } from '../Context/DeleteDialogContext';
import AddDialog from '../components/AddDialog';
import { AddDialogContext } from '../Context/AddDialogContext';
import BedsBarChart from '../components/Charts/BedsBarChart';
function BedsTable() {
  const [beds, setBeds] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
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
  // function to add a new bed to the UI after successful addition
  const addBedToUI = (newBed) => {
    setBeds((prev) => [newBed, ...prev]);
  };
  // function to remove a bed from the UI after successful deletion
  const removeBedFromUI = (id) => {
    setBeds((prev) => prev.filter((bed) => bed.id !== id));
  };
  // function to update a bed in the UI after successful update
  const updateBedsInUI = (updatedBed) => {
    setBeds((prev) =>
      prev.map((bed) =>
        bed.id === updatedBed.id ? updatedBed : bed
      )
    );
  };
  // function to filter beds based on status
  const filteredBeds = beds.filter((bed) => {
    if (filterStatus === "All") return true;
    if (filterStatus === "Available") return bed.is_occupied === false;
    if (filterStatus === "Occupied") return bed.is_occupied === true;
    return true;
  });
  return (
    <section className="flex justify-center p-6">
      <div className="container w-full max-w-5xl rounded-xl p-6 bg-[var(--light-color)] shadow">
        <div className="flex items-center justify-between flex-wrap mb-4">
          <h2 className="text-2xl font-semibold text-[#1E90FF] ">
            Beds Table
          </h2>
          <button className="max-w-full w-[130px] px-4 py-3 bg-blue-500 text-white rounded-md flex items-center justify-center" onClick={() => openAddDialog('bed')}>
            <span className="mr-2">Add Bed</span>  
            <IoAddSharp color="white" />
          </button>
        </div>
        <div className="mb-4 flex items-center gap-3 flex-wrap">
          <label htmlFor="statusFilter" className="font-semibold text-[var(--text-color)] min-w-max">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="max-w-full w-[100px] border border-gray-300 rounded-md pl-2 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
          >
            <option value="All">All</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
          </select>
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
              {filteredBeds.map((bed) => (
                <tr
                  key={bed.id}
                  className="text-[var(--text-color)] *:first:font-medium *:text-center"
                >
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
                      onClick={() => openDialog("bed", bed)}
                    >
                      <IoPencil className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredBeds.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    No beds found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AddDialog onAddSuccess={addBedToUI} />
      <EditDialog onUpdateInUI={updateBedsInUI} />
      <DeleteDialog onDeleteFromUI={removeBedFromUI} />
    </section>
  )
}

export default BedsTable
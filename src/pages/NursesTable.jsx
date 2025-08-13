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
import { FiSearch } from 'react-icons/fi';

function NursesTable() {
  const [nurses, setNurses] = useState([]);
  const [filterShift, setFilterShift] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { openDialog } = useContext(EditDialogContext);
  const { openDeleteDialog } = useContext(DeleteDialogContext);
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
  // function to add a new nurse to the UI after successful addition
  const addNurseToUI = (newNurse) => {
    setNurses((prev) => [newNurse, ...prev]);
  };
  // function to remove a nurse from the UI after successful deletion
  const removeNurseFromUI = (id) => {
    setNurses((prev) => prev.filter((nurse) => nurse.id !== id));
  };
  // function to update a nurse in the UI after successful update
  const updateNurseInUI = (updatedNurse) => {
    setNurses((prev) => {
      console.log('prev:', prev, 'updatedNurse:', updatedNurse);
      return prev.map((nurse) =>
        nurse.id === updatedNurse.id ? updatedNurse : nurse
      );
    });
  };
  //function to filter nurses based on shift and search term
  const filteredNurses = nurses.filter((nurse) => {
    const matchesShift = filterShift === "All" || nurse.shift === filterShift;
    const matchesSearch = nurse.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesShift && matchesSearch;
  });
  return (
    <section className="flex justify-center p-6">
      <div className="container w-full max-w-5xl rounded-xl p-6 bg-[var(--light-color)] shadow">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <h2 className="text-2xl font-semibold text-[#1E90FF] w-full sm:w-auto">
            Nurses Table
          </h2>
          <button
            className="max-w-full w-[130px] px-4 py-3 bg-blue-500 text-white rounded-md flex items-center justify-center whitespace-nowrap"
            onClick={() => openAddDialog('nurse')}
          >
            <span className="mr-2">Add Nurse</span>
            <IoAddSharp color="white" />
          </button>
        </div>
        <div className="mb-4 flex justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <label
              htmlFor="shiftFilter"
              className="font-semibold bg-[var(--light-color)] min-w-max"
            >
              Filter by Shift:
            </label>
            <select
              id="shiftFilter"
              value={filterShift}
              onChange={(e) => setFilterShift(e.target.value)}
              className="max-w-full w-[130px] border border-gray-300 rounded-md pl-0 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            >
              <option value="All">All</option>
              <option value="am">Morning (AM)</option>
              <option value="pm">Evening (PM)</option>
            </select>
          </div>
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              id="searchInput"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Name..."
              className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        {filteredNurses.length === 0 ? (
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
                {filteredNurses.length > 0 && filteredNurses.map((nurse) => {
                  console.log('nursemap:', nurse);
                  return (<tr key={nurse.id} className="text-[var(--text-color)] *:first:font-medium *:text-center ">
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
                  </tr>)
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <AddDialog onAddSuccess={addNurseToUI} />
      <EditDialog onUpdateInUI={updateNurseInUI} />
      <DeleteDialog onDeleteFromUI={removeNurseFromUI} />
      <ViewDialog />
    </section>
  )
}
export default NursesTable
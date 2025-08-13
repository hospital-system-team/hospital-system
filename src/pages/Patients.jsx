import { Dialog, DialogPanel } from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import { IoAddSharp, IoEyeSharp, IoPencil, IoTrashSharp } from "react-icons/io5";
import AddPatientForm from './AddPatientForm';
import { DeleteDialogContext } from "../Context/DeleteDialogContext";
import DeleteDialog from "../components/DeleteDialog";
import { FiSearch } from "react-icons/fi";
import { UserContext } from '../Context/UserContext';
import { PatientsContext } from "../Context/PatientsContext";



const Patients = () => {
 
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchedPatient, setSearchedPatient] = useState([]);

  let {patients,fetchPatients,setEditPatient,setaddOrUpdateFlag} = useContext(PatientsContext)
  let {openDeleteDialog}=useContext(DeleteDialogContext)
  let {role,checkRole}=useContext(UserContext)

  useEffect(() => {
    fetchPatients()
    checkRole()
  }, []);

   useEffect(() => {
    fetchPatients()
  }, [role]);
  
    useEffect(() => {
      closeDialog()
  }, [patients]);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const addPatient =()=>{
    setEditPatient({})
    setaddOrUpdateFlag("add")
    openDialog()

  }

  const editPatient =(patient)=>{
    setEditPatient(patient)
    setaddOrUpdateFlag("update")
    openDialog()
  }


  const searchPatient =(e)=>{
     let searchedPatient=patients.filter((patient)=>{
        return  patient.name.toLowerCase().includes(e.target.value.toLowerCase())
      })
      setSearchedPatient(searchedPatient)
  }
  return (
    <>
    <div className="flex items-start justify-center p-6 ">
      <div className="w-full max-w-5xl rounded-xl p-6 bg-[var(--light-color)]  shadow">
        <h2 className="text-2xl font-bold text-[#1E90FF] py-5">
            Patients List
        </h2>
        <div className="md:flex items-center justify-between my-4 gap-5">
          <div className={`relative ${role=="admin"?'md:w-1/2':'w-full'}`}>
            <input
                        type="text"
                        placeholder="Search..."
                        autoFocus
                        onChange={(e) => searchPatient(e)}
                        className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 outline-none 
                                   bg-[var(--light-color)] text-[var(--text-color)]"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
           </div>
            <button onClick={()=>{addPatient()}} disabled={role !== 'admin'} className="w-full mt-3 md:mt-0 md:w-1/2 px-4 py-2 bg-blue-500 text-white rounded flex items-center font-semibold gap-2 disabled:bg-blue-200">
              <IoAddSharp color="white"  />
              <span>add new patient</span>
           </button>
        </div>

        {patients.length === 0 ? (
          <p className="text-center text-gray-500">No patients found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left rounded-lg overflow-hidden">
              <thead className="bg-[#1E90FF] text-white">
                <tr>
                  <th className="px-6 py-5  text-lg">ID</th>
                  <th className="px-6 py-5  text-lg">Patient Name</th>
                  <th className="pe-6 py-5  text-lg">Age</th>
                  <th className="pe-6 py-3  text-lg">Gender</th>
                  <th className="px-6 py-3  text-lg">Created Date</th>
                  <th className="px-6 py-3  text-lg">Phone</th>
                  <th className="px-6 py-3  text-lg">Address</th>
                  {role=="admin"?<th className="px-6 py-3  text-lg">Action</th>:""}
                </tr>
              </thead>
              <tbody className="text-[#1E90FF] bg-[var(--light-color)] divide-y divide-blue-500/40">
                {(searchedPatient.length>=1?searchedPatient:patients).map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-[#f0f8ff] transition duration-150">
                      <td className="p-5">{patient.id}</td>
                    <td className="p-5">{patient.name}</td>
                    <td className="p-5">{patient.age}</td>
                    <td className="p-5">{patient.gender}</td>
                    <td className="p-5">{patient.created_at}</td>
                    <td className="p-5">{patient.phone}</td>
                    <td className="p-5">{patient.address}</td>
                    {role=="admin"?
                    (<td className="px-6 py-2 whitespace-wrap">
                      <div className="flex gap-2 justify-center items-center">
                         <button onClick={() => openDeleteDialog("patients", patient)} className="w-[40px] h-[30px] bg-[#f00] text-white flex items-center justify-center gap-2 px-3 py-2 rounded hover:bg-red-600 cursor-pointer">
                            <IoTrashSharp className="text-lg" />
                          </button>
                          <button onClick={()=>{editPatient(patient)}} className="w-[40px] h-[30px] bg-[#1E90FF] text-white flex items-center justify-center gap-2 px-3 py-2 rounded hover:bg-[#1e8fffbd] cursor-pointer">
                            <IoPencil className="text-lg" />
                          </button>
                      </div>          
                     </td>) 
                    :""} 

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <AddPatientForm/>
          </DialogPanel>
        </div>
      </Dialog>

      <DeleteDialog onDeleteFromUI={fetchPatients} />
    </div>
    </>
  );
};

export default Patients;


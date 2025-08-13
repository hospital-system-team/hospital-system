
import { createContext, useEffect, useState } from 'react'
import supabase from '../Supabase/supabase_config';
import { toast } from 'react-toastify';



export let PatientsContext = createContext()

export default function PatientsContextProvider(props) {
   const [patients, setPatients] = useState([]);
   const [patientsNumber, setPatientsNumber] = useState("");
   const [editPatient, setEditPatient] = useState({});
   const [addOrUpdateFlag, setaddOrUpdateFlag] = useState("");

  const fetchPatients = async () => {
    try{
      const { data, error } = await supabase.from("patients").select("*");

    if (error) {
      toast.error("Error in fetching data", error.message);
    } else {
      setPatients(data)
      setPatientsNumber(data.length)
    }
    }
    catch(error){
       toast.error("Error in fetching data", error);
    }
    
  };




  const AddPatient = async (object) => {
  try {
    const { error } = await supabase.from("patients").insert(object);

    if (error) {
      toast.error("you are not authorised to add patient", error.message);
    } else {
      toast.success("Patient Added successfully");
    }
  } catch (error) {
    toast.error("Error in addind patient", error);
  }
};




  const UpdatePatient = async (updatedData) => {
  try {
    const { error } = await supabase.from("patients").update(updatedData).eq('id', updatedData.id);

    if (error) {
      toast.error("you are not authorised to update patient", error.message);
    } else {
      toast.success("Patient update successfully");
    }
  } 
  catch (error) {
    toast.error("Error in update patient", error);
  }
};




const DeletePatient = async (id) => {
  try {
    const { error } = await supabase
      .from("patients")
      .delete()
      .eq("id", id); 

    if (error) {
      toast.error("Error deleting patient", error.message);
    } else {
      toast.success("Patient deleted successfully");
    }
  } catch (error) {
    toast.error("you are not authorised to delete patient", error);
  }
};


 

  return <PatientsContext.Provider value={{fetchPatients,AddPatient,DeletePatient,UpdatePatient, patients,setEditPatient,editPatient ,setaddOrUpdateFlag ,addOrUpdateFlag,patientsNumber}}>
            {props.children}
         </PatientsContext.Provider>
}

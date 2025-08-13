import doctorImage from '../../src/assets/images/doctorImage.png'
import { CiMedicalMask } from "react-icons/ci";
import { useContext, useEffect } from 'react';
import Loader from '../components/loader/Loader';
import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa"
import { Link } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import { DoctorContext } from "../Context/DoctorContext";
import PatientPieChart from "../Charts/PatientPieChart";
import Cases from "./Cases";
import { PatientsContext } from "../Context/PatientsContext";
import CasesChart from '../Charts/CasesChart';




export default function Home() {
   const [loader,setLoader]=useState(false)
   let {patientsNumber,fetchPatients}=useContext(PatientsContext)
   let {doctors,fetchDoctors}=useContext(DoctorContext)

useEffect(() => {
  async function getPatients() {
    setLoader(true)
    await fetchPatients();
    await fetchDoctors()
    setLoader(false)
  }
  getPatients();
}, []);

  
  return (
    <>
    {loader?<Loader/>:(
      <div>
      <div className="bg-cover bg-center w-full h-[300px] flex items-center" style={{ backgroundImage: `url(${doctorImage})` }}>
        <h1 className="text-lg md:text-3xl font-bold text-white ps-10 md:ps-20">
          Emergency department system
        </h1>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 py-10 flex-wrap ">
        <div className="bg-[var(--light-color)]  rounded shadow-md p-5">
            <div className="flex gap-6">
              <div className="bg-blue-100 text-blue-400 border-2 border-blue-400 rounded-full w-12 h-12 flex items-center justify-center">
                <FaUserDoctor className="w-5 h-5" />
               </div>
              <div>
                <p className="text-2xl font-bold text-[var(--text-color)]">{doctors.length?doctors.length:""}</p>
                <p className="font-medium  pt-2">Doctor</p>
              </div>
            </div>
            <Link to="/doctors" className="cursor-pointer flex items-center pt-5 text-blue-500">
               <p className="pr-3">View All</p>
               <FaLongArrowAltRight />
            </Link>
        </div>
        <div className="bg-[var(--light-color)]  rounded shadow-md p-5">
            <div className="flex gap-6">
               <div className="bg-green-100 text-green-400 border-2 border-green-400 rounded-full w-12 h-12 flex items-center justify-center">
                <CiMedicalMask className="w-5 h-5" />
               </div>
              <div>
                <p className="text-2xl font-bold text-[var(--text-color)]">{patientsNumber?patientsNumber:""}</p>
                <p className="font-medium pt-2">Patients</p>
              </div>
            </div>
            <Link to="/patients" className="cursor-pointer flex items-center pt-5 text-green-500">
               <p className="pr-3">View All</p>
               <FaLongArrowAltRight />
            </Link>
       </div>
       <div className="bg-[var(--light-color)]  rounded shadow-md p-5">
            <div className="flex gap-6">
              <div className="bg-amber-100 text-amber-400 border-2 border-amber-400 rounded-full w-12 h-12 flex items-center justify-center">
                  <FaUserDoctor className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--text-color)]">15</p>
                <p className="font-medium pt-2">Nurses</p>
              </div>
            </div>
            <Link to="/nurses" className="cursor-pointer flex items-center pt-5 text-amber-500">
               <p className="pr-3">View All</p>
               <FaLongArrowAltRight />
            </Link>
        </div>
      </div>
     <div className="grid md:grid-cols-2 py-20 items-center gap-5">
         <div className="max-h-[400px] pb-6 md:pb-0">
          <PatientPieChart/>
         </div>
        <div>
           <CasesChart/>
        </div>
     </div>

     <Cases/>
    </div>)
    }
   </>
  );
}

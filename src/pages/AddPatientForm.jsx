import { IoChevronDownCircleOutline } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import { useContext , useEffect} from "react";
import { PatientsContext } from './../Context/PatientsContext';



export default function AddPatientForm() {

  let {AddPatient,editPatient,addOrUpdateFlag,UpdatePatient,fetchPatients}=useContext(PatientsContext)

    const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  useEffect(() => {
    if (editPatient) {
      reset(editPatient);
    }
  }, [editPatient, reset]);

    const onSubmit = (data) => {
       {addOrUpdateFlag=="add"?addPatientToDB(data):updataPatientInDB(data)} 
    }


   async function addPatientToDB(data){
       await AddPatient(data)
       await fetchPatients()    
    }

  async function updataPatientInDB(data){
       await UpdatePatient(data)
       await fetchPatients()    
  }
  return (
    <>
        <h2 className="text-[#1E90FF] p-5 text-center text-xl font-bold">
           {addOrUpdateFlag=="add"?"Add Patient Information":"Update Patient Information"} 
        </h2>
        <form  onSubmit={handleSubmit(onSubmit)}>
         <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                Patient Name
              </label>
              <div className="mt-2">
              <input {...register("name", { required: true ,maxLength: 20,pattern: /^[A-Za-z]+$/i})} placeholder="Jone " className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
               {/* errors will return when field validation fails  */}
               {errors.name && <span className="text-red-500 text-sm ps-3">This field is required</span>}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="age" className="block text-sm/6 font-medium text-gray-900">
                Age
              </label>
              <div className="mt-2">
                <input
                  {...register("age", { required: true})}
                  placeholder="33"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.age && <span className="text-red-500 text-sm ps-3">This field is required</span>}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="gender" className="block text-sm/6 font-medium text-gray-900">
                Gender
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  {...register("gender", { required: true})}
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                  <option value={'female'}>female</option>
                  <option value={'male'}>male</option>
                </select>
                <IoChevronDownCircleOutline
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
                {errors.gender && <span className="text-red-500 text-sm ps-3">This field is required</span>}
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="Phone" className="block text-sm/6 font-medium text-gray-900">
                Phone
              </label>
              <div className="mt-2">
                <input
                  {...register("phone", { required: true, pattern:/[0-9]{10}/})}
                  placeholder="01076554321"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.phone && <span className="text-red-500 text-sm ps-3">This field is required , example : 01096554327</span>}
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                 Address
              </label>
              <div className="mt-2">
                <input
                   {...register("address", { required: true , maxLength:20})}
                  placeholder="Nasr city"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.address && <span className="text-red-500 text-sm ps-3">This field is required</span>}
              </div>
            </div>
        </div>
          <div className="text-right">
             <button type="submit" className="rounded-sm border border-[#1E90FF] px-12 py-3 text-sm font-medium text-[#1E90FF] hover:bg-blue-600 hover:text-white mt-5">
                 {addOrUpdateFlag=="add"?"Add Patient":"Update Patient"} 
            </button>
          </div>
        </form>
      
    </>
  )
}

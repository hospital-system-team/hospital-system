import { IoChevronDownCircleOutline } from "react-icons/io5";


export default function AddPatientForm() {
  return (
    <>
        <h2 className="text-white bg-[#1e90ff] p-5 text-center text-xl font-semibold">
            General Patient Information
        </h2>
        <form>
         <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                Patient Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Omar ail"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="age" className="block text-sm/6 font-medium text-gray-900">
                Age
              </label>
              <div className="mt-2">
                <input
                  id="age"
                  name="age"
                  type="text"
                  autoComplete="age"
                  placeholder="33"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="gender" className="block text-sm/6 font-medium text-gray-900">
                Gender
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="gender"
                  name="gender"
                  autoComplete="gender"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                  <option>female</option>
                  <option>male</option>
                </select>
                <IoChevronDownCircleOutline
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="Phone" className="block text-sm/6 font-medium text-gray-900">
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="Phone"
                  name="Phone"
                  type="tel"
                  placeholder="01076554321"
                  autoComplete="Phone"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">
                 Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  placeholder="Nasr city"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
        </div>
          <div className="text-right">
             <button className="rounded-sm border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-3 focus:outline-hidden mt-5">
                Add Patient
            </button>
          </div>
        </form>
      
    </>
  )
}

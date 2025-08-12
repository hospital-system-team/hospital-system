import { useState } from "react";
import { IoCreateSharp, IoEyeSharp, IoTrashSharp } from "react-icons/io5";

export default function DoctorTable({
  doctors,
  openView,
  openEdit,
  askDelete,
}) {
  const [sortAsc, setSortAsc] = useState(true);

  // ترتيب الدكاترة عند الضغط على عمود Name
  const sortedDoctors = [...doctors].sort((a, b) => {
    if (!a.name || !b.name) return 0;
    return sortAsc
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  const handleSortByName = () => {
    setSortAsc((prev) => !prev);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left rounded-lg overflow-hidden">
        <thead className="bg-[#1E90FF] text-white">
          <tr>
            <th
              onClick={handleSortByName}
              className="px-6 py-3 font-medium cursor-pointer select-none">
              Name {sortAsc ? "▲" : "▼"}
            </th>
            <th className="px-6 py-3 font-medium">Phone</th>
            <th className="px-6 py-3 font-medium">Shift</th>
            <th className="px-6 py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="text-[#1E90FF] bg-white divide-y divide-blue-500/40">
          {sortedDoctors.map((doc) => (
            <tr
              key={doc.id}
              className="hover:bg-[#f0f8ff] transition duration-150">
              <td className="px-6 py-4">{doc.name}</td>
              <td className="px-6 py-4">{doc.phone || "—"}</td>
              <td className="px-6 py-4">
                {doc.shift === "am"
                  ? "Morning"
                  : doc.shift === "pm"
                  ? "Evening"
                  : "Unspecified"}
              </td>
              <td className="px-6 py-4 flex gap-2">
                <button
                  onClick={() => openView(doc)}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                  <IoEyeSharp />
                </button>
                <button
                  onClick={() => openEdit(doc)}
                  className="p-2 bg-green-500 text-white rounded hover:bg-green-700">
                  <IoCreateSharp />
                </button>
                <button
                  onClick={() => askDelete("doctor", doc)}
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-700">
                  <IoTrashSharp />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DoctorTable({
  doctors,
  openView,
  openEdit,
  askDelete,
}) {
  return (
    <div className="w-full flex justify-center">
      <div className="overflow-x-auto">
        <table className="min-w-[800px] border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-[#1E90FF] text-white">
              <th className="px-6 py-3 text-left font-medium">Name</th>
              <th className="px-6 py-3 text-left font-medium">Phone</th>
              <th className="px-6 py-3 text-left font-medium">Shift</th>
              <th className="px-6 py-3 text-center font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {doctors.length ? (
              doctors.map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-blue-50 transition-colors duration-150">
                  <td className="px-6 py-4">{doc.name}</td>
                  <td className="px-6 py-4">{doc.phone || "—"}</td>
                  <td className="px-6 py-4">
                    {doc.shift === "am"
                      ? "Morning"
                      : doc.shift === "pm"
                      ? "Evening"
                      : "Unspecified"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex gap-2">
                      <button
                        onClick={() => openView(doc)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                        View
                      </button>
                      <button
                        onClick={() => openEdit(doc)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                        Edit
                      </button>
                      <button
                        onClick={() => askDelete(doc)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

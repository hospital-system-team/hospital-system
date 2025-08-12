import { useState, useEffect } from 'react';
import supabase from "../Supabase/supabase_config";
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import '../index.css';

export default function Cases() {
  const [cases, setCases] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    diagnosis: '',
    status: '',
  });

  // 🔍 Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchCases();
  }, []);

  async function fetchCases() {
    const { data, error } = await supabase
      .from('cases')
      .select('id, diagnosis, status');

    if (error) {
      console.error('Fetch error:', error.message);
    } else {
      setCases(data);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.diagnosis || !formData.status) {
      alert('Please fill in all fields.');
      return;
    }

    if (editingId) {
      const { error } = await supabase
        .from('cases')
        .update({
          diagnosis: formData.diagnosis.trim(),
          status: formData.status.trim(),
        })
        .eq('id', editingId);

      if (error) {
        console.error('Update error:', error.message);
      } else {
        resetForm();
        fetchCases();
      }
    } else {
      const { error } = await supabase.from('cases').insert([
        {
          diagnosis: formData.diagnosis.trim(),
          status: formData.status.trim(),
        },
      ]);

      if (error) {
        console.error('Insert error:', error.message);
      } else {
        resetForm();
        fetchCases();
      }
    }
  }

  function handleEdit(caseItem) {
    setFormData({
      diagnosis: caseItem.diagnosis,
      status: caseItem.status,
    });
    setEditingId(caseItem.id);
    setShowForm(true);
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('cases').delete().eq('id', id);
    if (!error) fetchCases();
  }

  function resetForm() {
    setFormData({ diagnosis: '', status: '' });
    setEditingId(null);
    setShowForm(false);
  }

  // 🧮 Filtered Cases
  const filteredCases = cases.filter(c =>
    c.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter ? c.status === statusFilter : true)
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600">Cases</h2>
        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setFormData({ diagnosis: '', status: '' });
            }}
            className="bg-[var(--main-color)] text-2xl text-[var(--background-color)] p-3 rounded-lg shadow hover:bg-blue-600"
            title="Add New"
          >
            <FaPlus />
          </button>
        )}
      </div>

      {/* 🔍 Search & Filter */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Diagnosis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded w-1/4"
        >
          <option value="">All Status</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full text-center border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-[var(--main-color)] text-[var(--background-color)] rounded-lg">
              <th className="p-3 rounded-l-xl">Diagnosis</th>
              <th className="p-3">Status</th>
              <th className="p-3 rounded-r-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {showForm && (
              <tr className="bg-[var(--background-color)] text-[var(--main-color)] rounded-lg">
                <td className="p-2">
                  <input
                    type="text"
                    placeholder="Diagnosis"
                    value={formData.diagnosis}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        diagnosis: e.target.value,
                      }))
                    }
                    className="w-full border p-1 rounded"
                    required
                  />
                </td>
                <td className="p-2">
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    className="w-full border p-1 rounded"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </td>
                <td className="p-2 flex justify-center gap-2">
                  <button
                    onClick={handleSubmit}
                    className="bg-[var(--main-color)] hover:bg-blue-600 text-[var(--background-color)] px-3 py-1 rounded"
                  >
                    {editingId ? 'Update' : 'Add'}
                  </button>
                  <button
                    onClick={resetForm}
                    className="bg-[var(--main-color)] hover:bg-blue-600 text-[var(--background-color)] px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            )}

            {filteredCases.length > 0 ? (
              filteredCases.map((c) => (
                <tr
                  key={c.id}
                  className="bg-white text-blue-500 hover:bg-blue-50 transition rounded-lg"
                >
                  <td className="p-3 rounded-l-xl">{c.diagnosis}</td>
                  <td className="p-3">{c.status}</td>
                  <td className="p-3 flex justify-center gap-2 rounded-r-xl">
                    <button
                      onClick={() => handleEdit(c)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="py-6 text-blue-500 text-lg bg-white rounded-xl"
                >
                  No cases found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

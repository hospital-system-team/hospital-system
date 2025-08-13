import { useState, useEffect } from 'react';
import supabase from "../Supabase/supabase_config";
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import '../index.css';

export default function Cases() {
  const [cases, setCases] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    diagnosis: '',
    status: '',
    doctor_id: '',
    patient_id: '',
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchCases();
    fetchDoctors();
    fetchPatients();
  }, []);

  async function fetchCases() {
    const { data, error } = await supabase
      .from('cases')
      .select('id, diagnosis, status, doctor_id, patient_id, doctors(name), patients(name)');

    if (error) {
      console.error('Fetch error:', error.message);
    } else {
      setCases(data);
    }
  }

  async function fetchDoctors() {
    const { data, error } = await supabase
      .from('doctors')
      .select('id, name');
    if (!error) setDoctors(data);
  }

  async function fetchPatients() {
    const { data, error } = await supabase
      .from('patients')
      .select('id, name');
    if (!error) setPatients(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { diagnosis, status, doctor_id, patient_id } = formData;

    if (!diagnosis || !status || !doctor_id || !patient_id) {
      alert('Please fill in all fields.');
      return;
    }

    const payload = {
      diagnosis: diagnosis.trim(),
      status: status.trim(),
      doctor_id,
      patient_id,
    };

    let error;
    if (editingId) {
      ({ error } = await supabase
        .from('cases')
        .update(payload)
        .eq('id', editingId));
    } else {
      ({ error } = await supabase.from('cases').insert([payload]));
    }

    if (error) {
      console.error('Submit error:', error.message);
    } else {
      resetForm();
      fetchCases();
    }
  }

  function handleEdit(caseItem) {
    setFormData({
      diagnosis: caseItem.diagnosis,
      status: caseItem.status,
      doctor_id: caseItem.doctor_id || '',
      patient_id: caseItem.patient_id || '',
    });
    setEditingId(caseItem.id);
    setShowForm(true);
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('cases').delete().eq('id', id);
    if (!error) fetchCases();
  }

  function resetForm() {
    setFormData({ diagnosis: '', status: '', doctor_id: '', patient_id: '' });
    setEditingId(null);
    setShowForm(false);
  }

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
              setFormData({ diagnosis: '', status: '', doctor_id: '', patient_id: '' });
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
              <th className="p-3">Diagnosis</th>
              <th className="p-3">Status</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Patient</th>
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
                <td className="p-2">
                  <select
                    value={formData.doctor_id}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        doctor_id: e.target.value,
                      }))
                    }
                    className="w-full border p-1 rounded"
                    required
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  <select
                    value={formData.patient_id}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        patient_id: e.target.value,
                      }))
                    }
                    className="w-full border p-1 rounded"
                    required
                  >
                    <option value="">Select Patient</option>
                    {patients.map((pat) => (
                      <option key={pat.id} value={pat.id}>
                        {pat.name}
                      </option>
                    ))}
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
                  <td className="p-3">{c.diagnosis}</td>
                  <td className="p-3">{c.status}</td>
                  <td className="p-3">{c.doctors?.name || '—'}</td>
                  <td className="p-3">{c.patients?.name || '—'}</td>
                  <td className="p-3 flex justify-center gap-2">
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
                <td colSpan="5" className="py-6 text-blue-500 text-lg bg-white rounded-xl">
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

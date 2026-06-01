import React, { useState } from 'react';
import { usePatients } from '../context/PatientContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function SearchPatients() {
  const { patients, deletePatient, setSelectedPatient } = usePatients();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [searchBy, setSearchBy] = useState('name');

  const filtered = patients.filter((p) => {
    const term = query.toLowerCase();
    if (!term) return true;
    if (searchBy === 'name') return p.name.toLowerCase().includes(term);
    if (searchBy === 'id') return p.id.toString().includes(term);
    return p.dept.toLowerCase().includes(term);
  });

  const handleSelect = (p) => {
    setSelectedPatient(p);
    navigate('/monitor');
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <header className="bg-linear-to-r from-blue-700 to-sky-500 text-white p-4 shadow">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-wide">Wireless Emergency Telemedicine System</h1>
            <p className="text-xs opacity-90">Remote Healthcare Monitoring</p>
          </div>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-700 font-bold">W</div>
        </div>
      </header>

      <main className="grow p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50">
            <div className="flex flex-col md:flex-row gap-3 items-end">
              <div className="flex gap-2 w-full md:w-auto">
                <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white">
                  <option value="name">Search by : Name</option>
                  <option value="id">ID</option>
                  <option value="dept">Department</option>
                </select>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm w-full md:w-64" placeholder="Type to search..." />
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button onClick={() => navigate('/add')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">New patient</button>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-3 font-medium">{filtered.length} patients found</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-amber-100 text-slate-700 uppercase text-xs font-bold">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Age</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="bg-white hover:bg-amber-50 transition">
                    <td className="px-6 py-3 font-semibold text-slate-800">{p.id}</td>
                    <td className="px-6 py-3">{p.age}</td>
                    <td className="px-6 py-3">{p.name}</td>
                    <td className="px-6 py-3">{p.dept}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${p.status === 'critical' ? 'bg-red-100 text-red-700' : p.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 flex gap-2">
                      <button onClick={() => handleSelect(p)} className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">Monitor</button>
                      <button onClick={() => deletePatient(p.id)} className="text-xs bg-red-400 text-white px-2 py-1 rounded hover:bg-red-500">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="bg-slate-200 text-center text-xs text-slate-600 py-3">
        Developed in EE Department, Faculty of Engineering, Assiut University
      </footer>
    </div>
  );
}
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(form.username, form.password)) {
      navigate('/main');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <header className="bg-linear-to-r from-blue-700 to-sky-500 text-white p-4 shadow">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-700 font-bold text-lg">W</div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">Wireless Emergency Telemedicine System</h1>
              <p className="text-xs opacity-90">Faculty of Engineering, Assiut University</p>
            </div>
          </div>
        </div>
      </header>

      <main className="grow flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-blue-50 p-10 flex flex-col justify-center items-center text-center">
            <svg className="w-20 h-20 text-blue-600 mx-auto mb-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <h2 className="text-3xl font-bold text-blue-800 mb-2">We Care</h2>
            <p className="text-blue-600 text-lg italic mb-8">Welcome to our System</p>
            <div className="text-sm text-slate-600 space-y-1">
              <p className="font-semibold">Developed by:</p>
              <p>Prof. Mohammed Abo-zahhad</p>
              <p>Prof. Sabah Mohamed Ahmed</p>
              <p>Eng. Osama Elnahas Helaly</p>
            </div>
          </div>

          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">User Login</h3>
            {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                <input name="username" type="text" required value={form.username} onChange={e => setForm({...form, username: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input name="password" type="password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
                Login
              </button>
            </form>
            <p className="mt-4 text-center text-xs text-slate-500">Demo: any username + password works</p>
          </div>
        </div>
      </main>

      <footer className="bg-slate-200 text-center text-xs text-slate-600 py-3">
        Developed in EE Department, Faculty of Engineering, Assiut University
      </footer>
    </div>
  );
}
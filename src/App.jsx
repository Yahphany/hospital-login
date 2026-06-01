import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Login from './pages/Login';
import MainMenu from './pages/MainMenu';
import SearchPatients from './pages/SearchPatients';
import AddPatient from './pages/AddPatient';
import Monitoring from './pages/Monitoring';
import ConnectPatient from './pages/ConnectPatient';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

export default function App() {
  const { user, logout } = useAuth();

  return (
    <HashRouter>
      {user && (
        <nav className="bg-slate-800 text-white text-xs p-2 flex gap-3 sticky top-0 z-50 items-center">
          <Link to="/main" className="hover:underline">Main</Link>
          <Link to="/search" className="hover:underline">Search</Link>
          <Link to="/add" className="hover:underline">Add Patient</Link>
          <Link to="/monitor" className="hover:underline">Monitor</Link>
          <Link to="/connect" className="hover:underline">Connect</Link>
          <span className="ml-auto flex items-center gap-2">
            <span className="text-emerald-400">● {user.name}</span>
            <button onClick={logout} className="bg-red-600 px-2 py-1 rounded hover:bg-red-500">Logout</button>
          </span>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<PrivateRoute><MainMenu /></PrivateRoute>} />
        <Route path="/search" element={<PrivateRoute><SearchPatients /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><AddPatient /></PrivateRoute>} />
        <Route path="/monitor" element={<PrivateRoute><Monitoring /></PrivateRoute>} />
        <Route path="/connect" element={<PrivateRoute><ConnectPatient /></PrivateRoute>} />
      </Routes>
    </HashRouter>
  );
}
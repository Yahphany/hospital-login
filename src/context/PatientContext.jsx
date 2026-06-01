import React, { createContext, useContext, useState, useEffect } from 'react';

const PatientContext = createContext(null);

const defaultPatients = [
  { id: 222, age: 38, name: 'mahmoud maher', dept: 'cardiac', mrn: '08050852601222', status: 'active' },
  { id: 223, age: 32, name: 'hazem sayed', dept: 'Orthopedics', mrn: '08050852601223', status: 'stable' },
  { id: 224, age: 44, name: 'mohamed kasem', dept: 'internists', mrn: '08050852601224', status: 'active' },
  { id: 226, age: 61, name: 'diaa ahmed', dept: 'cardiac', mrn: '08050852601226', status: 'critical' },
  { id: 218, age: 25, name: 'mohsen hany', dept: 'Orthopedics', mrn: '08050852601218', status: 'stable' },
  { id: 219, age: 32, name: 'haithm nabil', dept: 'internists', mrn: '08050852601219', status: 'active' },
];

export function PatientProvider({ children }) {
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('wets_patients');
    return saved ? JSON.parse(saved) : defaultPatients;
  });

  const [selectedPatient, setSelectedPatient] = useState(() => {
    const saved = localStorage.getItem('wets_selected');
    return saved ? JSON.parse(saved) : defaultPatients[3]; // diaa ahmed default
  });

  useEffect(() => {
    localStorage.setItem('wets_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    if (selectedPatient) localStorage.setItem('wets_selected', JSON.stringify(selectedPatient));
  }, [selectedPatient]);

  const addPatient = (patient) => {
    const newId = Math.max(...patients.map(p => p.id), 200) + 1;
    const newPatient = { ...patient, id: newId, status: 'active' };
    setPatients([...patients, newPatient]);
    return newPatient;
  };

  const deletePatient = (id) => {
    setPatients(patients.filter(p => p.id !== id));
    if (selectedPatient?.id === id) setSelectedPatient(null);
  };

  return (
    <PatientContext.Provider value={{ patients, selectedPatient, setSelectedPatient, addPatient, deletePatient }}>
      {children}
    </PatientContext.Provider>
  );
}

export const usePatients = () => useContext(PatientContext);
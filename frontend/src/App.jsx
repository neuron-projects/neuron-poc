import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { NewIncident } from './pages/NewIncident';
import { IncidentDetail } from './pages/IncidentDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new" element={<NewIncident />} />
        <Route path="/incidents/:id" element={<IncidentDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

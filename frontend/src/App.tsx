import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppLayout from "./layouts/AppLayout";
import Dashboard from './pages/Dashboard';
import IncidentDetail from './pages/IncidentDetail';
import NewIncident from './pages/NewIncident';
import NotFound from "./pages/NotFound";

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new" element={<NewIncident />} />
            <Route path="/incident/:id" element={<IncidentDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
}

export default App;

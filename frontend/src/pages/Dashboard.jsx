import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { Layout } from '../components/Layout';
import { IncidentCard } from '../components/IncidentCard';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { api } from '../api';

export function Dashboard() {
  const [{ data: incidents, loading, error }, refetch] = useAxios(
    '/incidents',
    { manual: true } 
  );
  
  // Use manual axios hook or standard useEffect with the configured api instance
  // Since useAxios defaults to logic, let's just use standard fetch for clarity and control with our custom instance
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/incidents/');
      setData(res.data);
      setErr(null);
    } catch (e) {
      setErr("Failed to load incidents. Is the backend running?");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Refinery Dashboard</h1>
          <p className="text-slate-400">Real-time ERP incident triage and analysis</p>
        </div>
        <button 
          onClick={fetchData}
          className="p-2 bg-slate-800 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-all"
          title="Refresh"
        >
          <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {err && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8 flex items-center space-x-3 text-red-400">
          <AlertCircle className="h-5 w-5" />
          <span>{err}</span>
        </div>
      )}

      {isLoading && data.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-slate-800/50 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
          
          {data.length === 0 && !isLoading && !err && (
            <div className="col-span-full text-center py-20 text-slate-500 bg-slate-800/30 rounded-2xl border border-dashed border-slate-700">
              <p className="text-lg mb-2">No incidents found</p>
              <p className="text-sm">Create a new incident to see AI Triage in action.</p>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { api } from '../api';
import { ArrowLeft, BrainCircuit, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';

export function IncidentDetail() {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const res = await api.get('/incidents/');
        // Mock finding the specific one since our API list endpoint returns all
        // In real app we would have GET /incidents/:id
        const found = res.data.find(i => i.id === id);
        setIncident(found);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchIncident();
  }, [id]);

  if (loading) return <Layout><div className="animate-pulse">Loading...</div></Layout>;
  if (!incident) return <Layout><div>Incident not found</div></Layout>;

  return (
    <Layout>
      <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
      </Link>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-8 border-b border-slate-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">{incident.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <span className="flex items-center"><Calendar className="h-4 w-4 mr-1"/> {new Date(incident.created_at).toLocaleDateString()}</span>
                <span className="bg-slate-700 px-2 py-1 rounded">Module: {incident.module}</span>
                <span className="bg-slate-700 px-2 py-1 rounded">Env: {incident.environment}</span>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-lg border ${incident.severity === 'P1' ? 'bg-red-500/10 border-red-500 text-red-500' : 'bg-blue-500/10 border-blue-500 text-blue-500'}`}>
              <span className="font-bold text-lg">{incident.severity}</span>
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</h3>
              <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-lg">
                {incident.description}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6">
              <div className="flex items-center space-x-2 text-indigo-400 mb-4">
                <BrainCircuit className="h-5 w-5" />
                <h3 className="font-bold">AI Triage Analysis</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-indigo-300 uppercase block mb-1">Category</label>
                  <span className="text-white font-medium">{incident.category}</span>
                </div>
                <div>
                  <label className="text-xs text-indigo-300 uppercase block mb-1">Reasoning</label>
                  <p className="text-sm text-indigo-100/80">{incident.analysis_summary}</p>
                </div>
                <div>
                  <label className="text-xs text-indigo-300 uppercase block mb-1">Suggested Action</label>
                  <div className="bg-indigo-500/20 p-3 rounded-lg text-sm text-indigo-100 flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
                    <span>{incident.suggested_action}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

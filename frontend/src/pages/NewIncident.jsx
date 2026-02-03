import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { api } from '../api';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';

export function NewIncident() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    module: '',
    environment: 'Production'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/incidents/analyze', formData);
      navigate('/');
    } catch (error) {
      console.error("Submission failed", error);
      alert("Failed to submit incident");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">New Incident</h1>
        <p className="text-slate-400 mb-8">Submit an ERP issue for instant AI Analysis</p>

        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-xl">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Incident Title
              </label>
              <input
                type="text"
                name="title"
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="e.g. Invoice #123 stuck in validation"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  ERP Module
                </label>
                <select
                  name="module"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.module}
                  onChange={handleChange}
                >
                  <option value="">Select Module</option>
                  <option value="AP">Accounts Payable</option>
                  <option value="AR">Accounts Receivable</option>
                  <option value="GL">General Ledger</option>
                  <option value="SCM">Supply Chain</option>
                  <option value="HCM">Human Capital</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Environment
                </label>
                <select
                  name="environment"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.environment}
                  onChange={handleChange}
                >
                  <option value="Production">Production</option>
                  <option value="UAT">UAT / Staging</option>
                  <option value="Dev">Development</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows={5}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                placeholder="Describe the issue in detail..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Analyzing with AI...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Submit for Triage</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

import React from 'react';
import { AlertTriangle, CheckCircle, Clock, ArrowRight } from 'lucide-react';

const SeverityBadge = ({ severity }) => {
  const colors = {
    P1: 'bg-red-500/10 text-red-500 border-red-500/20',
    P2: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    P3: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  };
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[severity] || colors['P3']}`}>
      {severity}
    </span>
  );
};

import { Link } from 'react-router-dom';

export function IncidentCard({ incident }) {
  return (
    <Link to={`/incidents/${incident.id}`} className="block">
      <div className="card group cursor-pointer hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <SeverityBadge severity={incident.severity || 'P3'} />
            <span className="text-slate-400 text-xs font-mono">{incident.module}</span>
          </div>
          <span className="text-slate-500 text-xs">
            {new Date(incident.created_at).toLocaleDateString()}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
          {incident.title}
        </h3>
        
        <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-grow">
          {incident.description}
        </p>
        
        {incident.analysis_summary && (
          <div className="bg-slate-800/50 rounded-lg p-3 text-sm text-slate-300 border border-slate-700/50 mb-4">
            <div className="flex items-center space-x-2 text-indigo-400 mb-1">
              <BrainCircuit className="h-3 w-3" />
              <span className="text-xs font-semibold uppercase tracking-wider">AI Insight</span>
            </div>
            {incident.analysis_summary}
          </div>
        )}

        <div className="flex justify-end mt-auto">
          <div className="text-blue-500 text-sm flex items-center group-hover:translate-x-1 transition-transform">
            View Details <ArrowRight className="ml-1 h-3 w-3" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function BrainCircuit(props) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M9 13a4.5 4.5 0 0 0 3-4" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M12 13h4" />
      <path d="M12 18h6a2 2 0 0 1 2 2v1" />
      <path d="M12 8h8" />
      <path d="M16 8V5a2 2 0 0 1 2-2" />
      <path d="M16 13v4a2 2 0 0 0 2 2h2" />
    </svg>
  )
}

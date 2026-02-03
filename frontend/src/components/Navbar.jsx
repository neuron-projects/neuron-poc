import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, PlusCircle } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <BrainCircuit className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Neuron
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/new" 
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              <span>New Incident</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

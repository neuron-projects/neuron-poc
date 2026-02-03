import React from 'react';
import { Navbar } from './Navbar';

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-blue-500/30">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {children}
      </main>
    </div>
  );
}

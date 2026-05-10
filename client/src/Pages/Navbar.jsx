import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-8 py-6 max-w-8xl mx-auto w-full bg-white shadow-sm rounded-lg border border-slate-100">
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-slate-900 p-1.5 rounded-lg">
          <CheckCircle2 className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-slate-900">Taskly</span>
      </Link>
      <div className="flex items-center gap-12">
        <Link to="/login" className="hidden sm:flex font-semibold text-slate-900 hover:text-slate-600 transition-colors">
          Login
        </Link>
        <Link to="/register" className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition-all">
          Get started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
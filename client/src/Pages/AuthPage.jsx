import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle, footerText, footerLinkText, footerPath, buttonText }) => (
  <div className="pt-24 min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
    
    <div className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-100 w-full max-w-[480px]">
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      <p className="text-slate-500 mb-8">{subtitle}</p>
      
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2">Email</label>
          <input type="email" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Password</label>
          <input type="password" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all" />
        </div>
        <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors">
          {buttonText}
        </button>
      </form>
      
      <p className="text-center mt-8 text-slate-500">
        {footerText} <Link to={footerPath} className="text-slate-900 font-bold hover:underline">{footerLinkText}</Link>
      </p>
    </div>
  </div>
);

export const Login = () => (
  <AuthLayout 
    title="Welcome back" 
    subtitle="Sign in to manage your tasks."
    buttonText="Sign in"
    footerText="No account?"
    footerLinkText="Register"
    footerPath="/register"
  />
);

export const Register = () => (
  <AuthLayout 
    title="Create your account" 
    subtitle="Start tracking tasks in seconds."
    buttonText="Create account"
    footerText="Already have an account?"
    footerLinkText="Sign in"
    footerPath="/login"
  />
);
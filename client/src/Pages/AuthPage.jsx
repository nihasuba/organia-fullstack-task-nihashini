import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../api';

const AuthLayout = ({ title, subtitle, footerText, footerLinkText, footerPath, buttonText, onSubmit, isRegister }) => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      if (isRegister) {
        response = await API.register(formData.email, formData.name, formData.password);
      } else {
        response = await API.login(formData.email, formData.password);
      }

      if (response.access_token) {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate(`/dashboard/${response.user.id}`);
      } else {
        setError(response.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Error: ' + (err.message || 'Something went wrong'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-100 w-full max-w-[480px]">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-slate-500 mb-8">{subtitle}</p>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6">{error}</div>}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {isRegister && (
            <div>
              <label className="block text-sm font-bold mb-2">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all" 
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-bold mb-2">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all" 
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : buttonText}
          </button>
        </form>
        
        <p className="text-center mt-8 text-slate-500">
          {footerText} <Link to={footerPath} className="text-slate-900 font-bold hover:underline">{footerLinkText}</Link>
        </p>
      </div>
    </div>
  );
};

export const Login = () => (
  <AuthLayout 
    title="Welcome back" 
    subtitle="Sign in to manage your tasks."
    buttonText="Sign in"
    footerText="No account?"
    footerLinkText="Register"
    footerPath="/register"
    isRegister={false}
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
    isRegister={true}
  />
);
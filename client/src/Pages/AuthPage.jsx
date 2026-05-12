import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../api';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const AuthLayout = ({ title, subtitle, footerText, footerLinkText, footerPath, buttonText, onSubmit, isRegister }) => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  // Validation rules
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  const validateForm = () => {
    const errors = {};

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    // Name validation (only for register)
    if (isRegister) {
      if (!formData.name.trim()) {
        errors.name = 'Name is required';
      } else if (!validateName(formData.name)) {
        errors.name = 'Name must be at least 2 characters';
      }
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      errors.password = 'Password must be at least 8 characters';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate before submitting
    if (!validateForm()) {
      return;
    }

    setLoading(true);

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
        
        if (isRegister) {
          navigate('/login');
        } else {
          navigate(`/dashboard/${response.user.id}`);
        }
      } else {
        setError(response.message || 'Authentication failed');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-100 w-full max-w-[480px]">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-slate-500 mb-8">{subtitle}</p>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-2 border border-red-200">
            <AlertCircle size={18} />
            {error}
          </div>
        )}
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          {isRegister && (
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full p-3 rounded-xl border transition-all ${
                  fieldErrors.name 
                    ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent' 
                    : 'border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10'
                }`}
              />
              {fieldErrors.name && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle size={14} /> {fieldErrors.name}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full p-3 rounded-xl border transition-all ${
                fieldErrors.email 
                  ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent' 
                  : 'border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10'
              }`}
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <AlertCircle size={14} /> {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full p-3 pr-12 rounded-xl border transition-all ${
                  fieldErrors.password 
                    ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent' 
                    : 'border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/10'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <AlertCircle size={14} /> {fieldErrors.password}
              </p>
            )}
            {/* {!fieldErrors.password && formData.password && (
              <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                <CheckCircle size={14} /> Strong password
              </p>
            )} */}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </span>
            ) : buttonText}
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
import React from 'react';
import { Link } from 'react-router-dom';
import { ListTodo, Clock, CheckCircle2 } from 'lucide-react';

const Home = () => {
  return (
    <div className="pt-24 min-h-screen bg-white  text-slate-900">
      {/* Hero Section */}
      <main className="max-w-6xl mx-auto text-center mt-24 px-6">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-8 leading-tight">
          Organize your day, the simple way.
        </h1>
        <p className="text-slate-500 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          A clean, fast task manager. Create, edit, and track your work from any device.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-24">
          <Link to="/register" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all">
            Create free account
          </Link>
          <Link to="/login" className="border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
            Sign in
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <FeatureCard 
            icon={<ListTodo className="text-slate-900 w-6 h-6" />}
            title="Capture"
            desc="Add tasks in seconds with title, notes & due dates."
          />
          <FeatureCard 
            icon={<Clock className="text-slate-900 w-6 h-6" />}
            title="Track"
            desc="To do, in progress, completed — always in sync."
          />
          <FeatureCard 
            icon={<CheckCircle2 className="text-slate-900 w-6 h-6" />}
            title="Complete"
            desc="Edit or remove anytime. Your data stays private."
          />
        </div>
      </main>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 border border-slate-200 rounded-3xl text-left bg-white shadow-md hover:shadow-lg transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

export default Home;
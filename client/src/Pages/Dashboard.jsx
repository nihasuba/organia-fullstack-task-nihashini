import React, { useRef, useState, useEffect } from 'react';
import {User, LogOut, Camera, ChevronDown, Plus, Pencil, Trash2, Calendar } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../api';

const TaskDashboard = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // State Management
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'To Do', dueDate: '' });
  const [deleteId, setDeleteId] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [error, setError] = useState('');

  // Get user from localStorage
  const userFromStorage = JSON.parse(localStorage.getItem('user')) || {};

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, [userId]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await API.getTasks(userId);
      setTasks(response || []);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Create or Update Task
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingTask) {
        // Update task
        await API.updateTask(editingTask.id, formData.title, formData.description, formData.status === 'Completed');
        setTasks(tasks.map(t => t.id === editingTask.id ? { ...editingTask, ...formData } : t));
      } else {
        // Create task
        const newTask = await API.createTask(userId, formData.title, formData.description);
        setTasks([...tasks, newTask]);
      }
      closeModal();
    } catch (err) {
      setError('Failed to save task');
      console.error(err);
    }
  };

  const openModal = (task = null) => {
    if (task) {
      setEditingTask(task);
      setFormData({ 
        title: task.title, 
        description: task.description || '', 
        status: task.status || 'To Do', 
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '' 
      });
    } else {
      setEditingTask(null);
      setFormData({ title: '', description: '', status: 'To Do', dueDate: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // Delete Task
  const handleDelete = async () => {
    try {
      await API.deleteTask(deleteId);
      setTasks(tasks.filter(t => t.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-40">
        <div className="font-bold text-2xl text-slate-900">Taskly</div>
        <div className="relative">
          {/* Profile Trigger */}
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
          >
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center border border-slate-300">
              <User size={20} className="text-slate-500" />
            </div>
            <span className="font-bold text-slate-700">{userFromStorage.name || 'User'}</span>
            <ChevronDown size={16} className={`text-slate-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)}></div>
              <div className="absolute right-0 mt-3 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 z-20">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-slate-100 overflow-hidden border-2 border-slate-200 flex items-center justify-center">
                    <User size={32} className="text-slate-400" />
                  </div>
                  <h4 className="font-bold text-lg text-slate-900 mt-3">{userFromStorage.name || 'User'}</h4>
                  <p className="text-sm text-slate-500">{userFromStorage.email}</p>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-red-600 font-bold hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8 bg-slate-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Tasks</h1>
              <p className="text-slate-500">Manage your daily workflow</p>
            </div>
            <button 
              onClick={() => openModal()}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all"
            >
              <Plus size={20} /> Create Task
            </button>
          </div>

          {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">{error}</div>}

          {/* Tasks Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-500">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No tasks yet. Create one to get started!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map(task => (
                <div key={task.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      task.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {task.status}
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => openModal(task)} 
                        className="p-1 text-slate-400 hover:text-slate-900 transition"
                      >
                        <Pencil size={18}/>
                      </button>
                      <button 
                        onClick={() => setDeleteId(task.id)} 
                        className="p-1 text-slate-400 hover:text-red-500 transition"
                      >
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{task.title}</h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">{task.description}</p>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Calendar size={16} />
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create/Edit Task Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">{editingTask ? 'Edit Task' : 'New Task'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Task Title" 
                  required
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900/10 outline-none"
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
                <textarea 
                  placeholder="Description" 
                  rows="3"
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900/10 outline-none"
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                  <select 
                    className="p-3 rounded-xl border border-slate-200 outline-none"
                    value={formData.status} 
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                  <input 
                    type="date" 
                    required
                    className="p-3 rounded-xl border border-slate-200 outline-none"
                    value={formData.dueDate} 
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={closeModal} className="flex-1 py-3 font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-all">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">Save Task</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
              onClick={() => setDeleteId(null)}
            ></div>
            <div className="relative bg-white w-full max-w-sm rounded-[32px] p-8 shadow-2xl">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                  <Trash2 className="text-red-500" size={32} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Delete Task?</h3>
                <p className="text-slate-500 mb-8">
                  Are you sure you want to delete this task? This action cannot be undone.
                </p>
                <div className="flex w-full gap-3">
                  <button
                    onClick={() => setDeleteId(null)} 
                    className="flex-1 py-3.5 px-4 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 py-3.5 px-4 font-bold text-white bg-red-600 hover:bg-red-700 rounded-2xl shadow-lg shadow-red-200 transition-all"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDashboard;
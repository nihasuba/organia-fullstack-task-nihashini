import React, { useRef, useState } from 'react';
import {User, LogOut, Camera,ChevronDown, Plus, Pencil, Trash2, Calendar, CheckCircle2, Clock, ListTodo } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design Homepage', description: 'Create wireframes for the landing page', status: 'In Progress', dueDate: '2026-05-15' },
    { id: 2, title: 'Design Homepage', description: 'Create wireframes for the landing page', status: 'In Progress', dueDate: '2026-05-15' },
    { id: 3, title: 'Design Homepage', description: 'Create wireframes for the landing page', status: 'In Progress', dueDate: '2026-05-15' },
    { id: 4, title: 'Design Homepage', description: 'Create wireframes for the landing page', status: 'In Progress', dueDate: '2026-05-15' },
    { id: 5, title: 'Design Homepage', description: 'Create wireframes for the landing page', status: 'In Progress', dueDate: '2026-05-15' },
    { id: 6, title: 'Design Homepage', description: 'Create wireframes for the landing page', status: 'In Progress', dueDate: '2026-05-15' },
    { id: 7, title: 'Design Homepage', description: 'Create wireframes for the landing page', status: 'In Progress', dueDate: '2026-05-15' },
    { id: 8, title: 'Design Homepage', description: 'Create wireframes for the landing page', status: 'In Progress', dueDate: '2026-05-15' },

  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', status: 'To Do', dueDate: '' });
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Handle Form Submission (Create & Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...formData, id: t.id } : t));
    } else {
      setTasks([...tasks, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const openModal = (task = null) => {
    if (task) {
      setEditingTask(task);
      setFormData(task);
    } else {
      setEditingTask(null);
      setFormData({ title: '', description: '', status: 'To Do', dueDate: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user, setUser] = useState({
    name: "Siva Kumar",
    email: "siva@example.com",
    profileImg: null 
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, profileImg: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-40">
            <div className="font-bold text-2xl text-slate-900">Taskly</div>
                <div className="relative">
            {/* Profile Trigger */}
            <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
            >
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center border border-slate-300">
                {user.profileImg ? (
                    <img src={user.profileImg} alt="profile" className="w-full h-full object-cover" />
                ) : (
                    <User size={20} className="text-slate-500" />
                )}
                </div>
                <span className="font-bold text-slate-700">{user.name}</span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* --- PROFILE DROPDOWN MENU --- */}
            {showProfileMenu && (
                <>
                <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)}></div>
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 z-20">
                    
                    {/* Profile Header in Dropdown */}
                    <div className="flex flex-col items-center mb-6">
                    <div className="relative group mb-3">
                        <div className="w-20 h-20 rounded-full bg-slate-100 overflow-hidden border-2 border-slate-200 flex items-center justify-center">
                        {user.profileImg ? (
                            <img src={user.profileImg} alt="profile" className="w-full h-full object-cover" />
                        ) : (
                            <User size={32} className="text-slate-400" />
                        )}
                        </div>
                        {/* Camera Overlay */}
                        <button 
                        onClick={() => fileInputRef.current.click()}
                        className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        >
                        <Camera size={20} className="text-white" />
                        </button>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                    </div>
                    
                    <h4 className="font-bold text-lg text-slate-900">{user.name}</h4>
                    <p className="text-sm text-slate-500">{user.email}</p>
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                    <button 
                        onClick={() => navigate('/')}
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
        <div className="p-8 bg-slate-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
            {/* Header */}
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

            {/* Task Grid */}
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
                    <button onClick={() => openModal(task.id)} className="p-1 text-slate-400 hover:text-slate-900"><Pencil size={18}/></button>
                    <button onClick={() => setDeleteId(task.id)} className="p-1 text-slate-400 hover:text-red-500"><Trash2 size={18}/></button>
                    </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{task.title}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{task.description}</p>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Calendar size={16} />
                    <span>Due: {task.dueDate}</span>
                </div>
                </div>
            ))}
            </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold mb-6">{editingTask ? 'Edit Task' : 'New Task'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text" placeholder="Task Title" required
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900/10 outline-none"
                    value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
                <textarea 
                    placeholder="Description" rows="3"
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900/10 outline-none"
                    value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                    <select 
                    className="p-3 rounded-xl border border-slate-200 outline-none"
                    value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    </select>
                    <input 
                    type="date" required
                    className="p-3 rounded-xl border border-slate-200 outline-none"
                    value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
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

        {/* Delete Confirmation Popup */}
    {deleteId && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
        <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={() => setDeleteId(null)}
        ></div>
        <div className="relative bg-white w-full max-w-sm rounded-[32px] p-8 shadow-2xl transform transition-all scale-100">
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
                onClick={() => {
                setTasks(tasks.filter(t => t.id !== deleteId)); 
                setDeleteId(null); 
                }}
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
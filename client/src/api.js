const API_BASE_URL = 'http://localhost:3000';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export const API = {
  // Auth endpoints
  register: async (email, name, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password }),
    });
    return response.json();
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  // Task endpoints
  createTask: async (userId, title, description, status = 'To Do', dueDate) => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ 
        userId: Number(userId), 
        title, 
        description, 
        status,
        dueDate: dueDate || new Date().toISOString() 
      }),
    });
    return response.json();
  },

  getTasks: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${userId}`, {
      headers: getHeaders(),
    });
    return response.json();
  },

  updateTask: async (id, title, description, status) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ title, description, status }),
    });
    return response.json();
  },

  deleteTask: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return response.json();
  },
};

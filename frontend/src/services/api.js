// src/services/api.js
const API_BASE = 'http://localhost:5000/api';

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json'
  };
};

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  const headers = getAuthHeader();

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API Error: ${response.status}`);
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const get = (endpoint) => apiCall(endpoint, { method: 'GET' });

export const post = (endpoint, body) => 
  apiCall(endpoint, { method: 'POST', body: JSON.stringify(body) });

export const put = (endpoint, body) => 
  apiCall(endpoint, { method: 'PUT', body: JSON.stringify(body) });

export const del = (endpoint) => 
  apiCall(endpoint, { method: 'DELETE' });
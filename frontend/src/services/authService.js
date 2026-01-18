// src/services/authService.js
import { post, get } from './api';

export const authService = {
  login: async (email, password) => {
    return post('/auth/login', { email, password });
  },

  signup: async (name, email, password, role) => {
    return post('/auth/signup', { name, email, password, role });
  },

  getProfile: async () => {
    return get('/users/profile');
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  saveToken: (token) => {
    localStorage.setItem('token', token);
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  saveUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
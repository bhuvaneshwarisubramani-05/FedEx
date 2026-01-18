// src/services/customerService.js
import { get, post, put } from './api';

export const customerService = {
  getAllCustomers: async () => {
    return get('/customers');
  },

  getCustomerById: async (customerId) => {
    return get(`/customers/${customerId}`);
  },

  createCustomer: async (customerData) => {
    return post('/customers', customerData);
  },

  updateCustomer: async (customerId, customerData) => {
    return put(`/customers/${customerId}`, customerData);
  }
};
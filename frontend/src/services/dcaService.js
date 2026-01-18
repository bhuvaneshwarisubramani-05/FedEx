// src/services/dcaService.js
import { get, post, put } from './api';

export const dcaService = {
  getAllDCAs: async () => {
    return get('/dcas');
  },

  getDCAById: async (dcaId) => {
    return get(`/dcas/${dcaId}`);
  },

  getDCAAssignedCases: async (dcaId) => {
    return get(`/dcas/${dcaId}/assigned-cases`);
  },

  createDCA: async (dcaData) => {
    return post('/dcas', dcaData);
  },

  updateDCA: async (dcaId, dcaData) => {
    return put(`/dcas/${dcaId}`, dcaData);
  }
};
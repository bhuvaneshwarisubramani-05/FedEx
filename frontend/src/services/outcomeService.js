// src/services/outcomeService.js
import { get, post, put } from './api';

export const outcomeService = {
  getAllOutcomes: async () => {
    return get('/outcomes');
  },

  getCaseOutcome: async (caseId) => {
    return get(`/cases/${caseId}/outcome`);
  },

  getOutcomeById: async (outcomeId) => {
    return get(`/outcomes/${outcomeId}`);
  },

  getRecoveryStats: async () => {
    return get('/outcomes/stats');
  },

  createOutcome: async (caseId, outcomeData) => {
    return post(`/cases/${caseId}/outcome`, outcomeData);
  },

  updateOutcome: async (outcomeId, outcomeData) => {
    return put(`/outcomes/${outcomeId}`, outcomeData);
  }
};
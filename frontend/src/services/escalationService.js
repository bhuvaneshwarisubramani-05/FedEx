// src/services/escalationService.js
import { get, post, put } from './api';

export const escalationService = {
  getAllEscalations: async () => {
    return get('/escalations');
  },

  getCaseEscalations: async (caseId) => {
    return get(`/cases/${caseId}/escalations`);
  },

  getEscalationById: async (escalationId) => {
    return get(`/escalations/${escalationId}`);
  },

  createEscalation: async (escalationData) => {
    return post('/escalations', escalationData);
  },

  resolveEscalation: async (escalationId, resolutionNotes) => {
    return put(`/escalations/${escalationId}`, { resolutionNotes });
  }
};
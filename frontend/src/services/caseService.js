// src/services/caseService.js
import { get, post, put } from './api';

export const caseService = {
  getAllCases: async () => {
    return get('/cases');
  },

  getCaseById: async (caseId) => {
    return get(`/cases/${caseId}`);
  },

  getCaseActions: async (caseId) => {
    return get(`/cases/${caseId}/actions`);
  },

  getCaseAssignment: async (caseId) => {
    return get(`/cases/${caseId}/assignment`);
  },

  assignCase: async (caseId, dcaId) => {
    return post(`/cases/${caseId}/assign`, { dcaId });
  },

  closeCase: async (caseId, remarks, recoveredAmount) => {
    return put(`/cases/${caseId}/close`, { remarks, recoveredAmount });
  },

  updateCaseRisk: async (caseId, riskLevel, riskScore) => {
    return put(`/cases/${caseId}/update-risk`, { riskLevel, riskScore });
  },

  completeAction: async (caseId, actionId, completionNotes) => {
    return post(`/cases/${caseId}/actions/${actionId}/complete`, { completionNotes });
  },

  updateAction: async (caseId, actionId, actionStatus) => {
    return put(`/cases/${caseId}/actions/${actionId}`, { actionStatus });
  }
};
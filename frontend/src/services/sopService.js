// src/services/sopService.js
import { get, post, put, del } from './api';

export const sopService = {
  getAllTemplates: async () => {
    return get('/sop/templates');
  },

  getTemplateById: async (sopId) => {
    return get(`/sop/templates/${sopId}`);
  },

  getSOPSteps: async (sopId) => {
    return get(`/sop/templates/${sopId}/steps`);
  },

  getStepById: async (stepId) => {
    return get(`/sop/steps/${stepId}`);
  },

  createTemplate: async (templateData) => {
    return post('/sop/templates', templateData);
  },

  updateTemplate: async (sopId, templateData) => {
    return put(`/sop/templates/${sopId}`, templateData);
  },

  createStep: async (sopId, stepData) => {
    return post(`/sop/templates/${sopId}/steps`, stepData);
  },

  updateStep: async (stepId, stepData) => {
    return put(`/sop/steps/${stepId}`, stepData);
  },

  deleteStep: async (stepId) => {
    return del(`/sop/steps/${stepId}`);
  }
};
const express = require('express');
const router = express.Router();

// Import Controllers
const authController = require('../controllers/authController');
const customerController = require('../controllers/customerController');
const invoiceController = require('../controllers/invoiceController');
const dcaController = require('../controllers/dcaController');
const caseAssignmentController = require('../controllers/caseAssignmentController');
const sopTemplateController = require('../controllers/sopTemplateController');
const sopStepController = require('../controllers/sopStepController');
const caseActionController = require('../controllers/caseActionController');
const sopBreachController = require('../controllers/sopBreachController');
const escalationController = require('../controllers/escalationController');
const recoveryOutcomeController = require('../controllers/recoveryOutcomeController');

// Import Middleware
const { verifyToken, verifyAdmin, verifyCreditManager } = require('../middleware/authMiddleware');

console.log("Loaded Controllers:", {
  caseActionController,
  verifyToken: typeof verifyToken,
  verifyCreditManager: typeof verifyCreditManager
});


// ===================== AUTH ROUTES =====================
router.post('/auth/signup', authController.signup);
router.post('/auth/login', authController.login);
router.get('/users/profile', verifyToken, authController.getProfile);
router.get('/users', verifyToken, verifyAdmin, authController.getAllUsers);
router.put('/users/:id', verifyToken, verifyAdmin, authController.updateUser);
router.delete('/users/:id', verifyToken, verifyAdmin, authController.deleteUser);

// ===================== CUSTOMER ROUTES =====================
router.get('/customers', verifyToken, customerController.getAllCustomers);
router.get('/customers/:id', verifyToken, customerController.getCustomerById);
router.post('/customers', verifyToken, verifyAdmin, customerController.createCustomer);
router.put('/customers/:id', verifyToken, verifyAdmin, customerController.updateCustomer);

// ===================== INVOICE ROUTES =====================
router.get('/invoices', verifyToken, invoiceController.getAllInvoices);
router.get('/invoices/:id', verifyToken, invoiceController.getInvoiceById);
router.post('/invoices', verifyToken, verifyAdmin, invoiceController.createInvoice);
router.put('/invoices/:id', verifyToken, verifyAdmin, invoiceController.updateInvoiceStatus);

// ===================== RECOVERY CASE ROUTES =====================
router.get('/cases', verifyToken, caseActionController.getAllCases);
router.get('/cases/:id', verifyToken, caseActionController.getCaseById);
router.post('/cases/auto-create', caseActionController.autoCreateCase); // System only
router.put('/cases/:id/close', verifyToken, verifyCreditManager, caseActionController.closeCase);
router.put('/cases/:id/update-risk', caseActionController.updateCaseRisk); // System/ML only

// ===================== DCA ROUTES =====================
router.get('/dcas', verifyToken, dcaController.getAllDCAs);
router.get('/dcas/:id', verifyToken, dcaController.getDCAById);
router.post('/dcas', verifyToken, verifyAdmin, dcaController.createDCA);
router.put('/dcas/:id', verifyToken, verifyAdmin, dcaController.updateDCA);
router.get('/dcas/:id/assigned-cases', verifyToken, dcaController.getDCAAssignedCases);

// ===================== CASE ASSIGNMENT ROUTES =====================
router.post('/cases/:caseId/assign', verifyToken, verifyCreditManager, caseAssignmentController.assignCaseToOneDCA);
router.get('/cases/:caseId/assignment', verifyToken, caseAssignmentController.getCaseAssignment);

// ===================== SOP TEMPLATE ROUTES =====================
router.get('/sop/templates', verifyToken, sopTemplateController.getAllSOPTemplates);
router.get('/sop/templates/:id', verifyToken, sopTemplateController.getSOPTemplateById);
router.post('/sop/templates', verifyToken, verifyAdmin, sopTemplateController.createSOPTemplate);
router.put('/sop/templates/:id', verifyToken, verifyAdmin, sopTemplateController.updateSOPTemplate);

// ===================== SOP STEP ROUTES =====================
router.get('/sop/templates/:sopId/steps', verifyToken, sopStepController.getSOPSteps);
router.get('/sop/steps/:id', verifyToken, sopStepController.getSOPStepById);
router.post('/sop/templates/:sopId/steps', verifyToken, verifyAdmin, sopStepController.createSOPStep);
router.put('/sop/steps/:id', verifyToken, verifyAdmin, sopStepController.updateSOPStep);
router.delete('/sop/steps/:id', verifyToken, verifyAdmin, sopStepController.deleteSOPStep);

// ===================== CASE ACTION ROUTES =====================
router.get('/cases/:caseId/actions', verifyToken, caseActionController.getCaseActions);
router.get('/cases/:caseId/actions/:actionId', verifyToken, caseActionController.getCaseActionById);
router.post('/cases/:caseId/actions/generate', caseActionController.generateActionsFromSOP); // System only
router.post('/cases/:caseId/actions/:actionId/complete', verifyToken, caseActionController.completeAction);
router.put('/cases/:caseId/actions/:actionId', verifyToken, caseActionController.updateAction);

// ===================== SOP BREACH ROUTES =====================H
router.get('/breaches', verifyToken, sopBreachController.getAllBreaches);
router.get('/cases/:caseId/breaches', verifyToken, sopBreachController.getCaseBreaches);
router.post('/breaches', verifyToken, verifyCreditManager, sopBreachController.createBreach);
router.post('/breaches/auto-detect', sopBreachController.autoDetectBreach); // System only
router.get('/breaches/:id', verifyToken, sopBreachController.getBreachById);

// ===================== ESCALATION ROUTES =====================
router.get('/escalations', verifyToken, escalationController.getAllEscalations);
router.get('/cases/:caseId/escalations', verifyToken, escalationController.getCaseEscalations);
router.post('/escalations', escalationController.createEscalation); // System or Manual
router.get('/escalations/:id', verifyToken, escalationController.getEscalationById);
router.put('/escalations/:id', verifyToken, verifyCreditManager, escalationController.resolveEscalation);

// ===================== RECOVERY OUTCOME ROUTES =====================
router.get('/outcomes', verifyToken, recoveryOutcomeController.getAllOutcomes);
router.get('/outcomes/stats', verifyToken, recoveryOutcomeController.getRecoveryStats);
router.get('/cases/:caseId/outcome', verifyToken, recoveryOutcomeController.getCaseOutcome);
router.post('/cases/:caseId/outcome', verifyToken, verifyCreditManager, recoveryOutcomeController.createRecoveryOutcome);
router.put('/outcomes/:id', verifyToken, verifyAdmin, recoveryOutcomeController.updateOutcome);

module.exports = router;
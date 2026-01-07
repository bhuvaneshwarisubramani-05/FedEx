const { RecoveryCase, Invoice, Customer, CaseAssignment, DebtCollectionAgency, CaseAction, SOPStep, SOPTemplate } = require('../models');

// GET /cases
exports.getAllCases = async (req, res) => {
  try {
    const cases = await RecoveryCase.findAll({
      include: [
        { model: Invoice, as: 'invoice', include: [{ model: Customer, as: 'customer' }] },
        { model: CaseAssignment, as: 'assignments', include: [{ model: DebtCollectionAgency, as: 'dca' }] }
      ],
      order: [['createdAt', 'DESC']]
    });
    return res.status(200).json({ success: true, count: cases.length, cases });
  } catch (error) {
    console.error('Get cases error:', error);
    return res.status(500).json({ success: false, message: 'Error fetching cases', error: error.message });
  }
};

// GET /cases/:id
exports.getCaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const recoveryCase = await RecoveryCase.findByPk(id, {
      include: [
        { model: Invoice, as: 'invoice', include: [{ model: Customer, as: 'customer' }] },
        { model: CaseAssignment, as: 'assignments', include: [{ model: DebtCollectionAgency, as: 'dca' }] }
      ]
    });
    if (!recoveryCase) return res.status(404).json({ success: false, message: 'Case not found' });
    return res.status(200).json({ success: true, case: recoveryCase });
  } catch (error) {
    console.error('Get case error:', error);
    return res.status(500).json({ success: false, message: 'Error fetching case', error: error.message });
  }
};

// POST /cases/auto-create
exports.autoCreateCase = async (req, res) => {
  try {
    const { invoiceId } = req.body;
    if (!invoiceId) return res.status(400).json({ success: false, message: 'Invoice ID required' });
    const invoice = await Invoice.findByPk(invoiceId);
    if (!invoice) return res.status(404).json({ success: false, message: 'Invoice not found' });
    const existingCase = await RecoveryCase.findOne({ where: { invoiceId } });
    if (existingCase) return res.status(409).json({ success: false, message: 'Case already exists for this invoice' });

    const recoveryCase = await RecoveryCase.create({
      invoiceId,
      customerId: invoice.customerId,
      amountDue: invoice.invoiceAmount,
      daysOverdue: invoice.daysOverdue,
      caseStatus: 'OPEN',
      createdBy: 'SYSTEM'
    });

    return res.status(201).json({ success: true, message: 'Case auto-created successfully', case: recoveryCase });
  } catch (error) {
    console.error('Auto-create case error:', error);
    return res.status(500).json({ success: false, message: 'Error auto-creating case', error: error.message });
  }
};

// PUT /cases/:id/close
exports.closeCase = async (req, res) => {
  try {
    const { id } = req.params;
    const { remarks, recoveredAmount } = req.body;
    const recoveryCase = await RecoveryCase.findByPk(id);
    if (!recoveryCase) return res.status(404).json({ success: false, message: 'Case not found' });

    recoveryCase.caseStatus = 'CLOSED';
    if (remarks) recoveryCase.remarks = remarks;
    if (recoveredAmount) recoveryCase.recoveredAmount = recoveredAmount;
    await recoveryCase.save();

    return res.status(200).json({ success: true, message: 'Case closed successfully', case: recoveryCase });
  } catch (error) {
    console.error('Close case error:', error);
    return res.status(500).json({ success: false, message: 'Error closing case', error: error.message });
  }
};

// PUT /cases/:id/update-risk
exports.updateCaseRisk = async (req, res) => {
  try {
    const { id } = req.params;
    const { riskLevel, riskScore } = req.body;
    if (!riskLevel || riskScore === undefined) return res.status(400).json({ success: false, message: 'Risk level and score required' });

    const recoveryCase = await RecoveryCase.findByPk(id);
    if (!recoveryCase) return res.status(404).json({ success: false, message: 'Case not found' });

    recoveryCase.riskLevel = riskLevel;
    recoveryCase.riskScore = riskScore;
    await recoveryCase.save();

    return res.status(200).json({ success: true, message: 'Case risk updated successfully', case: recoveryCase });
  } catch (error) {
    console.error('Update risk error:', error);
    return res.status(500).json({ success: false, message: 'Error updating risk', error: error.message });
  }
};

// ===================== PLACEHOLDER ACTION ROUTES =====================
exports.getCaseActions = async (req, res) => res.status(200).json({ success: true, message: 'getCaseActions placeholder' });
exports.getCaseActionById = async (req, res) => res.status(200).json({ success: true, message: 'getCaseActionById placeholder' });
exports.generateActionsFromSOP = async (req, res) => res.status(200).json({ success: true, message: 'generateActionsFromSOP placeholder' });
exports.completeAction = async (req, res) => res.status(200).json({ success: true, message: 'completeAction placeholder' });
exports.updateAction = async (req, res) => res.status(200).json({ success: true, message: 'updateAction placeholder' });

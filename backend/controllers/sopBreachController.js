const { SOPBreach, CaseAction, RecoveryCase, DebtCollectionAgency } = require('../models');

// GET /breaches - Get all SOP breaches
exports.getAllBreaches = async (req, res) => {
  try {
    const breaches = await SOPBreach.findAll({
      include: [
        { model: RecoveryCase, as: 'case' },
        { model: CaseAction, as: 'action' },
        { model: DebtCollectionAgency, as: 'dca' }
      ],
      order: [['breachedAt', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      count: breaches.length,
      breaches
    });
  } catch (error) {
    console.error('Get breaches error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching breaches',
      error: error.message 
    });
  }
};

// GET /cases/:caseId/breaches - Get breaches for specific case
exports.getCaseBreaches = async (req, res) => {
  try {
    const { caseId } = req.params;

    // Check if case exists
    const recoveryCase = await RecoveryCase.findByPk(caseId);
    if (!recoveryCase) {
      return res.status(404).json({ 
        success: false, 
        message: 'Case not found' 
      });
    }

    const breaches = await SOPBreach.findAll({
      where: { caseId },
      include: [
        { model: CaseAction, as: 'caseAction' },
        { model: DebtCollectionAgency, as: 'dca' }
      ],
      order: [['breachedAt', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      caseId,
      count: breaches.length,
      breaches
    });
  } catch (error) {
    console.error('Get case breaches error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching breaches',
      error: error.message 
    });
  }
};

// POST /breaches/auto-detect - Auto-detect breach when action is overdue (System Only)
exports.autoDetectBreach = async (req, res) => {
  try {
    const { actionId, caseId, dcaId, breachReason } = req.body;

    if (!actionId || !caseId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Action ID and Case ID required' 
      });
    }

    // Check if action exists
    const action = await CaseAction.findByPk(actionId);
    if (!action) {
      return res.status(404).json({ 
        success: false, 
        message: 'Action not found' 
      });
    }

    // Check if breach already exists
    const existingBreach = await SOPBreach.findOne({
      where: { actionId, caseId }
    });

    if (existingBreach) {
      return res.status(409).json({ 
        success: false, 
        message: 'Breach already recorded for this action' 
      });
    }

    // Create breach record
    const breach = await SOPBreach.create({
      caseId,
      actionId,
      dcaId: dcaId || null,
      breachReason: breachReason || 'Action not completed by due date',
      breachedAt: new Date()
    });

    // Update action status to MISSED
    action.actionStatus = 'MISSED';
    await action.save();

    return res.status(201).json({
      success: true,
      message: 'Breach detected and recorded',
      breach
    });
  } catch (error) {
    console.error('Auto-detect breach error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error detecting breach',
      error: error.message 
    });
  }
};

// POST /breaches - Manually log a breach (Admin/Manager)
exports.createBreach = async (req, res) => {
  try {
    const { caseId, actionId, dcaId, breachReason } = req.body;

    if (!caseId || !breachReason) {
      return res.status(400).json({ 
        success: false, 
        message: 'Case ID and breach reason required' 
      });
    }

    // Check if case exists
    const recoveryCase = await RecoveryCase.findByPk(caseId);
    if (!recoveryCase) {
      return res.status(404).json({ 
        success: false, 
        message: 'Case not found' 
      });
    }

    const breach = await SOPBreach.create({
      caseId,
      actionId: actionId || null,
      dcaId: dcaId || null,
      breachReason,
      breachedAt: new Date()
    });

    return res.status(201).json({
      success: true,
      message: 'Breach recorded successfully',
      breach
    });
  } catch (error) {
    console.error('Create breach error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error creating breach',
      error: error.message 
    });
  }
};

// GET /breaches/:id - Get specific breach
exports.getBreachById = async (req, res) => {
  try {
    const { id } = req.params;

    const breach = await SOPBreach.findByPk(id, {
      include: [
        { model: RecoveryCase, as: 'case' },
        { model: CaseAction, as: 'caseAction' },
        { model: DebtCollectionAgency, as: 'dca' }
      ]
    });

    if (!breach) {
      return res.status(404).json({ 
        success: false, 
        message: 'Breach not found' 
      });
    }

    return res.status(200).json({
      success: true,
      breach
    });
  } catch (error) {
    console.error('Get breach error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching breach',
      error: error.message 
    });
  }
};
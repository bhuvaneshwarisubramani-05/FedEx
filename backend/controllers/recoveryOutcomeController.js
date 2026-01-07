const { RecoveryOutcome, RecoveryCase, Invoice } = require('../models');

// GET /cases/:caseId/outcome - Get recovery outcome for case
exports.getCaseOutcome = async (req, res) => {
  try {
    const { caseId } = req.params;

    // Check if case exists
    const recoveryCase = await RecoveryCase.findByPk(caseId, {
      include: [{ model: Invoice, as: 'invoice' }]
    });

    if (!recoveryCase) {
      return res.status(404).json({ 
        success: false, 
        message: 'Case not found' 
      });
    }

    const outcome = await RecoveryOutcome.findOne({
      where: { caseId },
      include: [{ association: 'case', attributes: ['caseId', 'invoiceId', 'amountDue'] }]
    });

    if (!outcome) {
      return res.status(404).json({ 
        success: false, 
        message: 'No outcome recorded for this case' 
      });
    }

    return res.status(200).json({
      success: true,
      outcome
    });
  } catch (error) {
    console.error('Get case outcome error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching outcome',
      error: error.message 
    });
  }
};

// GET /outcomes - Get all recovery outcomes
exports.getAllOutcomes = async (req, res) => {
  try {
    const outcomes = await RecoveryOutcome.findAll({
      include: [{ association: 'case' }],
      order: [['closedAt', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      count: outcomes.length,
      outcomes
    });
  } catch (error) {
    console.error('Get outcomes error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching outcomes',
      error: error.message 
    });
  }
};

// POST /cases/:caseId/outcome - Log recovery outcome
exports.createRecoveryOutcome = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { recoveredAmount, recoveryDays, success, remarks } = req.body;

    if (recoveredAmount === undefined || success === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Recovered amount and success status required' 
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

    // Check if outcome already exists
    const existingOutcome = await RecoveryOutcome.findOne({ where: { caseId } });
    if (existingOutcome) {
      return res.status(409).json({ 
        success: false, 
        message: 'Outcome already recorded for this case' 
      });
    }

    // Validate success value
    if (typeof success !== 'boolean') {
      return res.status(400).json({ 
        success: false, 
        message: 'Success must be true or false' 
      });
    }

    const outcome = await RecoveryOutcome.create({
      caseId,
      recoveredAmount,
      recoveryDays: recoveryDays || null,
      success,
      remarks: remarks || null,
      closedAt: new Date()
    });

    // Update case status to CLOSED
    recoveryCase.caseStatus = 'CLOSED';
    await recoveryCase.save();

    return res.status(201).json({
      success: true,
      message: 'Recovery outcome logged successfully',
      outcome,
      caseStatus: 'CLOSED'
    });
  } catch (error) {
    console.error('Create outcome error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error logging outcome',
      error: error.message 
    });
  }
};

// GET /outcomes/stats - Get recovery statistics
exports.getRecoveryStats = async (req, res) => {
  try {
    const allOutcomes = await RecoveryOutcome.findAll();

    const totalCases = allOutcomes.length;
    const successfulCases = allOutcomes.filter(o => o.success).length;
    const failedCases = totalCases - successfulCases;
    const totalRecovered = allOutcomes.reduce((sum, o) => sum + (o.recoveredAmount || 0), 0);
    const averageRecovered = totalCases > 0 ? (totalRecovered / totalCases).toFixed(2) : 0;
    const successRate = totalCases > 0 ? ((successfulCases / totalCases) * 100).toFixed(2) : 0;

    const avgRecoveryDays = allOutcomes
      .filter(o => o.recoveryDays)
      .reduce((sum, o) => sum + o.recoveryDays, 0) / 
      allOutcomes.filter(o => o.recoveryDays).length || 0;

    return res.status(200).json({
      success: true,
      statistics: {
        totalCases,
        successfulCases,
        failedCases,
        successRate: `${successRate}%`,
        totalRecovered,
        averageRecovered,
        averageRecoveryDays: avgRecoveryDays.toFixed(2)
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching statistics',
      error: error.message 
    });
  }
};

// PUT /outcomes/:id - Update recovery outcome (if needed)
exports.updateOutcome = async (req, res) => {
  try {
    const { id } = req.params;
    const { recoveredAmount, recoveryDays, success, remarks } = req.body;

    const outcome = await RecoveryOutcome.findByPk(id);
    if (!outcome) {
      return res.status(404).json({ 
        success: false, 
        message: 'Outcome not found' 
      });
    }

    if (recoveredAmount !== undefined) outcome.recoveredAmount = recoveredAmount;
    if (recoveryDays !== undefined) outcome.recoveryDays = recoveryDays;
    if (success !== undefined) outcome.success = success;
    if (remarks) outcome.remarks = remarks;

    await outcome.save();

    return res.status(200).json({
      success: true,
      message: 'Outcome updated successfully',
      outcome
    });
  } catch (error) {
    console.error('Update outcome error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error updating outcome',
      error: error.message 
    });
  }
};
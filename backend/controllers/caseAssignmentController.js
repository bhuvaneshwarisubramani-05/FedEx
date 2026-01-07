const { CaseAssignment, RecoveryCase, DebtCollectionAgency } = require('../models');

// POST /cases/:id/assign - Assign case to DCA
exports.assignCaseToOneDCA = async (req, res) => {
  try {
    const { caseId } = req.params;
    const { dcaId } = req.body;

    if (!dcaId) {
      return res.status(400).json({ 
        success: false, 
        message: 'DCA ID required' 
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

    // Check if DCA exists
    const dca = await DebtCollectionAgency.findByPk(dcaId);
    if (!dca) {
      return res.status(404).json({ 
        success: false, 
        message: 'DCA not found' 
      });
    }

    // Check if already assigned
    const existingAssignment = await CaseAssignment.findOne({
      where: { caseId, dcaId }
    });

    if (existingAssignment) {
      return res.status(409).json({ 
        success: false, 
        message: 'Case already assigned to this DCA' 
      });
    }

    // Create assignment
    const assignment = await CaseAssignment.create({
      caseId,
      dcaId,
      assignedAt: new Date(),
      assignedBy: req.user ? req.user.role : 'SYSTEM'
    });

    // Update case status
    recoveryCase.caseStatus = 'IN_PROGRESS';
    await recoveryCase.save();

    return res.status(201).json({
      success: true,
      message: 'Case assigned successfully',
      assignment
    });
  } catch (error) {
    console.error('Assign case error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error assigning case',
      error: error.message 
    });
  }
};

// GET /cases/:id/assignment - Get case assignment details
exports.getCaseAssignment = async (req, res) => {
  try {
    const { caseId } = req.params;

    const assignment = await CaseAssignment.findOne({
      where: { caseId },
      include: [
        { model: DebtCollectionAgency, as: 'dca' },
        { association: 'case', attributes: ['caseId', 'invoiceId', 'amountDue', 'caseStatus'] }
      ]
    });

    if (!assignment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Assignment not found for this case' 
      });
    }

    return res.status(200).json({
      success: true,
      assignment
    });
  } catch (error) {
    console.error('Get assignment error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching assignment',
      error: error.message 
    });
  }
};
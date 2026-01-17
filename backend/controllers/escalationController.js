const { Escalation, RecoveryCase, User } = require('../models');

// GET /escalations - Get all escalations
exports.getAllEscalations = async (req, res) => {
  try {
    const escalations = await Escalation.findAll({
  order: [['escalatedAt', 'DESC']]
});


    return res.status(200).json({
      success: true,
      count: escalations.length,
      escalations
    });
  } catch (error) {
    console.error('Get escalations error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching escalations',
      error: error.message 
    });
  }
};

// GET /cases/:caseId/escalations - Get escalations for specific case
exports.getCaseEscalations = async (req, res) => {
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

    const escalations = await Escalation.findAll({
      where: { caseId },
      
    });

    return res.status(200).json({
      success: true,
      caseId,
      count: escalations.length,
      escalations
    });
  } catch (error) {
    console.error('Get case escalations error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching escalations',
      error: error.message 
    });
  }
};

// POST /escalations - Create escalation (System auto-trigger or Manual)
exports.createEscalation = async (req, res) => {
  try {
    const { caseId, escalationReason, escalationLevel, notifiedTo } = req.body;

    if (!caseId || !escalationReason) {
      return res.status(400).json({ 
        success: false, 
        message: 'Case ID and escalation reason required' 
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

    // Validate escalation level
    const validLevels = ['LEVEL_1', 'LEVEL_2', 'LEVEL_3', 'LEGAL'];
    if (escalationLevel && !validLevels.includes(escalationLevel)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid escalation level' 
      });
    }

    // Check if notified user exists if provided
    if (notifiedTo) {
      const user = await User.findByPk(notifiedTo);
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'Notified user not found' 
        });
      }
    }

    const escalation = await Escalation.create({
      caseId,
      escalationReason,
      escalationLevel: escalationLevel || 'LEVEL_1',
      notifiedTo: notifiedTo || null,
      escalatedAt: new Date(),
      isResolved: false
    });

    // Update case status
    recoveryCase.caseStatus = 'IN_PROGRESS';
    await recoveryCase.save();

    return res.status(201).json({
      success: true,
      message: 'Escalation created successfully',
      escalation
    });
  } catch (error) {
    console.error('Create escalation error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error creating escalation',
      error: error.message 
    });
  }
};

// GET /escalations/:id - Get specific escalation
exports.getEscalationById = async (req, res) => {
  try {
    const { id } = req.params;

    const escalation = await Escalation.findByPk(id, {
      
    });

    if (!escalation) {
      return res.status(404).json({ 
        success: false, 
        message: 'Escalation not found' 
      });
    }

    return res.status(200).json({
      success: true,
      escalation
    });
  } catch (error) {
    console.error('Get escalation error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching escalation',
      error: error.message 
    });
  }
};

// PUT /escalations/:id - Resolve escalation (Manager/Admin)
exports.resolveEscalation = async (req, res) => {
  try {
    const { id } = req.params;
    const { resolutionNotes } = req.body;

    const escalation = await Escalation.findByPk(id);
    if (!escalation) {
      return res.status(404).json({ 
        success: false, 
        message: 'Escalation not found' 
      });
    }

    escalation.isResolved = true;
    escalation.resolvedAt = new Date();
    if (resolutionNotes) escalation.resolutionNotes = resolutionNotes;

    await escalation.save();

    return res.status(200).json({
      success: true,
      message: 'Escalation resolved',
      escalation
    });
  } catch (error) {
    console.error('Resolve escalation error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error resolving escalation',
      error: error.message 
    });
  }
};
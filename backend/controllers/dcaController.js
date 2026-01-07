const { DebtCollectionAgency, CaseAssignment } = require('../models');

// GET /dcas - Get all DCAs
exports.getAllDCAs = async (req, res) => {
  try {
    const dcas = await DebtCollectionAgency.findAll({
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      count: dcas.length,
      dcas
    });
  } catch (error) {
    console.error('Get DCAs error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching DCAs',
      error: error.message 
    });
  }
};

// GET /dcas/:id - Get DCA by ID
exports.getDCAById = async (req, res) => {
  try {
    const { id } = req.params;

    const dca = await DebtCollectionAgency.findByPk(id);
    if (!dca) {
      return res.status(404).json({ 
        success: false, 
        message: 'DCA not found' 
      });
    }

    return res.status(200).json({
      success: true,
      dca
    });
  } catch (error) {
    console.error('Get DCA error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching DCA',
      error: error.message 
    });
  }
};

// POST /dcas - Create new DCA (Admin Only)
exports.createDCA = async (req, res) => {
  try {
    const { dcaName, specialization, contactPerson, contactEmail, contactPhone } = req.body;

    // Validate input
    if (!dcaName || !specialization) {
      return res.status(400).json({ 
        success: false, 
        message: 'DCA name and specialization required' 
      });
    }

    const dca = await DebtCollectionAgency.create({
      dcaName,
      specialization,
      contactPerson,
      contactEmail,
      contactPhone,
      successRate: 0,
      sopComplianceScore: 0,
      activeStatus: true
    });

    return res.status(201).json({
      success: true,
      message: 'DCA created successfully',
      dca
    });
  } catch (error) {
    console.error('Create DCA error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error creating DCA',
      error: error.message 
    });
  }
};

// PUT /dcas/:id - Update DCA (Admin Only)
exports.updateDCA = async (req, res) => {
  try {
    const { id } = req.params;
    const { dcaName, specialization, contactPerson, contactEmail, contactPhone, activeStatus, successRate, sopComplianceScore } = req.body;

    const dca = await DebtCollectionAgency.findByPk(id);
    if (!dca) {
      return res.status(404).json({ 
        success: false, 
        message: 'DCA not found' 
      });
    }

    // Update fields
    if (dcaName) dca.dcaName = dcaName;
    if (specialization) dca.specialization = specialization;
    if (contactPerson) dca.contactPerson = contactPerson;
    if (contactEmail) dca.contactEmail = contactEmail;
    if (contactPhone) dca.contactPhone = contactPhone;
    if (activeStatus !== undefined) dca.activeStatus = activeStatus;
    if (successRate !== undefined) dca.successRate = successRate;
    if (sopComplianceScore !== undefined) dca.sopComplianceScore = sopComplianceScore;

    await dca.save();

    return res.status(200).json({
      success: true,
      message: 'DCA updated successfully',
      dca
    });
  } catch (error) {
    console.error('Update DCA error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error updating DCA',
      error: error.message 
    });
  }
};

// GET /dcas/:id/assigned-cases - Get all cases assigned to a DCA
exports.getDCAAssignedCases = async (req, res) => {
  try {
    const { id } = req.params;

    const dca = await DebtCollectionAgency.findByPk(id, {
      include: [{
        model: CaseAssignment,
        as: 'assignments'
      }]
    });

    if (!dca) {
      return res.status(404).json({ 
        success: false, 
        message: 'DCA not found' 
      });
    }

    return res.status(200).json({
      success: true,
      dca: dca.dcaName,
      assignedCases: dca.assignments || [],
      count: dca.assignments?.length || 0
    });
  } catch (error) {
    console.error('Get DCA assigned cases error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching assigned cases',
      error: error.message 
    });
  }
};
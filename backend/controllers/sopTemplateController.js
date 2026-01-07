const { SOPTemplate, SOPStep } = require('../models');

// GET /sop/templates - Get all SOP templates
exports.getAllSOPTemplates = async (req, res) => {
  try {
    const templates = await SOPTemplate.findAll({
      include: [{ model: SOPStep, as: 'steps' }],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      count: templates.length,
      templates
    });
  } catch (error) {
    console.error('Get SOP templates error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching SOP templates',
      error: error.message 
    });
  }
};

// GET /sop/templates/:id - Get SOP template by ID
exports.getSOPTemplateById = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await SOPTemplate.findByPk(id, {
      include: [{ model: SOPStep, as: 'steps' }]
    });

    if (!template) {
      return res.status(404).json({ 
        success: false, 
        message: 'SOP template not found' 
      });
    }

    return res.status(200).json({
      success: true,
      template
    });
  } catch (error) {
    console.error('Get SOP template error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching SOP template',
      error: error.message 
    });
  }
};

// POST /sop/templates - Create new SOP template (Admin Only)
exports.createSOPTemplate = async (req, res) => {
  try {
    const { sopName, applicableRiskLevel } = req.body;

    // Validate input
    if (!sopName || !applicableRiskLevel) {
      return res.status(400).json({ 
        success: false, 
        message: 'SOP name and risk level required' 
      });
    }

    // Validate risk level
    const validRiskLevels = ['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'];
    if (!validRiskLevels.includes(applicableRiskLevel)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid risk level. Must be LOW, MEDIUM, HIGH, or VERY_HIGH' 
      });
    }

    const template = await SOPTemplate.create({
      sopName,
      applicableRiskLevel
    });

    return res.status(201).json({
      success: true,
      message: 'SOP template created successfully',
      template
    });
  } catch (error) {
    console.error('Create SOP template error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error creating SOP template',
      error: error.message 
    });
  }
};

// PUT /sop/templates/:id - Update SOP template (Admin Only)
exports.updateSOPTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { sopName, applicableRiskLevel } = req.body;

    const template = await SOPTemplate.findByPk(id);
    if (!template) {
      return res.status(404).json({ 
        success: false, 
        message: 'SOP template not found' 
      });
    }

    if (sopName) template.sopName = sopName;
    if (applicableRiskLevel) {
      const validRiskLevels = ['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'];
      if (!validRiskLevels.includes(applicableRiskLevel)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid risk level' 
        });
      }
      template.applicableRiskLevel = applicableRiskLevel;
    }

    await template.save();

    return res.status(200).json({
      success: true,
      message: 'SOP template updated successfully',
      template
    });
  } catch (error) {
    console.error('Update SOP template error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error updating SOP template',
      error: error.message 
    });
  }
};
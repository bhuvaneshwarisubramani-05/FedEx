const { SOPStep, SOPTemplate } = require('../models');

// GET /sop/templates/:sopId/steps - Get all steps for a SOP template
exports.getSOPSteps = async (req, res) => {
  try {
    const { sopId } = req.params;

    // Check if SOP template exists
    const template = await SOPTemplate.findByPk(sopId);
    if (!template) {
      return res.status(404).json({ 
        success: false, 
        message: 'SOP template not found' 
      });
    }

    const steps = await SOPStep.findAll({
      where: { sopId },
      order: [['dueInDays', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      sopName: template.sopName,
      count: steps.length,
      steps
    });
  } catch (error) {
    console.error('Get SOP steps error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching SOP steps',
      error: error.message 
    });
  }
};

// GET /sop/steps/:id - Get specific step
exports.getSOPStepById = async (req, res) => {
  try {
    const { id } = req.params;

    const step = await SOPStep.findByPk(id, {
      include: [{ model: SOPTemplate, as: 'sopTemplate' }]
    });

    if (!step) {
      return res.status(404).json({ 
        success: false, 
        message: 'SOP step not found' 
      });
    }

    return res.status(200).json({
      success: true,
      step
    });
  } catch (error) {
    console.error('Get SOP step error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching SOP step',
      error: error.message 
    });
  }
};

// POST /sop/templates/:sopId/steps - Add step to SOP template (Admin Only)
exports.createSOPStep = async (req, res) => {
  try {
    const { sopId } = req.params;
    const { actionType, dueInDays, mandatory, description } = req.body;

    // Validate input
    if (!actionType || dueInDays === undefined) {
      return res.status(400).json({ 
        success: false, 
        message: 'Action type and due days required' 
      });
    }

    // Check if SOP template exists
    const template = await SOPTemplate.findByPk(sopId);
    if (!template) {
      return res.status(404).json({ 
        success: false, 
        message: 'SOP template not found' 
      });
    }

    // Validate action type
    const validActionTypes = ['CALL', 'EMAIL', 'LEGAL_NOTICE', 'PERSONAL_VISIT', 'SMS', 'ESCALATION'];
    if (!validActionTypes.includes(actionType)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid action type. Must be CALL, EMAIL, LEGAL_NOTICE, PERSONAL_VISIT, SMS, or ESCALATION' 
      });
    }

    const step = await SOPStep.create({
      sopId,
      actionType,
      dueInDays,
      mandatory: mandatory !== undefined ? mandatory : false,
      description
    });

    return res.status(201).json({
      success: true,
      message: 'SOP step created successfully',
      step
    });
  } catch (error) {
    console.error('Create SOP step error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error creating SOP step',
      error: error.message 
    });
  }
};

// PUT /sop/steps/:id - Update SOP step (Admin Only)
exports.updateSOPStep = async (req, res) => {
  try {
    const { id } = req.params;
    const { actionType, dueInDays, mandatory, description } = req.body;

    const step = await SOPStep.findByPk(id);
    if (!step) {
      return res.status(404).json({ 
        success: false, 
        message: 'SOP step not found' 
      });
    }

    if (actionType) {
      const validActionTypes = ['CALL', 'EMAIL', 'LEGAL_NOTICE', 'PERSONAL_VISIT', 'SMS', 'ESCALATION'];
      if (!validActionTypes.includes(actionType)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid action type' 
        });
      }
      step.actionType = actionType;
    }

    if (dueInDays !== undefined) step.dueInDays = dueInDays;
    if (mandatory !== undefined) step.mandatory = mandatory;
    if (description) step.description = description;

    await step.save();

    return res.status(200).json({
      success: true,
      message: 'SOP step updated successfully',
      step
    });
  } catch (error) {
    console.error('Update SOP step error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error updating SOP step',
      error: error.message 
    });
  }
};

// DELETE /sop/steps/:id - Delete SOP step (Admin Only)
exports.deleteSOPStep = async (req, res) => {
  try {
    const { id } = req.params;

    const step = await SOPStep.findByPk(id);
    if (!step) {
      return res.status(404).json({ 
        success: false, 
        message: 'SOP step not found' 
      });
    }

    await step.destroy();

    return res.status(200).json({
      success: true,
      message: 'SOP step deleted successfully'
    });
  } catch (error) {
    console.error('Delete SOP step error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error deleting SOP step',
      error: error.message 
    });
  }
};
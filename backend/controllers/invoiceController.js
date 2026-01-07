const { Invoice, Customer } = require('../models');
const { Op } = require('sequelize');

// GET /invoices - Get all invoices with overdue highlighting
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      include: [{ model: Customer, as: 'customer' }],
      order: [['createdAt', 'DESC']]
    });

    // Add overdue alert flag
    const invoicesWithAlert = invoices.map(inv => ({
      ...inv.toJSON(),
      isOverdue: inv.invoiceStatus === 'OVERDUE' && inv.daysOverdue > 0,
      alertLevel: inv.daysOverdue > 60 ? 'HIGH' : inv.daysOverdue > 30 ? 'MEDIUM' : 'LOW'
    }));

    return res.status(200).json({
      success: true,
      count: invoices.length,
      invoices: invoicesWithAlert
    });
  } catch (error) {
    console.error('Get invoices error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching invoices',
      error: error.message 
    });
  }
};

// GET /invoices/:id - Get invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findByPk(id, {
      include: [{ model: Customer, as: 'customer' }]
    });

    if (!invoice) {
      return res.status(404).json({ 
        success: false, 
        message: 'Invoice not found' 
      });
    }

    return res.status(200).json({
      success: true,
      invoice
    });
  } catch (error) {
    console.error('Get invoice error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching invoice',
      error: error.message 
    });
  }
};

// POST /invoices - Create new invoice (Admin Only)
exports.createInvoice = async (req, res) => {
  try {
    const { customerId, invoiceAmount, dueDate } = req.body;

    // Validate input
    if (!customerId || !invoiceAmount || !dueDate) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields required' 
      });
    }

    // Check if customer exists
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Customer not found' 
      });
    }

    // Calculate daysOverdue
    const today = new Date();
    const due = new Date(dueDate);
    const daysOverdue = Math.floor((today - due) / (1000 * 60 * 60 * 24));
    const invoiceStatus = daysOverdue > 0 ? 'OVERDUE' : 'OPEN';

    const invoice = await Invoice.create({
      customerId,
      invoiceAmount,
      dueDate,
      daysOverdue: Math.max(0, daysOverdue),
      invoiceStatus
    });

    return res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      invoice
    });
  } catch (error) {
    console.error('Create invoice error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error creating invoice',
      error: error.message 
    });
  }
};

// PUT /invoices/:id - Update invoice status (Admin Only)
exports.updateInvoiceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { invoiceStatus } = req.body;

    if (!invoiceStatus || !['OPEN', 'PAID', 'OVERDUE'].includes(invoiceStatus)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status. Must be OPEN, PAID, or OVERDUE' 
      });
    }

    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ 
        success: false, 
        message: 'Invoice not found' 
      });
    }

    invoice.invoiceStatus = invoiceStatus;
    await invoice.save();

    return res.status(200).json({
      success: true,
      message: 'Invoice updated successfully',
      invoice
    });
  } catch (error) {
    console.error('Update invoice error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error updating invoice',
      error: error.message 
    });
  }
};
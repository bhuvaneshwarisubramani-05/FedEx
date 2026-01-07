const { Customer } = require('../models');

// GET /customers - Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();

    return res.status(200).json({
      success: true,
      count: customers.length,
      customers
    });
  } catch (error) {
    console.error('Get customers error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching customers',
      error: error.message 
    });
  }
};

// GET /customers/:id - Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Customer not found' 
      });
    }

    return res.status(200).json({
      success: true,
      customer
    });
  } catch (error) {
    console.error('Get customer error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching customer',
      error: error.message 
    });
  }
};

// POST /customers - Create new customer (Admin Only)
exports.createCustomer = async (req, res) => {
  try {
    const { customerName, companyType, contactEmail, contactPhone } = req.body;

    // Validate input
    if (!customerName || !companyType || !contactEmail || !contactPhone) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields required' 
      });
    }

    const customer = await Customer.create({
      customerName,
      companyType,
      contactEmail,
      contactPhone
    });

    return res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      customer
    });
  } catch (error) {
    console.error('Create customer error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error creating customer',
      error: error.message 
    });
  }
};

// PUT /customers/:id - Update customer (Admin Only)
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerName, companyType, contactEmail, contactPhone } = req.body;

    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Customer not found' 
      });
    }

    // Update fields
    if (customerName) customer.customerName = customerName;
    if (companyType) customer.companyType = companyType;
    if (contactEmail) customer.contactEmail = contactEmail;
    if (contactPhone) customer.contactPhone = contactPhone;

    await customer.save();

    return res.status(200).json({
      success: true,
      message: 'Customer updated successfully',
      customer
    });
  } catch (error) {
    console.error('Update customer error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error updating customer',
      error: error.message 
    });
  }
};
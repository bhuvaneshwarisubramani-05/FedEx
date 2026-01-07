const jwt = require('jsonwebtoken');

// JWT Verification Middleware
exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token',
      error: error.message 
    });
  }
};

// Admin Role Verification
exports.verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Admin role required' 
    });
  }
  next();
};

// Credit Manager or Admin Role Verification
exports.verifyCreditManager = (req, res, next) => {
  if (req.user.role !== 'CREDIT_MANAGER' && req.user.role !== 'ADMIN') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Credit Manager or Admin role required' 
    });
  }
  next();
};
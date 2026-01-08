const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const { sequelize } = require('./models');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ===================== MIDDLEWARE =====================

// CORS Configuration
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200
}));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging Middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// ===================== DATABASE CONNECTION =====================

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');

    // ENABLE SYNC ONLY ONE TIME (creates tables automatically)
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};


// ===================== ROUTES =====================

// Import routes
const apiRoutes = require('./routes');

// Health check endpoint
app.get('/health', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api', apiRoutes);

// ===================== ERROR HANDLING =====================

// 404 Handler
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Global Error Handler
app.use((error, req, res, next) => {
  console.error('🔴 Error:', error.message);
  
  const statusCode = error.status || error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { error: error.stack })
  });
});

// ===================== SERVER START =====================

const PORT = process.env.PORT || 5000;
let server;

const startServer = async () => {
  try {
    // Connect to database
    console.log('🔄 Connecting to database...');
    await connectDB();
    
    // Start listening
    server = app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`📍 URL: http://localhost:${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📚 API Base: http://localhost:${PORT}/api`);
      console.log(`💚 Health Check: http://localhost:${PORT}/health`);
      console.log('\n🚀 Server is ready to accept requests\n');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// ===================== GRACEFUL SHUTDOWN =====================

const gracefulShutdown = async (signal) => {
  console.log(`\n⚠️  ${signal} signal received: closing HTTP server`);
  
  if (server) {
    server.close(async () => {
      console.log('✅ HTTP server closed');
      
      try {
        await sequelize.close();
        console.log('✅ Database connection closed');
      } catch (error) {
        console.error('❌ Error closing database:', error.message);
      }
      
      console.log('✅ Process terminated gracefully');
      process.exit(0);
    });
  } else {
    process.exit(1);
  }
};

// Handle termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error.message);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// ===================== START APPLICATION =====================

if (require.main === module) {
  startServer();
}

module.exports = app;
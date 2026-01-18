// src/utils/helpers.js

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount || 0);
};

export const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-IN');
};

export const formatDateTime = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleString('en-IN');
};

export const getStatusColor = (status) => {
  const colors = {
    'OPEN': 'bg-yellow-100 text-yellow-800',
    'IN_PROGRESS': 'bg-blue-100 text-blue-800',
    'CLOSED': 'bg-green-100 text-green-800',
    'PENDING': 'bg-gray-100 text-gray-800',
    'COMPLETED': 'bg-green-100 text-green-800',
    'MISSED': 'bg-red-100 text-red-800',
    'CANCELLED': 'bg-gray-100 text-gray-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const getRiskColor = (risk) => {
  const colors = {
    'LOW': 'bg-green-100 text-green-800',
    'MEDIUM': 'bg-yellow-100 text-yellow-800',
    'HIGH': 'bg-orange-100 text-orange-800',
    'VERY_HIGH': 'bg-red-100 text-red-800'
  };
  return colors[risk] || 'bg-gray-100 text-gray-800';
};

export const truncateId = (id) => {
  return id?.slice(0, 8) || 'N/A';
};

export const getDaysAgo = (date) => {
  if (!date) return 'N/A';
  const now = new Date();
  const then = new Date(date);
  const days = Math.floor((now - then) / (1000 * 60 * 60 * 24));
  return days === 0 ? 'Today' : `${days}d ago`;
};
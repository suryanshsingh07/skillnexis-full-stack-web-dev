export const formatPrice = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '₹0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const getStockStatus = (stock) => {
  if (stock <= 0) {
    return { label: 'Out of Stock', type: 'out-of-stock', available: false };
  }
  if (stock <= 5) {
    return { label: `Only ${stock} Left`, type: 'low-stock', available: true };
  }
  return { label: 'In Stock', type: 'in-stock', available: true };
};

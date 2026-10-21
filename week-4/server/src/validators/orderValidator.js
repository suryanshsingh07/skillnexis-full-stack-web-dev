const validateCreateOrder = (req, res, next) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;
  const errors = [];

  if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
    errors.push('Order must contain at least one item');
  } else {
    orderItems.forEach((item, index) => {
      if (!item.product) {
        errors.push(`Item ${index + 1}: product ID is required`);
      }
      if (!item.quantity || typeof item.quantity !== 'number' || item.quantity <= 0 || !Number.isInteger(item.quantity)) {
        errors.push(`Item ${index + 1}: valid integer quantity is required`);
      }
    });
  }

  if (!shippingAddress || typeof shippingAddress !== 'object') {
    errors.push('Shipping address is required');
  } else {
    const { fullName, street, city, state, postalCode, phone } = shippingAddress;
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      errors.push('Recipient full name is required');
    }
    if (!street || typeof street !== 'string' || !street.trim()) {
      errors.push('Street address is required');
    }
    if (!city || typeof city !== 'string' || !city.trim()) {
      errors.push('City is required');
    }
    if (!state || typeof state !== 'string' || !state.trim()) {
      errors.push('State is required');
    }
    if (!postalCode || typeof postalCode !== 'string' || !postalCode.trim()) {
      errors.push('Postal/PIN code is required');
    }
    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      errors.push('Phone number is required');
    }
  }

  if (paymentMethod && !['demo_card', 'cod'].includes(paymentMethod)) {
    errors.push('Invalid payment method. Allowed methods: demo_card, cod');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: errors.join(', '),
      errors
    });
  }

  next();
};

module.exports = { validateCreateOrder };

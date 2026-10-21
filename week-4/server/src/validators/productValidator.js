const validateProduct = (req, res, next) => {
  const { name, price, category, stock, imageUrl, description } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Product name is required');
  }

  const numPrice = Number(price);
  if (price === undefined || price === null || isNaN(numPrice) || numPrice < 0) {
    errors.push('Price must be a valid non-negative number');
  }

  if (!category || typeof category !== 'string' || category.trim().length === 0) {
    errors.push('Product category is required');
  }

  const numStock = Number(stock);
  if (stock === undefined || stock === null || isNaN(numStock) || numStock < 0 || !Number.isInteger(numStock)) {
    errors.push('Stock must be a non-negative whole integer');
  }

  if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim().length === 0) {
    errors.push('Product image URL is required');
  }

  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    errors.push('Product description is required');
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

module.exports = { validateProduct };

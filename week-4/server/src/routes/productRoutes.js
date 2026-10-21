const express = require('express');
const router = express.Router();
const {
  getProducts,
  getFeaturedProducts,
  getCategories,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const { validateProduct } = require('../validators/productValidator');

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/categories', getCategories);
router.get('/:id', getProductById);

router.post('/', authenticate, authorizeAdmin, validateProduct, createProduct);
router.put('/:id', authenticate, authorizeAdmin, validateProduct, updateProduct);
router.delete('/:id', authenticate, authorizeAdmin, deleteProduct);

module.exports = router;

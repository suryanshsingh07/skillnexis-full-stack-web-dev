const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const { validateCreateOrder } = require('../validators/orderValidator');

router.post('/', authenticate, validateCreateOrder, createOrder);
router.get('/myorders', authenticate, getMyOrders);
router.get('/:id', authenticate, getOrderById);

router.get('/', authenticate, authorizeAdmin, getAllOrders);
router.put('/:id/status', authenticate, authorizeAdmin, updateOrderStatus);

module.exports = router;

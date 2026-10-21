const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order with authoritative backend pricing and stock deduction
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod = 'demo_card' } = req.body;

    if (!orderItems || !orderItems.length) {
      return res.status(400).json({
        success: false,
        message: 'No order items supplied'
      });
    }

    // Step 1: Verify all products, availability, and authoritative prices from database
    const validatedItems = [];
    let subtotal = 0;
    const stockUpdates = [];

    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${item.product} was not found`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for "${product.name}". Available: ${product.stock}, requested: ${item.quantity}.`
        });
      }

      const itemSubtotal = product.price * item.quantity;
      subtotal += itemSubtotal;

      validatedItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.price,
        imageUrl: product.imageUrl
      });

      stockUpdates.push({
        productId: product._id,
        deductQuantity: item.quantity
      });
    }

    // Step 2: Authoritative shipping and tax calculations
    // Free shipping on orders over ₹999, else ₹99 flat delivery fee
    const shippingPrice = subtotal >= 999 ? 0 : 99;
    const taxPrice = Math.round(subtotal * 0.05 * 100) / 100; // 5% GST
    const totalPrice = Math.round((subtotal + shippingPrice + taxPrice) * 100) / 100;

    // Step 3: Deduct stock safely
    for (const update of stockUpdates) {
      await Product.findByIdAndUpdate(update.productId, {
        $inc: { stock: -update.deductQuantity }
      });
    }

    // Step 4: Create order
    const order = await Order.create({
      user: req.user._id,
      orderItems: validatedItems,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'demo_card' ? 'paid' : 'pending',
      orderStatus: 'processing',
      subtotal,
      shippingPrice,
      taxPrice,
      totalPrice,
      paidAt: paymentMethod === 'demo_card' ? new Date() : null
    });

    res.status(201).json({
      success: true,
      message: 'Order created and placed successfully',
      order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Ensure user owns this order OR user is an admin
    const isOwner = order.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You do not have authorization to view this order.'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (admin only)
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const skip = (page - 1) * limit;

    const totalOrders = await Order.countDocuments();
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Calculate executive store analytics
    const allOrdersList = await Order.find({}, 'totalPrice orderStatus paymentStatus');
    const totalRevenue = allOrdersList
      .filter((o) => o.paymentStatus === 'paid' && o.orderStatus !== 'cancelled')
      .reduce((acc, curr) => acc + curr.totalPrice, 0);

    const pendingCount = allOrdersList.filter((o) => o.orderStatus === 'processing' || o.orderStatus === 'pending').length;
    const deliveredCount = allOrdersList.filter((o) => o.orderStatus === 'delivered').length;
    const cancelledCount = allOrdersList.filter((o) => o.orderStatus === 'cancelled').length;

    res.status(200).json({
      success: true,
      count: orders.length,
      total: totalOrders,
      page,
      pages: Math.ceil(totalOrders / limit) || 1,
      analytics: {
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        totalOrders: totalOrders,
        pendingCount,
        deliveredCount,
        cancelledCount
      },
      orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, paymentStatus } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid order status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // If order is transitioning to 'cancelled' from a non-cancelled status, restore product stock
    if (status === 'cancelled' && order.orderStatus !== 'cancelled') {
      for (const item of order.orderItems) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity }
        });
      }
    }

    if (status) {
      order.orderStatus = status;
      if (status === 'delivered') {
        order.deliveredAt = new Date();
        order.paymentStatus = 'paid';
      }
    }

    if (paymentStatus && ['pending', 'paid'].includes(paymentStatus)) {
      order.paymentStatus = paymentStatus;
      if (paymentStatus === 'paid' && !order.paidAt) {
        order.paidAt = new Date();
      }
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
};

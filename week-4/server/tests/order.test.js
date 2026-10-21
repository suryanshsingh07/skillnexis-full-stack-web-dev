const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const Order = require('../src/models/Order');
const Product = require('../src/models/Product');
const User = require('../src/models/User');

describe('Order Management & Authoritative Checkout (/api/orders)', () => {
  const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_jwt_key_nexisstore_week4_skillnexis';
  const customerId = '64b1f2e8c9d1a2b3c4d5e6f2';
  const otherUserId = '64b1f2e8c9d1a2b3c4d5e6f3';
  const adminId = '64b1f2e8c9d1a2b3c4d5e6f1';

  let customerToken;
  let adminToken;
  let otherUserToken;

  const sampleProduct = {
    _id: '64b1f2e8c9d1a2b3c4d5e6a1',
    name: 'Aura Studio Wireless Headphones',
    price: 1000,
    stock: 5,
    imageUrl: 'https://example.com/headphone.jpg'
  };

  const validShippingAddress = {
    fullName: 'Suryansh Singh',
    street: '42 Gomti Nagar',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    postalCode: '226010',
    phone: '9876543210'
  };

  beforeEach(() => {
    jest.clearAllMocks();

    customerToken = jwt.sign({ id: customerId, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });
    adminToken = jwt.sign({ id: adminId, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
    otherUserToken = jwt.sign({ id: otherUserId, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });

    jest.spyOn(User, 'findById').mockImplementation((id) => {
      const idStr = String(id);
      if (idStr === customerId) {
        return { select: jest.fn().mockResolvedValue({ _id: customerId, name: 'Customer', role: 'user' }) };
      }
      if (idStr === adminId) {
        return { select: jest.fn().mockResolvedValue({ _id: adminId, name: 'Admin', role: 'admin' }) };
      }
      if (idStr === otherUserId) {
        return { select: jest.fn().mockResolvedValue({ _id: otherUserId, name: 'Other', role: 'user' }) };
      }
      return { select: jest.fn().mockResolvedValue(null) };
    });
  });

  describe('POST /api/orders', () => {
    it('should reject unauthenticated order submission with 401 Unauthorized', async () => {
      const res = await request(app)
        .post('/api/orders')
        .send({
          orderItems: [{ product: sampleProduct._id, quantity: 1 }],
          shippingAddress: validShippingAddress
        });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should reject order if requested quantity exceeds available stock with 400', async () => {
      jest.spyOn(Product, 'findById').mockResolvedValue({
        ...sampleProduct,
        stock: 2 // only 2 in stock
      });

      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          orderItems: [{ product: sampleProduct._id, quantity: 10 }], // requesting 10
          shippingAddress: validShippingAddress
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Insufficient stock');
    });

    it('should calculate authoritative totals, deduct stock, and create order with 201', async () => {
      jest.spyOn(Product, 'findById').mockResolvedValue({
        ...sampleProduct,
        stock: 10
      });

      const updateStockSpy = jest.spyOn(Product, 'findByIdAndUpdate').mockResolvedValue(true);

      jest.spyOn(Order, 'create').mockImplementation(async (orderData) => ({
        _id: '64b1f2e8c9d1a2b3c4d5e6e1',
        ...orderData
      }));

      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          orderItems: [{ product: sampleProduct._id, quantity: 2 }],
          shippingAddress: validShippingAddress,
          paymentMethod: 'demo_card'
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.order.subtotal).toBe(2000); // 1000 * 2
      expect(res.body.order.shippingPrice).toBe(0); // Subtotal >= 999 gets free shipping
      expect(res.body.order.taxPrice).toBe(100); // 5% of 2000
      expect(res.body.order.totalPrice).toBe(2100);
      expect(updateStockSpy).toHaveBeenCalledWith(
        sampleProduct._id,
        { $inc: { stock: -2 } }
      );
    });
  });

  describe('GET /api/orders/myorders', () => {
    it('should retrieve only the logged in user orders', async () => {
      const userOrders = [
        { _id: 'order-1', user: customerId, totalPrice: 2100, orderStatus: 'processing' }
      ];

      jest.spyOn(Order, 'find').mockReturnValue({
        sort: jest.fn().mockResolvedValue(userOrders)
      });

      const res = await request(app)
        .get('/api/orders/myorders')
        .set('Authorization', `Bearer ${customerToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.orders).toHaveLength(1);
    });
  });

  describe('GET /api/orders/:id ownership security', () => {
    it('should prevent user A from viewing user B order with 403 Forbidden', async () => {
      const customerOrder = {
        _id: 'order-1',
        user: { _id: customerId, name: 'Customer', email: 'cust@example.com' },
        totalPrice: 2100
      };

      jest.spyOn(Order, 'findById').mockReturnValue({
        populate: jest.fn().mockResolvedValue(customerOrder)
      });

      // Request made by otherUser
      const res = await request(app)
        .get('/api/orders/order-1')
        .set('Authorization', `Bearer ${otherUserToken}`);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Forbidden');
    });

    it('should allow admin to view any user order with 200 OK', async () => {
      const customerOrder = {
        _id: 'order-1',
        user: { _id: customerId, name: 'Customer', email: 'cust@example.com' },
        totalPrice: 2100
      };

      jest.spyOn(Order, 'findById').mockReturnValue({
        populate: jest.fn().mockResolvedValue(customerOrder)
      });

      const res = await request(app)
        .get('/api/orders/order-1')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.order._id).toBe('order-1');
    });
  });
});

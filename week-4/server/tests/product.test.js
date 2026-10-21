const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const Product = require('../src/models/Product');
const User = require('../src/models/User');

describe('Product Management API (/api/products)', () => {
  const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_jwt_key_nexisstore_week4_skillnexis';
  const adminId = '64b1f2e8c9d1a2b3c4d5e6f1';
  const regularUserId = '64b1f2e8c9d1a2b3c4d5e6f2';

  let adminToken;
  let userToken;

  const sampleProducts = [
    {
      _id: '64b1f2e8c9d1a2b3c4d5e6a1',
      name: 'Wireless Headphones',
      price: 4999,
      category: 'electronics',
      brand: 'AuraSound',
      stock: 15,
      imageUrl: 'https://example.com/img1.jpg',
      rating: 4.8,
      numReviews: 12,
      isFeatured: true
    },
    {
      _id: '64b1f2e8c9d1a2b3c4d5e6a2',
      name: 'Leather Watch',
      price: 8999,
      category: 'fashion',
      brand: 'Chronos',
      stock: 8,
      imageUrl: 'https://example.com/img2.jpg',
      rating: 4.6,
      numReviews: 9,
      isFeatured: false
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    adminToken = jwt.sign({ id: adminId, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
    userToken = jwt.sign({ id: regularUserId, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });

    jest.spyOn(User, 'findById').mockImplementation((id) => {
      const idStr = String(id);
      if (idStr === adminId) {
        return {
          select: jest.fn().mockResolvedValue({ _id: adminId, name: 'Admin', role: 'admin' })
        };
      }
      if (idStr === regularUserId) {
        return {
          select: jest.fn().mockResolvedValue({ _id: regularUserId, name: 'User', role: 'user' })
        };
      }
      return { select: jest.fn().mockResolvedValue(null) };
    });
  });

  describe('GET /api/products', () => {
    it('should return list of products with pagination info', async () => {
      jest.spyOn(Product, 'countDocuments').mockResolvedValue(2);
      jest.spyOn(Product, 'find').mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(sampleProducts)
      });

      const res = await request(app).get('/api/products');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.products).toHaveLength(2);
      expect(res.body.total).toBe(2);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return 200 with product details for valid ID', async () => {
      jest.spyOn(Product, 'findById').mockResolvedValue(sampleProducts[0]);

      const res = await request(app).get('/api/products/64b1f2e8c9d1a2b3c4d5e6a1');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.product.name).toBe('Wireless Headphones');
    });

    it('should return 404 if product does not exist', async () => {
      jest.spyOn(Product, 'findById').mockResolvedValue(null);

      const res = await request(app).get('/api/products/64b1f2e8c9d1a2b3c4d5e6a9');

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Admin Authorization for Product Mutation', () => {
    const validProductPayload = {
      name: 'Smart Ambient Light',
      price: 2999,
      description: 'Smart ambient light with customizable colors',
      category: 'home',
      stock: 20,
      imageUrl: 'https://example.com/light.jpg'
    };

    it('should reject product creation without token with 401', async () => {
      const res = await request(app)
        .post('/api/products')
        .send(validProductPayload);

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should reject product creation by non-admin user with 403 Forbidden', async () => {
      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${userToken}`)
        .send(validProductPayload);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Administrator privileges required');
    });

    it('should allow admin user to create a product with 201 Created', async () => {
      jest.spyOn(Product, 'create').mockResolvedValue({
        _id: '64b1f2e8c9d1a2b3c4d5e6a3',
        ...validProductPayload
      });

      const res = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validProductPayload);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.product.name).toBe('Smart Ambient Light');
    });

    it('should allow admin to delete a product', async () => {
      jest.spyOn(Product, 'findById').mockResolvedValue(sampleProducts[0]);
      jest.spyOn(Product, 'findByIdAndDelete').mockResolvedValue(sampleProducts[0]);

      const res = await request(app)
        .delete('/api/products/64b1f2e8c9d1a2b3c4d5e6a1')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toContain('deleted');
    });
  });
});

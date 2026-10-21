const request = require('supertest');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const User = require('../src/models/User');

describe('Authentication API (/api/auth)', () => {
  let mockUsers = [];
  const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_jwt_key_nexisstore_week4_skillnexis';

  beforeEach(() => {
    mockUsers = [];
    jest.clearAllMocks();

    jest.spyOn(User, 'findOne').mockImplementation((filter) => {
      const email = filter.email?.toLowerCase();
      const user = mockUsers.find((u) => u.email.toLowerCase() === email);

      const queryObj = {
        select: jest.fn().mockImplementation(() => {
          if (!user) return Promise.resolve(null);
          return Promise.resolve({
            ...user,
            matchPassword: async (pwd) => bcrypt.compare(pwd, user.password)
          });
        }),
        then: (resolve) => {
          if (!user) return resolve(null);
          resolve({
            ...user,
            matchPassword: async (pwd) => bcrypt.compare(pwd, user.password)
          });
        }
      };
      return queryObj;
    });

    jest.spyOn(User, 'findById').mockImplementation((id) => {
      const user = mockUsers.find((u) => u._id.toString() === String(id));
      return {
        select: jest.fn().mockImplementation(() => {
          if (!user) return Promise.resolve(null);
          const { password, ...safe } = user;
          return Promise.resolve(safe);
        })
      };
    });

    jest.spyOn(User, 'create').mockImplementation(async (userData) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      const newUser = {
        _id: '64b1f2e8c9d1a2b3c4d5e6f7',
        name: userData.name,
        email: userData.email.toLowerCase(),
        password: hashedPassword,
        role: userData.role || 'user',
        address: userData.address || {},
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockUsers.push(newUser);
      return newUser;
    });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully with 201 Created and return a JWT', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Jane Doe',
          email: 'jane@example.com',
          password: 'Password@123'
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe('jane@example.com');
      expect(res.body.user.role).toBe('user');
    });

    it('should reject registration with duplicate email with 409 Conflict', async () => {
      mockUsers.push({
        _id: 'existing-id-1',
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'hashedpassword',
        role: 'user'
      });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Jane Doe',
          email: 'jane@example.com',
          password: 'Password@123'
        });

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('already exists');
    });

    it('should fail with 400 when input validation fails', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: '',
          email: 'invalid-email',
          password: '123'
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('CorrectPass@123', salt);
      mockUsers.push({
        _id: '64b1f2e8c9d1a2b3c4d5e6f8',
        name: 'John User',
        email: 'john@example.com',
        password: hashedPassword,
        role: 'user',
        address: {}
      });
    });

    it('should authenticate user with valid credentials and return 200 OK', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john@example.com',
          password: 'CorrectPass@123'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe('john@example.com');
    });

    it('should reject invalid password with 401 Unauthorized', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john@example.com',
          password: 'WrongPassword'
        });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Invalid email or password');
    });

    it('should reject non-existent user with 401 Unauthorized', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nobody@example.com',
          password: 'SomePassword'
        });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/auth/me', () => {
    it('should reject request without Bearer token with 401', async () => {
      const res = await request(app).get('/api/auth/me');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should return user profile with valid Bearer token', async () => {
      const userId = '64b1f2e8c9d1a2b3c4d5e6f8';
      mockUsers.push({
        _id: userId,
        name: 'John User',
        email: 'john@example.com',
        role: 'user',
        address: {}
      });

      const token = jwt.sign({ id: userId, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });

      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user.name).toBe('John User');
    });
  });
});

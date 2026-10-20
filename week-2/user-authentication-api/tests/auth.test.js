const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const User = require('../src/models/User');

describe('User Authentication API (/api/auth) — Integration & Security Tests', () => {
  let mockUsersStore = [];
  const JWT_SECRET = process.env.JWT_SECRET || 'skillnexis_super_secret_jwt_key_week2_suryansh_2026';

  beforeEach(() => {
    mockUsersStore = [];

    // Mock User.findOne
    jest.spyOn(User, 'findOne').mockImplementation((filter) => {
      const email = filter.email?.toLowerCase();
      const user = mockUsersStore.find((u) => u.email.toLowerCase() === email);

      const queryObj = {
        select: jest.fn().mockImplementation((fields) => {
          if (!user) return Promise.resolve(null);
          // Return user instance with matchPassword method
          return Promise.resolve({
            ...user,
            matchPassword: async (pwd) => bcrypt.compare(pwd, user.password),
          });
        }),
      };

      if (!user) {
        queryObj.then = (resolve) => resolve(null);
        return queryObj;
      }

      queryObj.then = (resolve) =>
        resolve({
          ...user,
          matchPassword: async (pwd) => bcrypt.compare(pwd, user.password),
        });

      return queryObj;
    });

    // Mock User.findById
    jest.spyOn(User, 'findById').mockImplementation((id) => {
      const user = mockUsersStore.find((u) => u._id === String(id));
      return {
        select: jest.fn().mockImplementation(() => {
          if (!user) return Promise.resolve(null);
          const { password, ...safeUser } = user;
          return Promise.resolve(safeUser);
        }),
      };
    });

    // Mock User.create
    jest.spyOn(User, 'create').mockImplementation(async (userData) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const newUser = {
        _id: new mongoose.Types.ObjectId().toString(),
        name: userData.name,
        email: userData.email.toLowerCase(),
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        matchPassword: async (pwd) => bcrypt.compare(pwd, hashedPassword),
      };

      mockUsersStore.push(newUser);
      return newUser;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const validRegistration = {
    name: 'Suryansh Singh',
    email: 'suryansh.test@example.com',
    password: 'SecurePassword123!',
  };

  describe('GET /api/health', () => {
    it('should return 200 and operational service status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('OK');
      expect(res.body.service).toContain('User Authentication API');
      expect(res.body.timestamp).toBeDefined();
    });
  });

  describe('POST /api/auth/register', () => {
    it('should register user with hashed password, return 201, safe user object, and JWT', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(validRegistration);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.name).toBe(validRegistration.name);
      expect(res.body.user.email).toBe(validRegistration.email.toLowerCase());
      expect(res.body.user.password).toBeUndefined(); // Never expose password in response

      // Verify bcrypt hash format in mock store
      const stored = mockUsersStore.find((u) => u.email === validRegistration.email.toLowerCase());
      expect(stored.password).not.toBe(validRegistration.password);
      expect(stored.password).toMatch(/^\$2[aby]\$\d+\$/);
    });

    it('should reject registration if email is already registered and return 400', async () => {
      await request(app).post('/api/auth/register').send(validRegistration);

      const res = await request(app)
        .post('/api/auth/register')
        .send(validRegistration);

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('already exists');
    });

    it('should reject registration with password under 6 characters', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Short Pass',
          email: 'short@example.com',
          password: '123',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('at least 6 characters');
    });

    it('should reject registration with invalid email format', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Invalid Email',
          email: 'not-a-valid-email',
          password: 'Password123',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('valid email');
    });

    it('should reject registration with missing name', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'noname@example.com',
          password: 'Password123',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Name is required');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await request(app).post('/api/auth/register').send(validRegistration);
    });

    it('should authenticate valid credentials and return 200 with JWT token', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: validRegistration.email,
          password: validRegistration.password,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe(validRegistration.email.toLowerCase());
    });

    it('should reject login with wrong password and return generic 401', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: validRegistration.email,
          password: 'WrongPassword999',
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Invalid email or password');
    });

    it('should reject login with unregistered email and return generic 401', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'unregistered@example.com',
          password: 'AnyPassword123',
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Invalid email or password');
    });
  });

  describe('GET /api/auth/me (Protected Route with JWT Middleware)', () => {
    let token;

    beforeEach(async () => {
      const reg = await request(app).post('/api/auth/register').send(validRegistration);
      token = reg.body.token;
    });

    it('should return user profile when provided valid Bearer token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user.name).toBe(validRegistration.name);
      expect(res.body.user.email).toBe(validRegistration.email.toLowerCase());
      expect(res.body.user.password).toBeUndefined();
    });

    it('should reject request when Authorization header is missing (401)', async () => {
      const res = await request(app).get('/api/auth/me');

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Missing Bearer authentication token');
    });

    it('should reject request with an invalid/tampered token (401)', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid_tampered_token_xyz');

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Invalid or malformed authentication token');
    });
  });
});

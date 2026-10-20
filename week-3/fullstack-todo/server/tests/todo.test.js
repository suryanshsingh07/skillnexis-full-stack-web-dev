const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/User');
const Task = require('../src/models/Task');

describe('Full Stack To-Do API Test Suite', () => {
  const mockUserId = new mongoose.Types.ObjectId().toString();
  const mockToken = jwt.sign(
    { id: mockUserId },
    process.env.JWT_SECRET || 'skillnexis_super_secret_jwt_key_week3_2026',
    { expiresIn: '1h' }
  );

  const mockUser = {
    _id: mockUserId,
    name: 'Suryansh Singh',
    email: 'suryansh@example.com',
    role: 'user',
    createdAt: new Date(),
    comparePassword: jest.fn().mockResolvedValue(true)
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/health', () => {
    it('should return 200 and healthy status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.status).toBe('healthy');
    });
  });

  describe('POST /api/auth/register', () => {
    it('should validate missing fields and return 400', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Suryansh' });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should register a new user successfully', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(null);
      jest.spyOn(User, 'create').mockResolvedValue({
        _id: mockUserId,
        name: 'Suryansh Singh',
        email: 'suryansh@example.com',
        role: 'user',
        createdAt: new Date()
      });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Suryansh Singh',
          email: 'suryansh@example.com',
          password: 'Password123'
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
    });
  });

  describe('POST /api/auth/login', () => {
    it('should authenticate user and return token', async () => {
      const userDoc = {
        _id: mockUserId,
        name: 'Suryansh Singh',
        email: 'suryansh@example.com',
        role: 'user',
        comparePassword: jest.fn().mockResolvedValue(true)
      };

      jest.spyOn(User, 'findOne').mockReturnValue({
        select: jest.fn().mockResolvedValue(userDoc)
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'suryansh@example.com',
          password: 'Password123'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
    });
  });

  describe('Protected Task CRUD Operations', () => {
    beforeEach(() => {
      jest.spyOn(User, 'findById').mockResolvedValue(mockUser);
    });

    it('should reject unauthenticated requests with 401', async () => {
      const res = await request(app).get('/api/todos');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should fetch tasks for authenticated user', async () => {
      const mockTasks = [
        { _id: 'task1', title: 'Task 1', completed: false, owner: mockUserId },
        { _id: 'task2', title: 'Task 2', completed: true, owner: mockUserId }
      ];

      jest.spyOn(Task, 'find').mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockTasks)
      });

      const res = await request(app)
        .get('/api/todos')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
    });

    it('should create a task under authenticated user', async () => {
      const createdTask = {
        _id: 'newtask123',
        title: 'Review React Week 3',
        description: 'Complete full stack integration',
        completed: false,
        owner: mockUserId
      };

      jest.spyOn(Task, 'create').mockResolvedValue(createdTask);

      const res = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${mockToken}`)
        .send({
          title: 'Review React Week 3',
          description: 'Complete full stack integration'
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.task.title).toBe('Review React Week 3');
    });

    it('should update task status', async () => {
      const mockTask = {
        _id: 'task1',
        title: 'Task 1',
        completed: false,
        owner: mockUserId,
        save: jest.fn().mockResolvedValue(true)
      };

      jest.spyOn(Task, 'findOne').mockResolvedValue(mockTask);

      const res = await request(app)
        .patch('/api/todos/task1')
        .set('Authorization', `Bearer ${mockToken}`)
        .send({ completed: true });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(mockTask.completed).toBe(true);
    });

    it('should delete task', async () => {
      jest.spyOn(Task, 'findOneAndDelete').mockResolvedValue({ _id: 'task1' });

      const res = await request(app)
        .delete('/api/todos/task1')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});

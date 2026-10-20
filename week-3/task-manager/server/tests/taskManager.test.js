const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/User');
const Task = require('../src/models/Task');

describe('Task Manager API Test Suite', () => {
  const mockUserId = new mongoose.Types.ObjectId().toString();
  const mockOtherUserId = new mongoose.Types.ObjectId().toString();

  const mockToken = jwt.sign(
    { id: mockUserId },
    process.env.JWT_SECRET || 'skillnexis_super_secret_jwt_key_task_manager_2026',
    { expiresIn: '1h' }
  );

  const mockUser = {
    _id: mockUserId,
    name: 'Suryansh Singh',
    email: 'suryansh@example.com',
    role: 'user',
    comparePassword: jest.fn().mockResolvedValue(true)
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/health', () => {
    it('should return healthy status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.service).toBe('task-manager-api');
    });
  });

  describe('User Authentication Routes', () => {
    it('should register a new user', async () => {
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

    it('should login an existing user', async () => {
      jest.spyOn(User, 'findOne').mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
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

  describe('Protected Task CRUD & Data Isolation', () => {
    beforeEach(() => {
      jest.spyOn(User, 'findById').mockResolvedValue(mockUser);
    });

    it('should reject unauthenticated task access', async () => {
      const res = await request(app).get('/api/tasks');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should create task with priority and status', async () => {
      const createdTask = {
        _id: 'task999',
        title: 'Review MongoDB Integration',
        description: 'Ensure Mongoose schemas are verified',
        status: 'in-progress',
        priority: 'high',
        owner: mockUserId
      };

      jest.spyOn(Task, 'create').mockResolvedValue(createdTask);

      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${mockToken}`)
        .send({
          title: 'Review MongoDB Integration',
          description: 'Ensure Mongoose schemas are verified',
          status: 'in-progress',
          priority: 'high'
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.task.status).toBe('in-progress');
      expect(res.body.task.priority).toBe('high');
    });

    it('should fetch tasks and stats for authenticated user', async () => {
      const mockTasks = [
        { _id: 't1', title: 'Task 1', status: 'pending', priority: 'medium', owner: mockUserId },
        { _id: 't2', title: 'Task 2', status: 'completed', priority: 'high', owner: mockUserId }
      ];

      jest.spyOn(Task, 'find')
        .mockReturnValueOnce({ sort: jest.fn().mockResolvedValue(mockTasks) })
        .mockResolvedValueOnce(mockTasks);

      const res = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
      expect(res.body.stats).toBeDefined();
      expect(res.body.stats.total).toBe(2);
    });

    it('should prevent user from accessing another user task (404/unauthorized)', async () => {
      jest.spyOn(Task, 'findOne').mockResolvedValue(null);

      const res = await request(app)
        .get('/api/tasks/another-users-task-id')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it('should update task details', async () => {
      const mockTask = {
        _id: 't1',
        title: 'Task 1',
        status: 'pending',
        priority: 'low',
        owner: mockUserId,
        save: jest.fn().mockResolvedValue(true)
      };

      jest.spyOn(Task, 'findOne').mockResolvedValue(mockTask);

      const res = await request(app)
        .patch('/api/tasks/t1')
        .set('Authorization', `Bearer ${mockToken}`)
        .send({ status: 'completed', priority: 'high' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(mockTask.status).toBe('completed');
      expect(mockTask.priority).toBe('high');
    });

    it('should delete task', async () => {
      jest.spyOn(Task, 'findOneAndDelete').mockResolvedValue({ _id: 't1' });

      const res = await request(app)
        .delete('/api/tasks/t1')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});

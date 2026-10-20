const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Task = require('../src/models/Task');

describe('To-Do REST API (/api/tasks) — Integration & Controller Tests', () => {
  let mockTasksStore = [];

  beforeEach(() => {
    mockTasksStore = [
      {
        _id: '671234567890abcdef123456',
        title: 'Initial Task 1',
        description: 'First test description',
        completed: false,
        createdAt: new Date('2026-10-18T10:00:00Z'),
        updatedAt: new Date('2026-10-18T10:00:00Z'),
      },
      {
        _id: '671234567890abcdef123457',
        title: 'Initial Task 2',
        description: 'Completed task',
        completed: true,
        createdAt: new Date('2026-10-18T11:00:00Z'),
        updatedAt: new Date('2026-10-18T11:00:00Z'),
      },
    ];

    // Mock Task.find
    jest.spyOn(Task, 'find').mockImplementation((query = {}) => {
      let filtered = [...mockTasksStore];
      if (query.completed !== undefined) {
        filtered = filtered.filter((t) => t.completed === query.completed);
      }
      return {
        sort: jest.fn().mockResolvedValue(filtered),
      };
    });

    // Mock Task.findById
    jest.spyOn(Task, 'findById').mockImplementation((id) => {
      const found = mockTasksStore.find((t) => t._id === String(id));
      return Promise.resolve(found || null);
    });

    // Mock Task.create
    jest.spyOn(Task, 'create').mockImplementation((data) => {
      const newTask = {
        _id: new mongoose.Types.ObjectId().toString(),
        title: data.title,
        description: data.description || '',
        completed: data.completed || false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockTasksStore.push(newTask);
      return Promise.resolve(newTask);
    });

    // Mock Task.findByIdAndUpdate
    jest.spyOn(Task, 'findByIdAndUpdate').mockImplementation((id, updates) => {
      const idx = mockTasksStore.findIndex((t) => t._id === String(id));
      if (idx === -1) return Promise.resolve(null);
      const updated = { ...mockTasksStore[idx], ...updates, updatedAt: new Date() };
      mockTasksStore[idx] = updated;
      return Promise.resolve(updated);
    });

    // Mock Task.findByIdAndDelete
    jest.spyOn(Task, 'findByIdAndDelete').mockImplementation((id) => {
      const idx = mockTasksStore.findIndex((t) => t._id === String(id));
      if (idx === -1) return Promise.resolve(null);
      const deleted = mockTasksStore.splice(idx, 1)[0];
      return Promise.resolve(deleted);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET /api/health', () => {
    it('should return 200 and operational service status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('OK');
      expect(res.body.service).toContain('To-Do List REST API');
      expect(res.body.timestamp).toBeDefined();
    });
  });

  describe('POST /api/tasks (Create Task)', () => {
    it('should create a new task with valid data and return 201', async () => {
      const taskData = {
        title: 'Review React Hooks architecture',
        description: 'Deep dive into useEffect cleanup and custom hooks.',
        completed: false,
      };

      const res = await request(app).post('/api/tasks').send(taskData);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toContain('created successfully');
      expect(res.body.data.title).toBe(taskData.title);
      expect(res.body.data.description).toBe(taskData.description);
      expect(res.body.data.completed).toBe(false);
      expect(res.body.data._id).toBeDefined();
    });

    it('should reject task creation with missing title and return 400', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ description: 'No title provided' });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('title is required');
    });

    it('should reject task creation with short title (< 3 chars) and return 400', async () => {
      const res = await request(app).post('/api/tasks').send({ title: 'ab' });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('at least 3 characters');
    });

    it('should reject task creation with title exceeding 200 chars and return 400', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: 'a'.repeat(201) });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('cannot exceed 200 characters');
    });
  });

  describe('GET /api/tasks (List Tasks)', () => {
    it('should retrieve all tasks with count and return 200', async () => {
      const res = await request(app).get('/api/tasks');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
      expect(res.body.data).toHaveLength(2);
    });

    it('should filter tasks by completed query param', async () => {
      const res = await request(app).get('/api/tasks?completed=true');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(1);
      expect(res.body.data[0].completed).toBe(true);
    });
  });

  describe('GET /api/tasks/:id (Retrieve Single Task)', () => {
    it('should retrieve task by valid ID and return 200', async () => {
      const res = await request(app).get('/api/tasks/671234567890abcdef123456');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Initial Task 1');
    });

    it('should return 404 for non-existent valid ObjectId', async () => {
      const nonExistentId = '671234567890abcdef123499';
      const res = await request(app).get(`/api/tasks/${nonExistentId}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Task not found');
    });

    it('should return 400 for malformed ObjectId format', async () => {
      const res = await request(app).get('/api/tasks/invalid-malformed-id');

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Invalid Task ID format');
    });
  });

  describe('PATCH /api/tasks/:id (Update Task)', () => {
    it('should update completed status and title, returning 200', async () => {
      const res = await request(app)
        .patch('/api/tasks/671234567890abcdef123456')
        .send({ title: 'Updated Title', completed: true });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toContain('updated successfully');
      expect(res.body.data.title).toBe('Updated Title');
      expect(res.body.data.completed).toBe(true);
    });

    it('should reject update if request body has no valid fields', async () => {
      const res = await request(app)
        .patch('/api/tasks/671234567890abcdef123456')
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('must contain at least one field');
    });

    it('should return 404 when updating non-existent task', async () => {
      const res = await request(app)
        .patch('/api/tasks/671234567890abcdef123499')
        .send({ completed: true });

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Task not found');
    });
  });

  describe('DELETE /api/tasks/:id (Delete Task)', () => {
    it('should delete task and return 200', async () => {
      const res = await request(app).delete('/api/tasks/671234567890abcdef123456');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toContain('deleted successfully');
      expect(res.body.data.id).toBe('671234567890abcdef123456');
    });

    it('should return 404 when deleting non-existent task', async () => {
      const res = await request(app).delete('/api/tasks/671234567890abcdef123499');

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Unknown Route Handler', () => {
    it('should return 404 for unmapped endpoints', async () => {
      const res = await request(app).get('/api/unmapped-endpoint');
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Endpoint not found');
    });
  });
});

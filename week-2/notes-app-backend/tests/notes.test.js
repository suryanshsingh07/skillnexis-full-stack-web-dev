const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const User = require('../src/models/User');
const Note = require('../src/models/Note');

describe('Notes App Backend API (/api/notes) — Integration & Ownership Isolation Tests', () => {
  let mockUsersStore = [];
  let mockNotesStore = [];
  const JWT_SECRET = process.env.JWT_SECRET || 'skillnexis_super_secret_notes_jwt_key_week2_2026';

  let userAToken;
  let userBToken;
  let userAId;
  let userBId;

  beforeEach(async () => {
    mockUsersStore = [];
    mockNotesStore = [];

    // Mock User queries
    jest.spyOn(User, 'findOne').mockImplementation((filter) => {
      const email = filter.email?.toLowerCase();
      const user = mockUsersStore.find((u) => u.email.toLowerCase() === email);
      const queryObj = {
        select: jest.fn().mockImplementation(() => {
          if (!user) return Promise.resolve(null);
          return Promise.resolve({
            ...user,
            matchPassword: async (pwd) => bcrypt.compare(pwd, user.password),
          });
        }),
      };
      if (!user) {
        queryObj.then = (r) => r(null);
        return queryObj;
      }
      queryObj.then = (r) => r({ ...user, matchPassword: async (pwd) => bcrypt.compare(pwd, user.password) });
      return queryObj;
    });

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

    // Mock Note queries
    jest.spyOn(Note, 'find').mockImplementation((filter = {}) => {
      let filtered = [...mockNotesStore];
      if (filter.owner) {
        filtered = filtered.filter((n) => String(n.owner) === String(filter.owner));
      }
      if (filter.tags) {
        filtered = filtered.filter((n) => n.tags.includes(filter.tags));
      }
      return {
        sort: jest.fn().mockResolvedValue(filtered),
      };
    });

    jest.spyOn(Note, 'findOne').mockImplementation((filter = {}) => {
      const found = mockNotesStore.find((n) => {
        const matchId = String(n._id) === String(filter._id);
        const matchOwner = filter.owner ? String(n.owner) === String(filter.owner) : true;
        return matchId && matchOwner;
      });
      return Promise.resolve(found || null);
    });

    jest.spyOn(Note, 'create').mockImplementation((data) => {
      const newNote = {
        _id: new mongoose.Types.ObjectId().toString(),
        title: data.title,
        content: data.content,
        tags: data.tags || [],
        owner: data.owner,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockNotesStore.push(newNote);
      return Promise.resolve(newNote);
    });

    jest.spyOn(Note, 'findOneAndUpdate').mockImplementation((filter, updates) => {
      const idx = mockNotesStore.findIndex((n) => {
        const matchId = String(n._id) === String(filter._id);
        const matchOwner = filter.owner ? String(n.owner) === String(filter.owner) : true;
        return matchId && matchOwner;
      });
      if (idx === -1) return Promise.resolve(null);
      const updated = { ...mockNotesStore[idx], ...updates, updatedAt: new Date() };
      mockNotesStore[idx] = updated;
      return Promise.resolve(updated);
    });

    jest.spyOn(Note, 'findOneAndDelete').mockImplementation((filter) => {
      const idx = mockNotesStore.findIndex((n) => {
        const matchId = String(n._id) === String(filter._id);
        const matchOwner = filter.owner ? String(n.owner) === String(filter.owner) : true;
        return matchId && matchOwner;
      });
      if (idx === -1) return Promise.resolve(null);
      const deleted = mockNotesStore.splice(idx, 1)[0];
      return Promise.resolve(deleted);
    });

    // Create User A
    const resA = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'User Alpha',
        email: 'alpha@example.com',
        password: 'PasswordAlpha123!',
      });
    userAToken = resA.body.token;
    userAId = resA.body.user.id;

    // Create User B
    const resB = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'User Beta',
        email: 'beta@example.com',
        password: 'PasswordBeta123!',
      });
    userBToken = resB.body.token;
    userBId = resB.body.user.id;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET /api/health', () => {
    it('should return 200 and operational service status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('OK');
      expect(res.body.service).toContain('Notes App Backend API');
    });
  });

  describe('POST /api/notes (Create Note)', () => {
    it('should create note for authenticated user, deriving owner from JWT payload', async () => {
      const res = await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer ${userAToken}`)
        .send({
          title: 'Express Architecture Note',
          content: 'Separating app and server allows unit testing without port collisions.',
          tags: ['Express', 'Architecture'],
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Express Architecture Note');
      expect(String(res.body.data.owner)).toBe(userAId);

      // Verify in mock store
      expect(mockNotesStore).toHaveLength(1);
      expect(String(mockNotesStore[0].owner)).toBe(userAId);
    });

    it('should reject unauthenticated note creation request with 401', async () => {
      const res = await request(app)
        .post('/api/notes')
        .send({ title: 'Unauth Note', content: 'No token' });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should reject note creation with missing content (400)', async () => {
      const res = await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer ${userAToken}`)
        .send({ title: 'Valid Title' });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('content is required');
    });
  });

  describe('GET /api/notes (List User Notes)', () => {
    it('should return only notes belonging to the authenticated user', async () => {
      // User A creates 2 notes
      await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer ${userAToken}`)
        .send({ title: 'Alpha Note 1', content: 'Content 1' });

      await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer ${userAToken}`)
        .send({ title: 'Alpha Note 2', content: 'Content 2' });

      // User B creates 1 note
      await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer ${userBToken}`)
        .send({ title: 'Beta Note 1', content: 'Content Beta' });

      // User A lists notes
      const resA = await request(app)
        .get('/api/notes')
        .set('Authorization', `Bearer ${userAToken}`);

      expect(resA.statusCode).toBe(200);
      expect(resA.body.count).toBe(2);
      expect(resA.body.data.every((n) => String(n.owner) === userAId)).toBe(true);

      // User B lists notes
      const resB = await request(app)
        .get('/api/notes')
        .set('Authorization', `Bearer ${userBToken}`);

      expect(resB.statusCode).toBe(200);
      expect(resB.body.count).toBe(1);
      expect(String(resB.body.data[0].owner)).toBe(userBId);
    });
  });

  describe('CRITICAL: Cross-User Ownership Isolation', () => {
    let noteAId;

    beforeEach(async () => {
      // User A creates a private confidential note
      const createRes = await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer ${userAToken}`)
        .send({
          title: "User A's Confidential SOP",
          content: 'Strictly confidential architecture secrets.',
          tags: ['Security', 'Confidential'],
        });
      noteAId = createRes.body.data._id;
    });

    it('should prevent User B from reading User A note (returns 404 to avoid data leakage)', async () => {
      const res = await request(app)
        .get(`/api/notes/${noteAId}`)
        .set('Authorization', `Bearer ${userBToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Note not found or you do not have permission');
    });

    it('should prevent User B from updating User A note (returns 404)', async () => {
      const res = await request(app)
        .patch(`/api/notes/${noteAId}`)
        .set('Authorization', `Bearer ${userBToken}`)
        .send({
          title: 'Hacked by User B',
        });

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);

      // Verify User A note was NOT modified
      const note = mockNotesStore.find((n) => n._id === noteAId);
      expect(note.title).toBe("User A's Confidential SOP");
    });

    it('should prevent User B from deleting User A note (returns 404)', async () => {
      const res = await request(app)
        .delete(`/api/notes/${noteAId}`)
        .set('Authorization', `Bearer ${userBToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);

      // Verify User A note was NOT deleted
      const note = mockNotesStore.find((n) => n._id === noteAId);
      expect(note).toBeDefined();
    });

    it('should allow User A to read, update, and delete their own note', async () => {
      // Read
      const getRes = await request(app)
        .get(`/api/notes/${noteAId}`)
        .set('Authorization', `Bearer ${userAToken}`);
      expect(getRes.statusCode).toBe(200);
      expect(getRes.body.data.title).toBe("User A's Confidential SOP");

      // Update
      const patchRes = await request(app)
        .patch(`/api/notes/${noteAId}`)
        .set('Authorization', `Bearer ${userAToken}`)
        .send({ title: "User A's Updated SOP" });
      expect(patchRes.statusCode).toBe(200);
      expect(patchRes.body.data.title).toBe("User A's Updated SOP");

      // Delete
      const deleteRes = await request(app)
        .delete(`/api/notes/${noteAId}`)
        .set('Authorization', `Bearer ${userAToken}`);
      expect(deleteRes.statusCode).toBe(200);
      expect(deleteRes.body.message).toContain('deleted successfully');

      // Verify deleted from store
      const note = mockNotesStore.find((n) => n._id === noteAId);
      expect(note).toBeUndefined();
    });
  });
});

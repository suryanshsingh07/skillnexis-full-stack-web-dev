const request = require('supertest');
const path = require('path');
const fs = require('fs');
const app = require('../src/app');

describe('Image Upload API Test Suite', () => {
  const validPngBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
  const textBuffer = Buffer.from('plain text content');

  describe('GET /api/health', () => {
    it('should return healthy status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.status).toBe('healthy');
    });
  });

  describe('POST /api/uploads/image', () => {
    it('should reject request when no image is attached', async () => {
      const res = await request(app).post('/api/uploads/image');
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Please select an image file');
    });

    it('should reject invalid MIME type files (e.g. text/plain)', async () => {
      const res = await request(app)
        .post('/api/uploads/image')
        .attach('image', textBuffer, 'document.txt');

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Invalid file type');
    });

    it('should successfully upload a valid image file', async () => {
      const res = await request(app)
        .post('/api/uploads/image')
        .attach('image', validPngBuffer, 'test-image.png');

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.file).toBeDefined();
      expect(res.body.file.filename).toBeDefined();
      expect(res.body.file.url).toContain('/uploads/');

      // Cleanup uploaded file
      const uploadedPath = path.join(__dirname, '../uploads', res.body.file.filename);
      if (fs.existsSync(uploadedPath)) {
        fs.unlinkSync(uploadedPath);
      }
    });
  });

  describe('GET /api/uploads', () => {
    it('should return list of uploaded images', async () => {
      const res = await request(app).get('/api/uploads');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.images)).toBe(true);
    });
  });
});

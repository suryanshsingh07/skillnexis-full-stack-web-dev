const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../../uploads');

const uploadSingleImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'Please select an image file to upload.'
    });
  }

  const host = req.get('host');
  const protocol = req.protocol;
  const imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

  res.status(201).json({
    success: true,
    message: 'Image uploaded successfully',
    file: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: imageUrl,
      path: `/uploads/${req.file.filename}`,
      uploadedAt: new Date().toISOString()
    }
  });
};

const getUploadedImages = (req, res) => {
  try {
    if (!fs.existsSync(uploadDir)) {
      return res.status(200).json({ success: true, count: 0, images: [] });
    }

    const files = fs.readdirSync(uploadDir).filter(f => f !== '.gitkeep');
    const host = req.get('host');
    const protocol = req.protocol;

    const images = files.map(filename => {
      const filePath = path.join(uploadDir, filename);
      const stat = fs.statSync(filePath);
      return {
        filename,
        url: `${protocol}://${host}/uploads/${filename}`,
        path: `/uploads/${filename}`,
        size: stat.size,
        createdAt: stat.birthtime || stat.mtime
      };
    }).sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json({
      success: true,
      count: images.length,
      images
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve uploaded images.'
    });
  }
};

const deleteImage = (req, res) => {
  try {
    const filename = path.basename(req.params.filename);
    const filePath = path.join(uploadDir, filename);

    if (!fs.existsSync(filePath) || filename === '.gitkeep') {
      return res.status(404).json({
        success: false,
        error: 'Image not found'
      });
    }

    fs.unlinkSync(filePath);
    res.status(200).json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete image.'
    });
  }
};

module.exports = { uploadSingleImage, getUploadedImages, deleteImage };

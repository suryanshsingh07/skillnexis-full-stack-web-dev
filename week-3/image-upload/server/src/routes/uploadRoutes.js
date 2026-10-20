const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { uploadSingleImage, getUploadedImages, deleteImage } = require('../controllers/uploadController');

const uploadHandler = (req, res, next) => {
  const uploadMiddleware = upload.single('image');
  uploadMiddleware(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          error: 'File size limit exceeded. Maximum allowed size is 5MB.'
        });
      }
      return res.status(400).json({
        success: false,
        error: err.message || 'File upload error occurred.'
      });
    }

    if (req.fileValidationError) {
      return res.status(400).json({
        success: false,
        error: req.fileValidationError
      });
    }

    next();
  });
};

router.post('/image', uploadHandler, uploadSingleImage);
router.get('/', getUploadedImages);
router.delete('/:filename', deleteImage);

module.exports = router;

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Note title is required'],
      trim: true,
      minlength: [3, 'Note title must be at least 3 characters long'],
      maxlength: [200, 'Note title cannot exceed 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Note content is required'],
      trim: true,
      maxlength: [10000, 'Note content cannot exceed 10000 characters'],
    },
    tags: {
      type: [String],
      default: [],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Note must have an authenticated owner'],
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Compound index for efficient user-scoped queries
noteSchema.index({ owner: 1, createdAt: -1 });

module.exports = mongoose.model('Note', noteSchema);

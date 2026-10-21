const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [120, 'Product name cannot exceed 120 characters']
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
      maxlength: [2000, 'Product description cannot exceed 2000 characters']
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price must be a positive number']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      lowercase: true
    },
    brand: {
      type: String,
      trim: true,
      default: 'Nexis'
    },
    stock: {
      type: Number,
      required: [true, 'Stock count is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0
    },
    imageUrl: {
      type: String,
      required: [true, 'Product image URL is required'],
      trim: true
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5
    },
    numReviews: {
      type: Number,
      default: 0
    },
    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

productSchema.index({ name: 'text', description: 'text', category: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

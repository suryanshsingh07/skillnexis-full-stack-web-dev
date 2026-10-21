const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    imageUrl: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Order must belong to a user']
    },
    orderItems: {
      type: [orderItemSchema],
      required: [true, 'Order must have at least one item'],
      validate: {
        validator: function (items) {
          return items && items.length > 0;
        },
        message: 'Order items cannot be empty'
      }
    },
    shippingAddress: {
      fullName: { type: String, required: true, trim: true },
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      postalCode: { type: String, required: true, trim: true },
      country: { type: String, default: 'India', trim: true },
      phone: { type: String, required: true, trim: true }
    },
    paymentMethod: {
      type: String,
      enum: ['demo_card', 'cod'],
      default: 'demo_card'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'paid'
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'processing'
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    },
    paidAt: {
      type: Date
    },
    deliveredAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

orderSchema.index({ user: 1, createdAt: -1 });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  stage: {
    type: String,
    enum: ['CREATED', 'PENDING', 'ORDERED', 'APPROVED', 'CANCELLED'],
    default: 'CREATED',
    required: true
  }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;

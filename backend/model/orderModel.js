import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'processing', 'shipped', 'delivered'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    adminNotes: String
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;

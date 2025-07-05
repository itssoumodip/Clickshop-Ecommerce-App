import asyncHandler from 'express-async-handler';
import Admin from '../model/adminModel.js';
import Order from '../model/orderModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Admin login
export const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// Get all orders
export const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({})
        .populate('user', 'name email')
        .populate('products.product');
    res.json(orders);
});

// Update order status
export const updateOrderStatus = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const { status, adminNotes } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    order.status = status;
    order.adminNotes = adminNotes;
    await order.save();

    res.json(order);
});

// Get dashboard stats
export const getDashboardStats = asyncHandler(async (req, res) => {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const totalRevenue = await Order.aggregate([
        { $match: { status: 'delivered' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
        totalOrders,
        pendingOrders,
        totalRevenue: totalRevenue[0]?.total || 0
    });
});

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

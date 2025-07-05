import express from 'express';
import {
    loginAdmin,
    getAllOrders,
    updateOrderStatus,
    getDashboardStats
} from '../controller/adminController.js';
import { protect, isAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/orders', protect, isAdmin, getAllOrders);
router.put('/orders/:orderId', protect, isAdmin, updateOrderStatus);
router.get('/dashboard', protect, isAdmin, getDashboardStats);

export default router;

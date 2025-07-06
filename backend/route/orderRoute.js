import express from 'express';
import { getOrdersForSeller, approveOrder } from '../controller/orderController.js';
import { chqSeler } from '../middleware/userMiddleware.js';

const orderApi = express.Router();

orderApi.get('/getOrdersForSeller', chqSeler, getOrdersForSeller);
orderApi.post('/approveOrder', chqSeler, approveOrder);

export default orderApi; 
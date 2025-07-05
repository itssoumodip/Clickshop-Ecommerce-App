import express from 'express';
import { chqProtectedUser } from '../middleware/userMiddleware.js';
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
  checkout,
  getUserOrders
} from '../controller/cartControler.js';

const cartApi = express.Router();

// Cart routes
cartApi.post('/add', chqProtectedUser, addToCart);
cartApi.get('/list', chqProtectedUser, getCart);
cartApi.delete('/remove/:cartId', chqProtectedUser, removeFromCart);
cartApi.put('/update/:cartId', chqProtectedUser, updateCartQuantity);

// Order routes
cartApi.post('/checkout', chqProtectedUser, checkout);
cartApi.get('/orders', chqProtectedUser, getUserOrders);

export default cartApi;
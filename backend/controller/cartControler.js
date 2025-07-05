import Cart from '../model/cartModel.js';
import Product from '../model/productModel.js';
import User from '../model/userModel.js';
import Order from '../model/orderModel.js';
import expressAsyncHandler from 'express-async-handler';

// Get cart items
const getCart = expressAsyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        
        // Find cart items and populate product details
        const cart = await Cart.find({ user: _id })
            .populate({
                path: 'product',
                select: 'name price description image' // Add any other fields you need
            })
            .sort({ createdAt: -1 })
            .lean(); // Convert to plain JS object for better performance

        // Add error handling for no cart found
        if (!cart) {
            return res.status(200).json({ cart: [] });
        }

        res.status(200).json({ cart });
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({ 
            message: 'Failed to fetch cart items',
            error: error.message 
        });
    }
});

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const { _id } = req.user;

    // Validate required fields
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ message: 'Product ID and quantity (minimum 1) are required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product is already in the cart
    let cartE = await Cart.find({
      $and: [
        { user: _id },
        { product: productId }
      ]
    });

    let createdCart = cartE.find(c => c.stage === 'CREATED');

    if (createdCart) {
      console.log("Cart already exists:", createdCart);
      return res.status(201).json({ message: "Cart already exists", cart: createdCart });
    }
    
    // Create new cart item
    const cart = new Cart({
      user: _id,
      product: productId,
      quantity: quantity, // Now correctly matches the schema
      stage: 'CREATED'
    });

    await cart.save();
    if (!cart) {
      return res.status(500).json({ message: 'Failed to save cart' });
    }

    let user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cartList.push(cart._id);
    await user.save();
    if (!user) {
      return res.status(500).json({ message: 'Failed to save user cart' });
    }

    res.status(200).json({ message: 'Cart saved successfully', cart });

  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ 
      message: 'Failed to add item to cart',
      error: err.message 
    });
  }
};

const cartList = expressAsyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const cart = await Cart.find({ user: _id }).populate('product');
    if (cart) {
      return res.status(200).json({ message: 'cart found', cart });
    }
    return res.status(404).json({ message: 'cart not found' });
  } catch (error) {
    return res.status(500).json({ message: 'error in controller' });
  }
});

const checkout = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { shippingAddress, paymentMethod } = req.body;

  try {
    // Get all cart items for the user
    const cartItems = await Cart.find({ user: _id, stage: 'CREATED' })
      .populate('product');

    if (!cartItems.length) {
      return res.status(400).json({ message: 'No items in cart' });
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);

    // Create new order
    const order = await Order.create({
      user: _id,
      products: cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      })),
      shippingAddress,
      totalAmount,
      paymentMethod,
      status: 'pending'
    });

    // Update cart items status
    await Cart.updateMany(
      { user: _id, stage: 'CREATED' },
      { $set: { stage: 'ORDERED' } }
    );

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders for a user
const getUserOrders = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const orders = await Order.find({ user: _id })
      .populate('products.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove item from cart
const removeFromCart = expressAsyncHandler(async (req, res) => {
    const { cartId } = req.params;
    const { _id } = req.user;

    try {
        const cart = await Cart.findOne({ _id: cartId, user: _id });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        await cart.deleteOne();
        
        // Remove cart reference from user
        await User.findByIdAndUpdate(_id, {
            $pull: { cartList: cartId }
        });

        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update cart item quantity
const updateCartQuantity = expressAsyncHandler(async (req, res) => {
    const { cartId } = req.params;
    const { quantity } = req.body;
    const { _id } = req.user;

    try {
        const cart = await Cart.findOne({ _id: cartId, user: _id });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        cart.quantity = quantity;
        await cart.save();

        res.json({ message: 'Cart updated', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Export all cart controller functions
export {
    addToCart,
    getCart,
    removeFromCart,
    updateCartQuantity,
    checkout,
    getUserOrders
};
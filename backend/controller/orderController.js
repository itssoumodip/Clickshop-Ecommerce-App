import Order from '../model/orderModel.js';
import Product from '../model/productModel.js';

export const getOrdersForSeller = async (req, res) => {
    try {
        // Find all products for this seller
        const sellerId = req.user._id;
        const products = await Product.find({ sellerId }).select('_id');
        const productIds = products.map(p => p._id);

        // Find all orders that include these products
        const orders = await Order.find({ 'products.product': { $in: productIds } })
            .populate('user', 'email')
            .populate('products.product', 'name');

        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders for seller', error: error.message });
    }
};

export const approveOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });
        order.status = "approved";
        await order.save();
        res.json({ message: "Order approved", order });
    } catch (error) {
        res.status(500).json({ message: "Failed to approve order", error: error.message });
    }
}; 
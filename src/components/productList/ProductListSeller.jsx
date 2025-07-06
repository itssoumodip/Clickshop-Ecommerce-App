import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCardSeller from "../productCard/ProductCardSeller.jsx";
import EditProductModal from '../AllProducts.jsx';

function ProductListSeller() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [orders, setOrders] = useState([]);

    const fetchProducts = async () => {
        try {
            // Get user data from localStorage
            const storedData = JSON.parse(localStorage.getItem('user'));
            if (!storedData?.token) {
                throw new Error("Authentication token not found.");
            }
            
            // Check if user is a seller
            if (storedData.userType !== "seller") {
                throw new Error("You must be logged in as a seller to view this page.");
            }
            
            const token = storedData.token;
            setLoading(true);
            console.log("Attempting to fetch products as seller with token:", token.substring(0, 10) + "...");
            
            // Test if the server is reachable first
            try {
                await axios.get("http://localhost:5000/product/getProductUser");
                console.log("Server is reachable");
            } catch (serverErr) {
                console.log("Server connection test failed:", serverErr.message);
                if (serverErr.code === "ERR_NETWORK") {
                    throw new Error("Cannot connect to the server. Please make sure the backend server is running.");
                }
            }
            
            // Fetch products for the seller
            const response = await axios.get("http://localhost:5000/product/getProduct", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            
            console.log("API Response:", response.status, response.data);
            
            if (response.data && response.data.sellerInfo) {
                console.log("Seller Info:", response.data.sellerInfo);
                console.log("Current User ID:", storedData._id);
            }
            
            if (response.data && response.data.product) {
                console.log("Products received:", response.data.product.length);
                setProducts(response.data.product);
                setError(null);
                
                // If no products, log additional info
                if (response.data.product.length === 0) {
                    console.log("User ID from token:", storedData._id);
                    console.log("User Type:", storedData.userType);
                }
            } else {
                console.warn("No products found in response:", response.data);
                setProducts([]);
            }
        } catch (err) {
            let errorMessage = "Failed to fetch products. Please log in and try again.";
            
            if (err.code === "ERR_NETWORK") {
                errorMessage = "Cannot connect to server. Please ensure the backend is running.";
            } else if (err.response) {
                // Server responded with an error status
                console.log("Server error response:", err.response.status, err.response.data);
                
                if (err.response.status === 401) {
                    errorMessage = "Authentication failed. Please log in again.";
                } else if (err.response.status === 403) {
                    errorMessage = "You don't have permission to view this content. Please log in as a seller.";
                } else if (err.response.status === 500) {
                    errorMessage = "Server error. Please try again later.";
                }
                
                // Use custom error message from server if available
                if (err.response.data && err.response.data.message) {
                    errorMessage = err.response.data.message;
                }
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            setError(errorMessage);
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (updatedProduct) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
            if (!token) throw new Error("Authentication token not found.");
            await axios.post(
                `http://localhost:5000/product/updateProduct`, updatedProduct,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            setError(`Failed to update product. Please try again.`);
        }
    };

    const fetchOrders = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
            if (!token) throw new Error("Authentication token not found.");
            const res = await axios.get("http://localhost:5000/order/getOrdersForSeller", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(res.data.orders || []);
        } catch (err) {
            setOrders([]);
        }
    };

    const handleApprove = async (orderId) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
            await axios.post(
                "http://localhost:5000/order/approveOrder",
                { orderId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchOrders(); // Refresh the order list
        } catch (err) {
            alert("Failed to approve order.");
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchOrders();
    }, []);

    const storedData = JSON.parse(localStorage.getItem('user') || '{}');
    
    return (
        <main className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6 py-8">        
                {/* Orders Table */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Order Requests</h2>
                    {orders.length === 0 ? (
                        <div className="text-gray-500">No order requests found.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white rounded-lg shadow-md">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">Product</th>
                                        <th className="px-4 py-2">Buyer</th>
                                        <th className="px-4 py-2">Quantity</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        order.products.map((prod, idx) => (
                                            <tr key={order._id + '-' + idx}>
                                                <td className="border px-4 py-2">{prod.product?.name || 'N/A'}</td>
                                                <td className="border px-4 py-2">{order.user?.email || 'N/A'}</td>
                                                <td className="border px-4 py-2">{prod.quantity}</td>
                                                <td className="border px-4 py-2">
                                                    {order.status === "pending" && (
                                                        <button
                                                            className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                                            onClick={() => handleApprove(order._id)}
                                                        >
                                                            Approve
                                                        </button>
                                                    )}
                                                    {order.status}
                                                </td>
                                                <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleString()}</td>
                                            </tr>
                                        ))
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default ProductListSeller; 
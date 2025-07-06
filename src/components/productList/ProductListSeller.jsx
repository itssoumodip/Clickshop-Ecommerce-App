import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCardSeller from "../productCard/ProductCardSeller.jsx";
import EditProductModal from '../AllProducts.jsx';

function ProductListSeller() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

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

    useEffect(() => {
        fetchProducts();
    }, []);

    const storedData = JSON.parse(localStorage.getItem('user') || '{}');
    
    return (
        <main className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Seller Dashboard</h1>
                <p className="text-gray-600 mb-8">Here are the products you've listed for sale.</p>

                {/* Debug info - can be removed in production */}
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
                    <h3 className="font-bold mb-1">Debug Info (Remove in production)</h3>
                    <p>Your seller ID: {storedData._id}</p>
                    <p>Your account type: {storedData.userType}</p>
                </div>

                {loading && (
                    <div className="text-center p-10">
                        <p className="text-gray-500">Loading your products...</p>
                    </div>
                )}
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-center">
                        {error}
                    </div>
                )}

                {editingProduct && (
                    <EditProductModal
                        product={editingProduct}
                        onClose={() => setEditingProduct(null)}
                        onUpdate={handleUpdate}
                    />
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.length > 0 ? (
                            products.map((item) => (
                                <ProductCardSeller
                                    key={item._id}
                                    data={item}
                                    onDelete={fetchProducts}
                                    onEdit={() => setEditingProduct(item)}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center p-10 bg-white rounded-lg shadow-md">
                                <p className="text-gray-500">You haven't listed any products yet.</p>
                                <p className="mt-2 text-sm">
                                    <strong>Note:</strong> Make sure you're logged in with the correct seller account.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}

export default ProductListSeller; 
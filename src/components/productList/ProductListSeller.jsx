import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCardSeller from "../productCard/ProductCardSeller.jsx";

function ProductListSeller() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const storedData = JSON.parse(localStorage.getItem('user'));
            if (!storedData?.token) {
                throw new Error("Authentication token not found.");
            }
            const token = storedData.token;
            setLoading(true);
            const { data } = await axios.put("http://localhost:5000/product/getProduct", {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            setProducts(data.product);
            setError(null);
        } catch (err) {
            setError("Failed to fetch products. Please log in and try again.");
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <main className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Seller Dashboard</h1>
                <p className="text-gray-600 mb-8">Here are the products you've listed for sale.</p>

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

                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.length > 0 ? (
                            products.map((item) => (
                                <ProductCardSeller key={item._id} data={item} />
                            ))
                        ) : (
                            <div className="col-span-full text-center p-10 bg-white rounded-lg shadow-md">
                                <p className="text-gray-500">You haven't listed any products yet.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}

export default ProductListSeller; 
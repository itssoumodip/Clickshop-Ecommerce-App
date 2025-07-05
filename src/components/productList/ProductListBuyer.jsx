import React, { useEffect, useState } from "react";
import axios from "axios";
import BuyerProductCard from "../productCard/BuyerProductCard.jsx";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function ProductListBuyer() {
    const [prods, setProds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            
            console.log('Fetching products...');
            const res = await axios.get("http://localhost:5000/product/getProductUser");
            console.log('Product API Response:', res.data);

            if (res.data?.product && Array.isArray(res.data.product)) {
                // Filter out products with invalid data
                const validProducts = res.data.product.filter((product) =>
                    product &&
                    product.name &&
                    typeof product.price !== "undefined" &&
                    product.price !== null
                );

                console.log("Valid products:", validProducts);
                setProds(validProducts);
            } else {
                console.warn("No products found in response:", res.data);
                setProds([]);
            }
        } catch (err) {
            console.error("Error fetching products:", err.response || err);
            let errorMessage = "Failed to load products. Please try again later.";
            
            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-block h-12 w-12 border-4 border-t-blue-600 border-gray-200 rounded-full animate-spin"></div>
                        <h2 className="mt-4 text-xl font-semibold text-gray-900">Loading Products...</h2>
                        <p className="mt-2 text-gray-600">Please wait while we fetch the latest products</p>
                    </div>
                    <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-200 rounded-lg h-48 w-full"></div>
                                <div className="mt-4 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-semibold text-red-800 mb-2">Oops! Something went wrong</h2>
                            <p className="text-red-600">{error}</p>
                        </div>
                        <button
                            onClick={fetchProducts}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (prods.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-semibold text-yellow-800 mb-2">No Products Available</h2>
                            <p className="text-yellow-600">Check back later for new products!</p>
                        </div>
                        <button
                            onClick={fetchProducts}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Refresh
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Products
                    </h1>
                    <p className="text-xl text-gray-600">
                        Find the perfect items for your needs
                    </p>
                </div>

                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {prods.map((product) => (
                        <motion.div key={product._id} variants={item} className="h-full">
                            <BuyerProductCard data={product} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

export default ProductListBuyer;
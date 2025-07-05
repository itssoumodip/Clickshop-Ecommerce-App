import React, { useState, useEffect } from 'react';
import logo from '../../imgLogo/logo.png';
import { useProduct } from '../../context/productContext.jsx';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

function ProductDetails() {
    const { tarProduct } = useProduct();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState('');

    const { name, brand, description, price, category } = tarProduct;
    // Ensure imagesUrl is always an array
    const imageList = Array.isArray(tarProduct.imagesUrl) ? tarProduct.imagesUrl : (tarProduct.imagesUrl ? [tarProduct.imagesUrl] : []);

    useEffect(() => {
        if (imageList.length > 0) {
            setSelectedImage(imageList[0]);
        }
    }, [tarProduct]);

    if (!tarProduct || Object.keys(tarProduct).length === 0) {
        // If there's no target product in context, redirect to the home page.
        return <Navigate to="/" />;
    }

    const handleBuy = async () => {
        try {
            const storedData = JSON.parse(localStorage.getItem("user"));
            if (!storedData?.token) throw new Error("Not logged in");
            
            const res = await axios.post(
                "http://localhost:5000/cart/add",
                { productId: tarProduct._id, quantity: 1 },
                { headers: { Authorization: `Bearer ${storedData.token}` } }
            );

            if (res.status === 200 || res.status === 201) {
                navigate(`/order/${res.data.cart._id}`);
            }
        } catch (error) {
            navigate('/login');
        }
    };

    const addToCart = async () => {
        try {
            const storedData = JSON.parse(localStorage.getItem("user"));
            if (!storedData?.token) throw new Error("Not logged in");

            const res = await axios.post(
                "http://localhost:5000/cart/add",
                { productId: tarProduct._id, quantity: 1 },
                { headers: { Authorization: `Bearer ${storedData.token}` } }
            );

            if (res.status === 200) {
                alert("Product added to cart!");
                navigate('/cart');
            } else if (res.status === 201) {
                alert("Product is already in your cart.");
                navigate('/cart');
            }
        } catch (error) {
            navigate('/login');
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div>
                        <div className="mb-4 overflow-hidden rounded-lg bg-white shadow-lg">
                            <img
                                src={selectedImage || logo}
                                alt={name}
                                className="w-full h-auto object-cover aspect-square"
                                onError={(e) => { e.target.onerror = null; e.target.src = logo; }}
                            />
                        </div>
                        <div className="flex space-x-2">
                            {imageList.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(img)}
                                    className={`w-20 h-20 overflow-hidden rounded-md border-2 ${selectedImage === img ? 'border-indigo-500' : 'border-transparent'}`}
                                >
                                    <img
                                        src={img}
                                        alt={`${name} thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.onerror = null; e.target.src = logo; }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Information */}
                    <div className="flex flex-col justify-center">
                        <span className="text-sm font-semibold text-indigo-600 uppercase">{category}</span>
                        <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-2">{name}</h1>
                        <p className="text-lg text-gray-500 mb-4">{brand}</p>
                        
                        <p className="text-gray-700 text-base leading-relaxed mb-6">
                            {description}
                        </p>

                        <div className="mb-6">
                            <span className="text-3xl font-extrabold text-gray-900">₹{price}</span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={addToCart}
                                className="flex-1 bg-indigo-100 text-indigo-700 font-semibold py-3 px-6 rounded-lg hover:bg-indigo-200 transition duration-300"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={handleBuy}
                                className="flex-1 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails; 
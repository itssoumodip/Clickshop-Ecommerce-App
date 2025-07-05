import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import logo from '../../imgLogo/logo.png';

const OrderList = ({ data }) => {
    const handleAccept = async () => {
        try {
            const storedData = JSON.parse(localStorage.getItem("token"));
            const token = storedData?.token;
            const res = await axios.post(
                "http://localhost:5000/cart/approveSeler",
                { cartId: data._id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.status === 200) {
                window.location.reload();
            }
        } catch (err) {
            //console.error("Error fetching products:", err);
        }
    };

    const handleCancel = async () => {
        try {
            const storedData = JSON.parse(localStorage.getItem("token"));
            const token = storedData?.token;
            const res = await axios.post(
                "http://localhost:5000/cart/cancelSeler",
                { cartId: data._id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.status === 200) {
                window.location.reload();
            }
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    return (
        <div className="w-full flex flex-row items-center justify-around gap-2.5">
            <div className="flex-grow grid grid-cols-2 gap-2.5 text-center p-2.5">
                <div>
                    <div className="text-sm font-semibold">Quantity</div>
                    <div className="text-xs">{data.items.quantity}</div>
                </div>
                <div>
                    <div className="text-sm font-semibold">Total Price</div>
                    <div className="text-xs">{data.totalPrice}</div>
                </div>
                <div>
                    <div className="text-sm font-semibold">Stage</div>
                    <div className="text-xs">{data.stage}</div>
                </div>
                <div>
                    <div className="text-sm font-semibold">Price that time</div>
                    <div className="text-xs">{data.items.priceAtTime}</div>
                </div>
            </div>
            <div className="flex flex-col gap-2.5 p-2.5">
                <button onClick={handleAccept} className="px-5 py-2.5 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600">Accept</button>
                <button onClick={handleCancel} className="px-5 py-2.5 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600">Cancel</button>
            </div>
        </div>
    );
};

const Card = ({ data }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-start overflow-auto scrollbar-hide">
            <div className="w-full flex flex-col gap-4 items-center">
                {data.map((item) => (
                    <div key={item._id} className="bg-purple-600 flex items-center justify-center flex-col text-center h-fit w-full rounded-lg text-white cursor-pointer transition-transform duration-400 hover:scale-105 group-hover:blur-sm group-hover:scale-90 hover:!blur-none hover:!scale-105">
                        <OrderList data={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

function DetailPageSeller() {
    const { id } = useParams();
    const [products, setProducts] = useState(null);

    const fetchProducts = async () => {
        try {
            const storedData = JSON.parse(localStorage.getItem("token"));
            const token = storedData?.token;
            const { data } = await axios.put(
                "http://localhost:5000/product/getProductInfo",
                { pId: id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setProducts(data.product);
        } catch (err) {
            //console.error("Error fetching products:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="w-full h-full pt-8 px-10 flex flex-row justify-between">
            <div className="w-1/2 flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-5">Product Info</h2>
                {products && (
                    <div className="w-full flex items-center gap-5 p-5 border border-gray-300 rounded-lg">
                        <div className="w-1/3">
                            <img src={products.imagesUrl || logo} alt="img" className="w-full h-auto object-cover rounded-lg" />
                        </div>
                        <div className="w-2/3 text-left">
                            <p><strong>Name:</strong> {products.name}</p>
                            <p><strong>Description:</strong> {products.description}</p>
                            <p><strong>Price:</strong> ₹{products.price}</p>
                            <p><strong>Category:</strong> {products.category}</p>
                            <p><strong>Brand:</strong> {products.brand}</p>
                            <p><strong>Stock:</strong> {products.stock}</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="w-1/2 h-full p-5 overflow-auto scrollbar-hide">
                {products && <Card data={products.orderList} />}
            </div>
        </div>
    );
}

export default DetailPageSeller;

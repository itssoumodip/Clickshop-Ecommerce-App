import React from 'react'
import { useProduct } from '../../context/productContext.jsx'
import logo from '../../imgLogo/logo.png'
import { useNavigate } from 'react-router-dom'

function ProductCardSeller({data}) {

    const {setTarProduct}=useProduct()
    const navigate=useNavigate()

    const handleClick = () => {
        setTarProduct(data)
        navigate(`/detail/${data._id}`)
    }

    const stockStatusClass = data.stock > 0
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800"

    return (
        <div
            className="w-full max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
            onClick={handleClick}
        >
            <div className="overflow-hidden rounded-t-lg">
                <img
                    src={data.imagesUrl[0] || logo}
                    alt={data.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = logo;
                    }}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-4">
                <h3 className="text-base font-semibold text-gray-800 truncate" title={data.name}>
                    {data.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{data.brand}</p>
                
                <div className="flex justify-between items-center text-xs text-gray-700 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${stockStatusClass}`}>
                        {data.stock > 0 ? `${data.stock} in Stock` : "Out of Stock"}
                    </span>
                    <span className="font-bold text-sm text-gray-800">
                        ₹{data.price}
                    </span>
                </div>

                <div className="text-xs text-gray-600 space-y-1">
                    <p className="truncate"><strong>Category:</strong> {data.category}</p>
                    <p className="truncate"><strong>Subcategory:</strong> {data.subcategory}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200 text-center">
                    <div className="text-sm font-semibold text-indigo-600">
                        {data.orderList.length} Active Order(s)
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCardSeller

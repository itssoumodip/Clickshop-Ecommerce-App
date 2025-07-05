import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiPackage, FiSearch } from 'react-icons/fi';

function NavbarBuyer() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm('');
        }
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 w-full">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between relative">
                <Link to="/home" className="text-decoration-none z-10">
                    <h1 className="text-xl lg:text-2xl font-bold text-indigo-600 m-0">ProHelp</h1>
                </Link>

                <button 
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 z-10"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-48 z-50 md:hidden">
                        <NavLink 
                            to="/home" 
                            onClick={() => setIsMenuOpen(false)} 
                            className="block px-4 py-2 text-gray-700 hover:bg-indigo-600 hover:text-white"
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/products" 
                            onClick={() => setIsMenuOpen(false)} 
                            className="block px-4 py-2 text-gray-700 hover:bg-indigo-600 hover:text-white"
                        >
                            Products
                        </NavLink>
                        <NavLink 
                            to="/orders" 
                            onClick={() => setIsMenuOpen(false)} 
                            className="block px-4 py-2 text-gray-700 hover:bg-indigo-600 hover:text-white"
                        >
                            My Orders
                        </NavLink>
                        <NavLink 
                            to="/about" 
                            onClick={() => setIsMenuOpen(false)} 
                            className="block px-4 py-2 text-gray-700 hover:bg-indigo-600 hover:text-white"
                        >
                            About
                        </NavLink>
                    </div>
                )}

                <div className="hidden md:flex items-center gap-8">
                    <NavLink 
                        to="/home" 
                        className={({ isActive }) => 
                            `${isActive ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'} 
                            font-medium transition-colors duration-200 pb-1`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/products" 
                        className={({ isActive }) => 
                            `${isActive ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'} 
                            font-medium transition-colors duration-200 pb-1`
                        }
                    >
                        Products
                    </NavLink>
                    <NavLink 
                        to="/orders" 
                        className={({ isActive }) => 
                            `${isActive ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'} 
                            font-medium transition-colors duration-200 pb-1`
                        }
                    >
                        My Orders
                    </NavLink>
                    <NavLink 
                        to="/about" 
                        className={({ isActive }) => 
                            `${isActive ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'} 
                            font-medium transition-colors duration-200 pb-1`
                        }
                    >
                        About
                    </NavLink>
                </div>
                
                {/* Desktop Search Bar */}
                <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
                    <form onSubmit={handleSearch} className="flex w-full">
                        <input
                            type="text"
                            placeholder="Search products, brands..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            className="px-3 py-1.5 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors"
                        >
                            <FiSearch size={16} />
                        </button>
                    </form>
                </div>

                <div className="flex items-center gap-4 z-10">
                    <Link 
                        to="/cart" 
                        className="flex flex-col items-center gap-1 text-gray-600 hover:text-indigo-600 transition-colors duration-200 p-2"
                    >
                        <FiShoppingCart size={20} />
                        <span className="text-xs font-medium">Cart</span>
                    </Link>
                    <Link 
                        to="/profile" 
                        className="flex flex-col items-center gap-1 text-gray-600 hover:text-indigo-600 transition-colors duration-200 p-2"
                    >
                        <FiUser size={20} />
                        <span className="text-xs font-medium">Profile</span>
                    </Link>
                </div>
            </nav>
            
            {/* Mobile Search Bar */}
            <div className="block md:hidden px-4 pb-3">
                <form onSubmit={handleSearch} className="flex">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type="submit"
                        className="px-3 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors"
                    >
                        <FiSearch size={18} />
                    </button>
                </form>
            </div>
        </header>
    );
}


export default NavbarBuyer;
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../imgLogo/logo.png';

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

function NavbarSeller() {
    const activeLinkStyle = {
        color: '#4f46e5',
        borderBottom: '2px solid #4f46e5'
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <Link to="/">
                    <img src={logo} alt="logo" className="h-10 w-auto" />
                </Link>
                <div className="hidden md:flex items-center space-x-6">
                    <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-indigo-600 transition duration-300 pb-1" end>Dashboard</NavLink>
                    <NavLink to="/add" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-indigo-600 transition duration-300 pb-1">Add Product</NavLink>
                    <NavLink to="/update" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-indigo-600 transition duration-300 pb-1">Manage Products</NavLink>
                    <NavLink to="/about" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-indigo-600 transition duration-300 pb-1">About</NavLink>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-semibold text-gray-700">Seller Mode</span>
                    <Link to="/login" className="text-gray-600 hover:text-indigo-600 transition duration-300">
                        <UserIcon />
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default NavbarSeller; 
import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ArrowRightLeft, LogOut, Settings, History, Menu, X } from 'lucide-react';
import BackgroundDoodles from './BackgroundDoodles';

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/operations', label: 'Operations', icon: ArrowRightLeft },
        { path: '/stock', label: 'Stock', icon: Package },
        // Added placeholders for Move History and Settings as per sketch
        { path: '/history', label: 'Move History', icon: History },
        { path: '/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[#59598E] text-gray-100 font-sans relative overflow-hidden">
            <BackgroundDoodles />
            
            {/* Top Navigation Bar */}
            <nav className="bg-[#1a1a2e]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 shadow-lg relative z-20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        {/* Logo/Brand */}
                        <div className="flex items-center mr-4">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2 shadow-inner">
                                <span className="text-[#59598E] font-bold text-lg">S</span>
                            </div>
                            <h1 className="text-xl font-bold text-white tracking-wider drop-shadow-sm">StockMaster</h1>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center space-x-6">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 ${isActive
                                                ? 'bg-white/10 text-white font-bold shadow-sm'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <span className="text-sm uppercase tracking-wide">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Side - User/Logout (Desktop) */}
                    <div className="hidden md:flex items-center">
                        <button
                            onClick={handleLogout}
                            className="text-primary-lightest hover:text-white transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white hover:text-gray-300 focus:outline-none"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-white/10 pt-4 animate-fadeIn">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center px-4 py-3 rounded-md transition-all duration-200 ${isActive
                                            ? 'bg-white/10 text-white font-bold'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5 mr-3" />
                                    <span className="text-sm uppercase tracking-wide">{item.label}</span>
                                </Link>
                            );
                        })}
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                handleLogout();
                            }}
                            className="w-full flex items-center px-4 py-3 rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            <span className="text-sm uppercase tracking-wide">Logout</span>
                        </button>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="p-8 max-w-7xl mx-auto relative z-10">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;

import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ArrowRightLeft, LogOut, Settings, History } from 'lucide-react';

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();

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
        <div className="min-h-screen bg-[#1a1a2e] text-gray-100 font-sans">
            {/* Top Navigation Bar */}
            <nav className="bg-primary border-b border-primary-light px-6 py-4 flex items-center justify-between shadow-lg">
                <div className="flex items-center space-x-8">
                    {/* Logo/Brand */}
                    <div className="flex items-center mr-4">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                            <span className="text-primary font-bold text-lg">S</span>
                        </div>
                        <h1 className="text-xl font-bold text-white tracking-wider">StockMaster</h1>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-6">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 ${isActive
                                            ? 'text-white font-bold border-b-2 border-white'
                                            : 'text-primary-lightest hover:text-white'
                                        }`}
                                >
                                    <span className="text-sm uppercase tracking-wide">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Right Side - User/Logout */}
                <div className="flex items-center">
                    <button
                        onClick={handleLogout}
                        className="text-primary-lightest hover:text-white transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="p-8 max-w-7xl mx-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;

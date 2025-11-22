import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({ loginId: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Clear error when user starts typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#59598E] p-4 relative overflow-hidden">
            {/* Background Bubbles & Doodles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Base Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#59598E] via-[#6E6E9D] to-[#2a2a4a] opacity-90"></div>

                {/* Large 3D Spheres */}
                <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#8383AD] to-[#59598E] opacity-40 blur-2xl"></div>
                <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#59598E] to-[#A3A3C0] opacity-30 blur-3xl"></div>

                {/* Floating Bubbles (Solid with Gradient for 3D effect) */}
                <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-gradient-to-b from-[#A3A3C0] to-[#59598E] opacity-50 shadow-xl backdrop-blur-sm"></div>
                <div className="absolute bottom-1/3 right-10 w-48 h-48 rounded-full bg-gradient-to-t from-[#6E6E9D] to-[#8383AD] opacity-40 shadow-2xl backdrop-blur-md"></div>
                <div className="absolute top-10 left-1/3 w-20 h-20 rounded-full bg-gradient-to-br from-[#D8D8E0] to-[#8383AD] opacity-30"></div>
                
                {/* Outlined Circles */}
                <div className="absolute top-1/2 left-1/2 w-64 h-64 border-2 border-[#A3A3C0] rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-20 right-1/3 w-24 h-24 border border-[#D8D8E0] rounded-full opacity-30"></div>
                <div className="absolute top-1/3 right-1/4 w-40 h-40 border-4 border-[#59598E] rounded-full opacity-10"></div>

                {/* Small Scattered Particles */}
                {[...Array(20)].map((_, i) => (
                    <div 
                        key={`particle-${i}`}
                        className="absolute rounded-full bg-white opacity-20"
                        style={{
                            width: Math.random() * 10 + 5 + 'px',
                            height: Math.random() * 10 + 5 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animation: `pulse ${Math.random() * 3 + 2}s infinite`
                        }}
                    ></div>
                ))}

                {/* Finance Doodles (Subtle Integration) */}
                <svg className="absolute top-20 right-20 w-32 h-32 opacity-20" viewBox="0 0 100 100" fill="none">
                    <path d="M10 90 L 30 70 L 50 80 L 90 20" stroke="#D8D8E0" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <svg className="absolute bottom-20 left-20 w-24 h-24 opacity-20" viewBox="0 0 100 100" fill="none">
                    <rect x="20" y="40" width="15" height="60" fill="#D8D8E0" />
                    <rect x="45" y="20" width="15" height="80" fill="#D8D8E0" />
                    <rect x="70" y="50" width="15" height="50" fill="#D8D8E0" />
                </svg>
            </div>

            {/* Enhanced Card Container */}
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-4 border-[#59598E] transform transition-all duration-300 hover:shadow-2xl relative z-10">
                
                {/* Logo/Header Section */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#59598E] to-[#6E6E9D] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-[#59598E]">Welcome Back</h2>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>
                
                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                        <span className="text-red-500 text-sm flex-1 text-center">{error}</span>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Login ID
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="loginId"
                                    value={formData.loginId}
                                    onChange={handleChange}
                                    className="w-full p-4 pl-12 border border-[#A3A3C0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8383AD] focus:border-transparent transition-all duration-200 bg-gray-50"
                                    placeholder="Enter your login ID"
                                    required
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#59598E]">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full p-4 pl-12 border border-[#A3A3C0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8383AD] focus:border-transparent transition-all duration-200 bg-gray-50"
                                    placeholder="Enter your password"
                                    required
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#59598E]">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-gray-600">
                            <input type="checkbox" className="rounded border-[#A3A3C0] text-[#59598E] focus:ring-[#8383AD]" />
                            <span className="ml-2">Remember me</span>
                        </label>
                        <Link to="/forgot-password" className="text-[#59598E] hover:text-[#6E6E9D] hover:underline transition-colors">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-[#59598E] to-[#6E6E9D] text-white py-4 rounded-xl hover:from-[#6E6E9D] hover:to-[#59598E] transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                                Signing In...
                            </div>
                        ) : (
                            'SIGN IN'
                        )}
                    </button>
                </form>

                {/* Sign Up Link */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600 text-sm">
                        Don't have an account?{' '}
                        <Link 
                            to="/signup" 
                            className="text-[#59598E] font-semibold hover:text-[#6E6E9D] hover:underline transition-colors"
                        >
                            Sign up now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import BackgroundDoodles from '../components/BackgroundDoodles';

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
            const res = await axios.post('/api/auth/login', formData);
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
            <BackgroundDoodles />

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
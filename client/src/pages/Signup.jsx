import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        loginId: '', 
        password: '', 
        confirmPassword: '' 
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        setError('');
        
        try {
            const { confirmPassword, ...submitData } = formData;
            const res = await axios.post('http://localhost:5000/api/auth/signup', submitData);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
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

            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-4 border-[#59598E] transform transition-all duration-300 hover:shadow-2xl relative z-10">
                
                {/* Logo/Header Section */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#59598E] to-[#6E6E9D] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-[#59598E]">Create Account</h2>
                    <p className="text-gray-600 mt-2">Join us today</p>
                </div>
                
                {error && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <span className="text-red-500 text-sm">{error}</span>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-4 pl-12 border border-[#A3A3C0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8383AD] focus:border-transparent transition-all duration-200 bg-gray-50"
                                placeholder="Enter your full name"
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
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-4 pl-12 border border-[#A3A3C0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8383AD] focus:border-transparent transition-all duration-200 bg-gray-50"
                                placeholder="Enter your email"
                                required
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#59598E]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Login ID</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="loginId"
                                value={formData.loginId}
                                onChange={handleChange}
                                className="w-full p-4 pl-12 border border-[#A3A3C0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8383AD] focus:border-transparent transition-all duration-200 bg-gray-50"
                                placeholder="Choose a login ID"
                                required
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#59598E]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-4 pl-12 border border-[#A3A3C0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8383AD] focus:border-transparent transition-all duration-200 bg-gray-50"
                                placeholder="Create a password"
                                required
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#59598E]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full p-4 pl-12 border border-[#A3A3C0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8383AD] focus:border-transparent transition-all duration-200 bg-gray-50"
                                placeholder="Confirm your password"
                                required
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#59598E]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center text-sm">
                        <input 
                            type="checkbox" 
                            className="rounded border-[#A3A3C0] text-[#59598E] focus:ring-[#8383AD]" 
                            required 
                        />
                        <span className="ml-2 text-gray-600">
                            I agree to the <Link to="/terms" className="text-[#59598E] hover:underline">Terms and Conditions</Link>
                        </span>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-[#59598E] to-[#6E6E9D] text-white py-4 rounded-xl hover:from-[#6E6E9D] hover:to-[#59598E] transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                                Creating Account...
                            </div>
                        ) : (
                            'CREATE ACCOUNT'
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm">
                        Already have an account?{' '}
                        <Link 
                            to="/login" 
                            className="text-[#59598E] font-semibold hover:text-[#6E6E9D] hover:underline transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock password reset logic
        setMessage(`If an account exists for ${email}, a reset link has been sent.`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#D8D8E0]">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 border-t-4 border-[#59598E]">
                <h2 className="text-2xl font-bold mb-6 text-center text-[#59598E]">Forgot Password</h2>
                
                {message && (
                    <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-[#A3A3C0] rounded focus:outline-none focus:ring-2 focus:ring-[#8383AD]"
                            required
                            placeholder="Enter your registered email"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-[#59598E] text-white py-2 rounded hover:bg-[#6E6E9D] transition-colors font-bold"
                    >
                        SEND RESET LINK
                    </button>
                </form>

                <div className="mt-4 text-center text-sm">
                    <Link to="/login" className="text-[#59598E] hover:text-[#6E6E9D] hover:underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;

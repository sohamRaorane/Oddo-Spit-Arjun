import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Package, User, FileText, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const TransactionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }
                const res = await axios.get(`/api/stock/transactions/${id}`, {
                     headers: { Authorization: `Bearer ${token}` },
                });
                setTransaction(res.data);
            } catch (err) {
                console.error("Error fetching transaction:", err);
                if (err.response && err.response.status === 401) {
                    toast.error("Session expired. Please login again.");
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    toast.error("Failed to load transaction details");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchTransaction();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#59598E]"></div>
            </div>
        );
    }

    if (!transaction) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-400">Transaction not found</h2>
                <button onClick={() => navigate(-1)} className="mt-4 text-[#59598E] hover:underline">Go Back</button>
            </div>
        );
    }

    const getIcon = (type) => {
        switch(type) {
            case 'RECEIPT': return <ArrowDownRight className="w-8 h-8 text-green-600" />;
            case 'DELIVERY': return <ArrowUpRight className="w-8 h-8 text-blue-600" />;
            default: return <RefreshCw className="w-8 h-8 text-yellow-600" />;
        }
    };

    const getColor = (type) => {
        switch(type) {
            case 'RECEIPT': return 'bg-green-100 text-green-800';
            case 'DELIVERY': return 'bg-blue-100 text-blue-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Toaster position="top-right" />
            {/* Header */}
            <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[#59598E] hover:underline"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to List
                </button>
                <div className="flex-1 text-right">
                    <p className="text-sm text-gray-500 mb-1">Quantity</p>
                    <p className={`text-3xl font-bold ${
                        transaction.type === 'RECEIPT' ? 'text-green-600' : 
                        transaction.type === 'DELIVERY' ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                        {transaction.type === 'RECEIPT' ? '+' : transaction.type === 'DELIVERY' ? '-' : ''}
                        {Math.abs(transaction.quantity)}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-[#59598E]">
                <div className="p-8 border-b border-gray-100">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-6">
                            <div className={`p-4 rounded-2xl ${
                                transaction.type === 'RECEIPT' ? 'bg-green-50' : 
                                transaction.type === 'DELIVERY' ? 'bg-blue-50' : 'bg-yellow-50'
                            }`}>
                                {getIcon(transaction.type)}
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-2xl font-bold text-gray-900">Transaction #{transaction.id}</h1>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${getColor(transaction.type)}`}>
                                        {transaction.type}
                                    </span>
                                </div>
                                <p className="text-gray-500 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(transaction.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-bold text-[#59598E] uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Package className="w-4 h-4" />
                                Item Details
                            </h3>
                            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Item Name</span>
                                    <span className="font-semibold text-gray-900">{transaction.stockItem?.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">SKU</span>
                                    <span className="font-mono text-gray-900">{transaction.stockItem?.sku}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Category</span>
                                    <span className="font-semibold text-gray-900">{transaction.stockItem?.category || 'General'}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-[#59598E] uppercase tracking-wider mb-4 flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Additional Info
                            </h3>
                            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Reference</span>
                                    <span className="font-mono text-gray-900">{transaction.reference || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status</span>
                                    <span className="font-semibold text-gray-900">{transaction.status || 'Completed'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-bold text-[#59598E] uppercase tracking-wider mb-4 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Operator Details
                            </h3>
                            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Performed By</span>
                                    <span className="font-semibold text-gray-900">{transaction.performedBy || 'System User'}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-[#59598E] uppercase tracking-wider mb-4">Notes</h3>
                            <div className="bg-gray-50 rounded-xl p-4 min-h-[100px]">
                                <p className="text-gray-700 italic">
                                    "{transaction.notes || 'No notes provided for this transaction.'}"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetails;
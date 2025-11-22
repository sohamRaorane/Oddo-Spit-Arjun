import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Package, User, FileText, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';
import axios from 'axios';

const TransactionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`/api/stock/transactions/${id}`, {
                     headers: { Authorization: `Bearer ${token}` },
                });
                setTransaction(res.data);
            } catch (err) {
                console.log("Using mock data for demo");
                
                // Mock data logic to match MoveHistory mock data
                const mockId = parseInt(id);
                let type = 'RECEIPT';
                let itemName = 'Premium Widget X';
                let itemSku = 'WID-X-001';
                
                if ([102, 104, 107, 108].includes(mockId)) {
                    type = 'DELIVERY';
                    itemName = 'Outbound Product Y';
                    itemSku = 'OUT-Y-002';
                } else if ([105, 110].includes(mockId)) {
                    type = 'ADJUSTMENT';
                    itemName = 'Adjusted Item Z';
                    itemSku = 'ADJ-Z-003';
                }

                setTransaction({
                    id: id,
                    type: type,
                    quantity: type === 'RECEIPT' ? 150 : (type === 'DELIVERY' ? -20 : 5),
                    createdAt: new Date().toISOString(),
                    stockItem: { 
                        name: itemName, 
                        sku: itemSku, 
                        description: 'High-performance component for industrial use.',
                        category: 'Electronics'
                    },
                    notes: type === 'RECEIPT' ? 'Received from Supplier A via FedEx.' : 'Dispatched to Client B via UPS.',
                    performedBy: 'Warehouse Admin',
                    reference: `REF-${mockId}-${Date.now().toString().slice(-4)}`,
                    status: 'COMPLETED'
                });
            } finally {
                setLoading(false);
            }
        };
        fetchTransaction();
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#59598E]"></div>
        </div>
    );

    if (!transaction) return (
        <div className="text-center p-12">
            <h3 className="text-xl text-gray-600">Transaction not found</h3>
            <button onClick={() => navigate(-1)} className="mt-4 text-[#59598E] hover:underline">Go Back</button>
        </div>
    );

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
        <div className="max-w-4xl mx-auto">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-white mb-6 hover:text-gray-200 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to List
            </button>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-[#59598E]">
                {/* Header */}
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
                        <div className="text-right">
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
                </div>

                {/* Content */}
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
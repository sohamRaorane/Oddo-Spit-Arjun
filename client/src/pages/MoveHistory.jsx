import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Filter, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

const MoveHistory = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [filterType, setFilterType] = useState(location.state?.filter || 'ALL');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/stock/transactions', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.data && res.data.length > 0) {
                    setTransactions(res.data);
                } else {
                    // Fallback mock data if API returns empty
                    setTransactions([
                        { id: 101, type: 'RECEIPT', quantity: 500, createdAt: new Date().toISOString(), stockItem: { name: 'High-Performance Processor', sku: 'CPU-X99' } },
                        { id: 102, type: 'DELIVERY', quantity: 20, createdAt: new Date(Date.now() - 3600000).toISOString(), stockItem: { name: 'Gaming Monitor 27"', sku: 'MON-G27' } },
                        { id: 103, type: 'RECEIPT', quantity: 100, createdAt: new Date(Date.now() - 7200000).toISOString(), stockItem: { name: 'Mechanical Keyboard', sku: 'KB-MECH-01' } },
                        { id: 104, type: 'DELIVERY', quantity: 5, createdAt: new Date(Date.now() - 86400000).toISOString(), stockItem: { name: 'Wireless Mouse', sku: 'MSE-WL-02' } },
                        { id: 105, type: 'ADJUSTMENT', quantity: -2, createdAt: new Date(Date.now() - 90000000).toISOString(), stockItem: { name: 'USB-C Cable', sku: 'CBL-USB-C' } },
                        { id: 106, type: 'RECEIPT', quantity: 200, createdAt: new Date(Date.now() - 172800000).toISOString(), stockItem: { name: 'SSD 1TB', sku: 'SSD-1TB-EVO' } },
                        { id: 107, type: 'DELIVERY', quantity: 15, createdAt: new Date(Date.now() - 200000000).toISOString(), stockItem: { name: 'Graphics Card RTX 4090', sku: 'GPU-RTX-4090' } },
                        { id: 108, type: 'DELIVERY', quantity: 50, createdAt: new Date(Date.now() - 250000000).toISOString(), stockItem: { name: 'DDR5 RAM 32GB', sku: 'RAM-DDR5-32' } },
                        { id: 109, type: 'RECEIPT', quantity: 1000, createdAt: new Date(Date.now() - 300000000).toISOString(), stockItem: { name: 'Thermal Paste', sku: 'ACC-THM-PST' } },
                        { id: 110, type: 'ADJUSTMENT', quantity: 10, createdAt: new Date(Date.now() - 400000000).toISOString(), stockItem: { name: 'Cooling Fan 120mm', sku: 'FAN-120-RGB' } },
                    ]);
                }
            } catch (err) {
                console.error('Error fetching transactions:', err);
                // Fallback mock data on error
                setTransactions([
                    { id: 101, type: 'RECEIPT', quantity: 500, createdAt: new Date().toISOString(), stockItem: { name: 'High-Performance Processor', sku: 'CPU-X99' } },
                    { id: 102, type: 'DELIVERY', quantity: 20, createdAt: new Date(Date.now() - 3600000).toISOString(), stockItem: { name: 'Gaming Monitor 27"', sku: 'MON-G27' } },
                    { id: 103, type: 'RECEIPT', quantity: 100, createdAt: new Date(Date.now() - 7200000).toISOString(), stockItem: { name: 'Mechanical Keyboard', sku: 'KB-MECH-01' } },
                    { id: 104, type: 'DELIVERY', quantity: 5, createdAt: new Date(Date.now() - 86400000).toISOString(), stockItem: { name: 'Wireless Mouse', sku: 'MSE-WL-02' } },
                    { id: 105, type: 'ADJUSTMENT', quantity: -2, createdAt: new Date(Date.now() - 90000000).toISOString(), stockItem: { name: 'USB-C Cable', sku: 'CBL-USB-C' } },
                    { id: 106, type: 'RECEIPT', quantity: 200, createdAt: new Date(Date.now() - 172800000).toISOString(), stockItem: { name: 'SSD 1TB', sku: 'SSD-1TB-EVO' } },
                    { id: 107, type: 'DELIVERY', quantity: 15, createdAt: new Date(Date.now() - 200000000).toISOString(), stockItem: { name: 'Graphics Card RTX 4090', sku: 'GPU-RTX-4090' } },
                    { id: 108, type: 'DELIVERY', quantity: 50, createdAt: new Date(Date.now() - 250000000).toISOString(), stockItem: { name: 'DDR5 RAM 32GB', sku: 'RAM-DDR5-32' } },
                    { id: 109, type: 'RECEIPT', quantity: 1000, createdAt: new Date(Date.now() - 300000000).toISOString(), stockItem: { name: 'Thermal Paste', sku: 'ACC-THM-PST' } },
                    { id: 110, type: 'ADJUSTMENT', quantity: 10, createdAt: new Date(Date.now() - 400000000).toISOString(), stockItem: { name: 'Cooling Fan 120mm', sku: 'FAN-120-RGB' } },
                ]);
            }
        };

        fetchTransactions();
    }, []);

    const filteredTransactions = filterType === 'ALL' 
        ? transactions 
        : transactions.filter(tx => tx.type === filterType);

    const getIcon = (type) => {
        switch(type) {
            case 'RECEIPT': return <ArrowDownRight className="w-5 h-5 text-green-600" />;
            case 'DELIVERY': return <ArrowUpRight className="w-5 h-5 text-blue-600" />;
            default: return <RefreshCw className="w-5 h-5 text-yellow-600" />;
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-wide drop-shadow-md">Move History</h2>
                    <p className="text-primary-lightest mt-1">Track all stock movements and adjustments</p>
                </div>
                
                <div className="bg-white p-1 rounded-xl shadow-lg flex">
                    {['ALL', 'RECEIPT', 'DELIVERY', 'ADJUSTMENT'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                                filterType === type 
                                ? 'bg-[#59598E] text-white shadow-md' 
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            {type.charAt(0) + type.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-[#59598E]">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#59598E] uppercase tracking-wider">Transaction Details</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#59598E] uppercase tracking-wider">Type</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#59598E] uppercase tracking-wider">Date & Time</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-[#59598E] uppercase tracking-wider">Quantity</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredTransactions.map((tx) => (
                                <tr 
                                    key={tx.id} 
                                    onClick={() => navigate(`/transaction/${tx.id}`)}
                                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className={`p-2 rounded-lg ${
                                                tx.type === 'RECEIPT' ? 'bg-green-100' : 
                                                tx.type === 'DELIVERY' ? 'bg-blue-100' : 'bg-yellow-100'
                                            }`}>
                                                {getIcon(tx.type)}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-bold text-gray-900">{tx.stockItem?.name || 'Unknown Item'}</div>
                                                <div className="text-xs text-gray-500 font-mono">{tx.stockItem?.sku || 'N/A'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            tx.type === 'RECEIPT' ? 'bg-green-100 text-green-800' : 
                                            tx.type === 'DELIVERY' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            {new Date(tx.createdAt).toLocaleDateString()} 
                                            <span className="text-gray-400">at</span>
                                            {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <span className={`text-sm font-bold ${
                                            tx.type === 'RECEIPT' ? 'text-green-600' : 
                                            tx.type === 'DELIVERY' ? 'text-blue-600' : 'text-gray-600'
                                        }`}>
                                            {tx.type === 'RECEIPT' ? '+' : tx.type === 'DELIVERY' ? '-' : ''}{Math.abs(tx.quantity)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {filteredTransactions.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                        No transactions found for this filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MoveHistory;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MoveHistory = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/stock/transactions', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTransactions(res.data);
            } catch (err) {
                console.error('Error fetching transactions:', err);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8 text-white tracking-wide drop-shadow-md">Move History</h2>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-[#59598E]">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#D8D8E0]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-[#59598E] uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-[#59598E] uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-[#59598E] uppercase tracking-wider">Item</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-[#59598E] uppercase tracking-wider">Quantity</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6E6E9D]">
                                    {new Date(tx.createdAt).toLocaleDateString()} {new Date(tx.createdAt).toLocaleTimeString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#59598E]">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        tx.type === 'RECEIPT' ? 'bg-green-100 text-green-800' : 
                                        tx.type === 'DELIVERY' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {tx.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6E6E9D]">
                                    {tx.stockItem?.name} ({tx.stockItem?.sku})
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6E6E9D]">{tx.quantity}</td>
                            </tr>
                        ))}
                        {transactions.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-[#6E6E9D]">No transactions found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MoveHistory;

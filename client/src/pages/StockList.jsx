import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockList = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'Widget A', sku: 'WID-001', quantity: 100, description: 'High quality widget' },
        { id: 2, name: 'Gadget B', sku: 'GAD-002', quantity: 50, description: 'Essential gadget' },
        { id: 3, name: 'Tool C', sku: 'TOL-003', quantity: 0, description: 'Out of stock tool' },
        { id: 4, name: 'Part D', sku: 'PRT-004', quantity: 200, description: 'Spare part' },
    ]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/stock/items', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setItems(res.data);
            } catch (err) {
                console.error('Error fetching items:', err);
            }
        };

        fetchItems();
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8 text-white tracking-wide drop-shadow-md">Stock List</h2>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-[#59598E]">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#D8D8E0]">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-[#59598E] uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-[#59598E] uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-[#59598E] uppercase tracking-wider">SKU</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-[#59598E] uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-[#59598E] uppercase tracking-wider">Description</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6E6E9D]">{item.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#59598E]">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6E6E9D]">{item.sku}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {item.quantity}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#6E6E9D]">{item.description}</td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-[#6E6E9D]">No stock items found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockList;

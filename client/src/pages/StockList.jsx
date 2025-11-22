import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Filter, Download, Plus } from 'lucide-react';

const StockList = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'Widget A', sku: 'WID-001', quantity: 100, description: 'High quality widget', category: 'Electronics', price: 29.99 },
        { id: 2, name: 'Gadget B', sku: 'GAD-002', quantity: 50, description: 'Essential gadget', category: 'Tools', price: 15.50 },
        { id: 3, name: 'Tool C', sku: 'TOL-003', quantity: 0, description: 'Out of stock tool', category: 'Tools', price: 45.00 },
        { id: 4, name: 'Part D', sku: 'PRT-004', quantity: 200, description: 'Spare part', category: 'Parts', price: 5.99 },
    ]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/stock/items', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.data && res.data.length > 0) {
                    setItems(res.data);
                }
            } catch (err) {
                console.error('Error fetching items:', err);
            }
        };

        fetchItems();
    }, []);

    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-wide drop-shadow-md">Stock List</h2>
                    <p className="text-primary-lightest mt-1">Manage your inventory items and levels</p>
                </div>
                <button className="bg-white text-[#59598E] hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold shadow-lg flex items-center gap-2 transition-all">
                    <Plus className="w-5 h-5" />
                    Add New Item
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl shadow-lg flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Search by name or SKU..." 
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#59598E] text-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <button className="flex-1 md:flex-none px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-[#59598E]">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#59598E] uppercase tracking-wider">Item Details</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#59598E] uppercase tracking-wider">SKU</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#59598E] uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#59598E] uppercase tracking-wider">Quantity</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#59598E] uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-[#59598E] uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-[#59598E]/10 flex items-center justify-center text-[#59598E] font-bold">
                                                {item.name.charAt(0)}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                <div className="text-sm text-gray-500">{item.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{item.sku}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
                                            {item.category || 'General'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-700">{item.quantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            item.quantity > 10 ? 'bg-green-100 text-green-800' : 
                                            item.quantity > 0 ? 'bg-yellow-100 text-yellow-800' : 
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {item.quantity > 10 ? 'In Stock' : item.quantity > 0 ? 'Low Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-[#59598E] hover:text-[#6E6E9D] font-semibold">Edit</button>
                                    </td>
                                </tr>
                            ))}
                            {filteredItems.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                                <Search className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <p className="text-lg font-medium text-gray-900">No items found</p>
                                            <p className="text-sm text-gray-500">Try adjusting your search terms</p>
                                        </div>
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

export default StockList;

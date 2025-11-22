import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Search, Filter, Download, Plus, X } from 'lucide-react';

const StockList = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '',
        sku: '',
        category: '',
        description: '',
        price: '',
        minStock: '10'
    });

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }
                const res = await axios.get('/api/stock/items', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setItems(res.data);
            } catch (err) {
                console.error('Error fetching items:', err);
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            }
        };

        fetchItems();
    }, [navigate]);

    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateItem = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/stock/items', {
                ...newItem,
                price: parseFloat(newItem.price) || 0,
                minStock: parseInt(newItem.minStock) || 10
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setItems([...items, res.data]);
            setShowAddModal(false);
            setNewItem({ name: '', sku: '', category: '', description: '', price: '', minStock: '10' });
            toast.success('Item created successfully!');
        } catch (error) {
            console.error("Error creating item:", error);
            if (error.response && error.response.status === 401) {
                toast.error("Session expired. Please login again.");
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                toast.error('Failed to create item');
            }
        }
    };

    const handleExport = () => {
        const headers = ['Name', 'SKU', 'Category', 'Price', 'Min Stock', 'Description'];
        const csvContent = [
            headers.join(','),
            ...items.map(item => [
                `"${item.name}"`,
                `"${item.sku}"`,
                `"${item.category || ''}"`,
                item.price,
                item.minStock,
                `"${item.description || ''}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'stock_list.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success('Export started!');
        }
    };

    const handleFilter = () => {
        toast('Advanced filtering coming soon!', {
            icon: '🔍',
        });
    };

    return (
        <div className="space-y-8">
            <Toaster position="top-right" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-wide drop-shadow-md">Stock List</h2>
                    <p className="text-primary-lightest mt-1">Manage your inventory items and levels</p>
                </div>
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="bg-white text-[#59598E] hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold shadow-lg flex items-center gap-2 transition-all"
                >
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
                    <button 
                        onClick={handleFilter}
                        className="flex-1 md:flex-none px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2"
                    >
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <button 
                        onClick={handleExport}
                        className="flex-1 md:flex-none px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2"
                    >
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
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#59598E] uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-[#59598E] uppercase tracking-wider">Min Stock</th>
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
                                                <div className="text-xs text-gray-500">{item.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">{item.sku}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {item.category || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">${item.price}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.minStock}</td>
                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                        <button className="text-[#59598E] hover:text-[#4a4a7a] font-semibold">Edit</button>
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

            {/* Add Item Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-xl font-bold text-gray-800">Add New Item</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleCreateItem} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#59598E] focus:border-transparent outline-none transition-all text-gray-900"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                    placeholder="e.g. Wireless Mouse"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#59598E] focus:border-transparent outline-none transition-all text-gray-900"
                                    value={newItem.sku}
                                    onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })}
                                    placeholder="e.g. WM-001"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#59598E] focus:border-transparent outline-none transition-all text-gray-900"
                                        value={newItem.category}
                                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                        placeholder="Electronics"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#59598E] focus:border-transparent outline-none transition-all text-gray-900"
                                        value={newItem.price}
                                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock Level</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#59598E] focus:border-transparent outline-none transition-all text-gray-900"
                                    value={newItem.minStock}
                                    onChange={(e) => setNewItem({ ...newItem, minStock: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#59598E] focus:border-transparent outline-none transition-all text-gray-900"
                                    rows="3"
                                    value={newItem.description}
                                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                    placeholder="Item details..."
                                />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-[#59598E] text-white rounded-xl hover:bg-[#4a4a7a] font-medium shadow-lg shadow-indigo-200 transition-all"
                                >
                                    Create Item
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StockList;

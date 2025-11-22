import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Operations = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'Widget A', sku: 'WID-001' },
        { id: 2, name: 'Gadget B', sku: 'GAD-002' },
        { id: 3, name: 'Tool C', sku: 'TOL-003' },
    ]);
    const [formData, setFormData] = useState({
        stockItemId: '',
        type: 'RECEIPT',
        quantity: '',
    });
    const [message, setMessage] = useState('');

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/stock/transactions', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage('Transaction successful!');
            setFormData({ ...formData, quantity: '' });
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Transaction failed');
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8 text-white tracking-wide drop-shadow-md">Operations</h2>

            <div className="max-w-xl bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[#59598E]">
                <h3 className="text-2xl font-bold mb-6 text-[#59598E]">New Transaction</h3>
                {message && (
                    <div className={`p-4 mb-4 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Operation Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full p-2 border border-[#A3A3C0] rounded focus:outline-none focus:ring-2 focus:ring-[#8383AD] text-gray-900 bg-white"
                        >
                            <option value="RECEIPT" className="text-gray-900 bg-white">Receipt (In)</option>
                            <option value="DELIVERY" className="text-gray-900 bg-white">Delivery (Out)</option>
                            <option value="ADJUSTMENT" className="text-gray-900 bg-white">Adjustment</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Stock Item</label>
                        <select
                            name="stockItemId"
                            value={formData.stockItemId}
                            onChange={handleChange}
                            className="w-full p-2 border border-[#A3A3C0] rounded focus:outline-none focus:ring-2 focus:ring-[#8383AD] text-gray-900 bg-white"
                            required
                        >
                            <option value="" className="text-gray-500">Select Item</option>
                            {items.map((item) => (
                                <option key={item.id} value={item.id} className="text-gray-900 bg-white">
                                    {item.name} (SKU: {item.sku})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            min="1"
                            className="w-full p-2 border border-[#A3A3C0] rounded focus:outline-none focus:ring-2 focus:ring-[#8383AD]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#59598E] text-white py-2 rounded hover:bg-[#6E6E9D] transition-colors font-bold"
                    >
                        SUBMIT TRANSACTION
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Operations;

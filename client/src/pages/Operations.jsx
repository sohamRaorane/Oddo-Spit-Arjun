import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Operations = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [items, setItems] = useState([]);
    const [locations, setLocations] = useState([]);
    const [formData, setFormData] = useState({
        stockItemId: '',
        type: location.state?.type || 'RECEIPT',
        quantity: '',
        locationId: '',
        toLocationId: '',
        reference: '',
        notes: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }
                const config = { headers: { Authorization: `Bearer ${token}` } };
                
                const [itemsRes, locRes] = await Promise.all([
                    axios.get('/api/stock/items', config),
                    axios.get('/api/warehouses/locations', config)
                ]);
                
                setItems(itemsRes.data);
                setLocations(locRes.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            }
        };
        fetchData();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            // Convert quantity to integer, but keep IDs as strings
            const payload = {
                ...formData,
                quantity: parseInt(formData.quantity),
                // stockItemId and locationId are strings (CUIDs)
                toLocationId: formData.type === 'TRANSFER' ? formData.toLocationId : undefined
            };

            await axios.post('/api/stock/transactions', payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Operation successful!');
            setFormData({ ...formData, quantity: '', reference: '', notes: '' });
        } catch (err) {
            console.error('Operation failed:', err);
            if (err.response && err.response.status === 401) {
                toast.error("Session expired. Please login again.");
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                toast.error('Operation failed: ' + (err.response?.data?.message || err.message));
            }
        }
    };

    return (
        <div>
            <Toaster position="top-right" />
            <h2 className="text-3xl font-bold mb-8 text-white tracking-wide drop-shadow-md">Operations</h2>

            <div className="flex justify-center">
                {/* Transaction Form */}
                <div className="w-full max-w-xl">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[#59598E]">
                        <h3 className="text-2xl font-bold mb-6 text-[#59598E]">New Transaction</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Operation Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#A3A3C0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8383AD] text-gray-900 bg-white transition-all"
                                >
                                    <option value="RECEIPT" className="text-gray-900 bg-white">Receipt (In)</option>
                                    <option value="DELIVERY" className="text-gray-900 bg-white">Delivery (Out)</option>
                                    <option value="TRANSFER" className="text-gray-900 bg-white">Transfer (Move)</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Stock Item</label>
                                <select
                                    name="stockItemId"
                                    value={formData.stockItemId}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border border-[#A3A3C0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8383AD] text-gray-900 bg-white transition-all"
                                >
                                    <option value="" className="text-gray-500">Select Item</option>
                                    {items.map(item => (
                                        <option key={item.id} value={item.id} className="text-gray-900">
                                            {item.name} ({item.sku})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        className="w-full p-3 border border-[#A3A3C0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8383AD] text-gray-900 bg-white transition-all"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        {formData.type === 'TRANSFER' ? 'From Location' : 'Location'}
                                    </label>
                                    <select
                                        name="locationId"
                                        value={formData.locationId}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 border border-[#A3A3C0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8383AD] text-gray-900 bg-white transition-all"
                                    >
                                        <option value="" className="text-gray-500">Select Location</option>
                                        {locations.map(loc => (
                                            <option key={loc.id} value={loc.id} className="text-gray-900">
                                                {loc.name} ({loc.code})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {formData.type === 'TRANSFER' && (
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">To Location</label>
                                    <select
                                        name="toLocationId"
                                        value={formData.toLocationId}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 border border-[#A3A3C0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8383AD] text-gray-900 bg-white transition-all"
                                    >
                                        <option value="" className="text-gray-500">Select Destination</option>
                                        {locations.filter(l => l.id !== formData.locationId).map(loc => (
                                            <option key={loc.id} value={loc.id} className="text-gray-900">
                                                {loc.name} ({loc.code})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Reference (Optional)</label>
                                <input
                                    type="text"
                                    name="reference"
                                    value={formData.reference}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#A3A3C0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8383AD] text-gray-900 bg-white transition-all"
                                    placeholder="Enter reference number"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Notes (Optional)</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#A3A3C0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8383AD] text-gray-900 bg-white transition-all"
                                    rows="3"
                                    placeholder="Enter any additional notes"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#59598E] hover:bg-[#6E6E9D] text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                            >
                                Submit Transaction
                            </button>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Operations;

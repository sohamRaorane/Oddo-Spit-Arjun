import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { User, Bell, Lock, Save, Shield, Mail, MapPin, Building, Package, ArrowLeft, X } from 'lucide-react';

const Settings = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [user, setUser] = useState({ name: '', email: '', bio: '' });
    const [notifications, setNotifications] = useState({
        email: true,
        stockLow: true,
        weeklyReport: false
    });

    const [warehouses, setWarehouses] = useState([]);
    const [locations, setLocations] = useState([]);
    const [warehouseInventory, setWarehouseInventory] = useState([]);

    // Modal States
    const [showWarehouseModal, setShowWarehouseModal] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [newWarehouse, setNewWarehouse] = useState({ name: '', code: '', address: '', capacity: '' });
    const [newLocation, setNewLocation] = useState({ name: '', code: '', warehouseId: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }
                const config = { headers: { Authorization: `Bearer ${token}` } };

                // Fetch User Profile
                const userRes = await axios.get('/api/auth/me', config);
                setUser(userRes.data);

                const [whRes, locRes] = await Promise.all([
                    axios.get('/api/warehouses', config),
                    axios.get('/api/warehouses/locations', config)
                ]);

                setWarehouses(whRes.data);
                setLocations(locRes.data);
            } catch (error) {
                console.error("Error fetching settings data:", error);
                if (error.response && error.response.status === 401) {
                    toast.error("Session expired. Please login again.");
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    toast.error("Failed to load settings data");
                }
            }
        };
        fetchData();
    }, [navigate]);

    // Fetch inventory when a warehouse is selected
    useEffect(() => {
        if (selectedWarehouse) {
            const fetchInventory = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const res = await axios.get(`/api/warehouses/${selectedWarehouse.id}/inventory`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    // Transform data for table
                    const inventory = res.data.map(level => ({
                        id: level.id,
                        name: level.stockItem.name,
                        sku: level.stockItem.sku,
                        qty: level.quantity,
                        status: level.quantity <= level.stockItem.minStock ? 'Low Stock' : 'In Stock'
                    }));
                    setWarehouseInventory(inventory);
                } catch (error) {
                    console.error("Error fetching warehouse inventory:", error);
                }
            };
            fetchInventory();
        }
    }, [selectedWarehouse]);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('/api/auth/me', user, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error('Failed to update profile');
        }
    };

    const handleCreateWarehouse = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/warehouses', newWarehouse, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWarehouses([...warehouses, res.data]);
            setShowWarehouseModal(false);
            setNewWarehouse({ name: '', code: '', address: '', capacity: '' });
            toast.success('Warehouse created successfully!');
        } catch (error) {
            console.error("Error creating warehouse:", error);
            if (error.response && error.response.status === 401) {
                toast.error("Session expired. Please login again.");
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                toast.error('Failed to create warehouse');
            }
        }
    };

    const handleCreateLocation = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/warehouses/locations', newLocation, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setLocations([...locations, res.data]);
            setShowLocationModal(false);
            setNewLocation({ name: '', code: '', warehouseId: '' });
            toast.success('Location created successfully!');
        } catch (error) {
            console.error("Error creating location:", error);
            if (error.response && error.response.status === 401) {
                toast.error("Session expired. Please login again.");
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                toast.error('Failed to create location');
            }
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <Toaster position="top-right" />
            <h2 className="text-3xl font-bold mb-8 text-white tracking-wide drop-shadow-md">Settings</h2>
            
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <nav className="flex flex-col p-2">
                            <button
                                onClick={() => { setActiveTab('profile'); setSelectedWarehouse(null); }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                                    activeTab === 'profile' 
                                    ? 'bg-[#59598E] text-white shadow-md' 
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <User className="w-5 h-5" />
                                Profile Information
                            </button>
                            <button
                                onClick={() => { setActiveTab('warehouse'); setSelectedWarehouse(null); }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                                    activeTab === 'warehouse' 
                                    ? 'bg-[#59598E] text-white shadow-md' 
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <Building className="w-5 h-5" />
                                Warehouses
                            </button>
                            <button
                                onClick={() => { setActiveTab('location'); setSelectedWarehouse(null); }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                                    activeTab === 'location' 
                                    ? 'bg-[#59598E] text-white shadow-md' 
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <MapPin className="w-5 h-5" />
                                Locations
                            </button>
                            <button
                                onClick={() => { setActiveTab('notifications'); setSelectedWarehouse(null); }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                                    activeTab === 'notifications' 
                                    ? 'bg-[#59598E] text-white shadow-md' 
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                <Bell className="w-5 h-5" />
                                Notifications
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1">
                    <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#59598E]">
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <div className="border-b pb-4">
                                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                        <User className="w-6 h-6 text-[#59598E]" />
                                        Profile Information
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-1">Update your account's profile information and email address.</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input 
                                            type="text" 
                                            value={user.name || ''}
                                            onChange={(e) => setUser({...user, name: e.target.value})}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#59598E] focus:border-transparent outline-none transition-all text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                            <input 
                                                type="email" 
                                                value={user.email || ''}
                                                onChange={(e) => setUser({...user, email: e.target.value})}
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#59598E] focus:border-transparent outline-none transition-all text-gray-900"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                        <textarea 
                                            rows="4"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#59598E] focus:border-transparent outline-none transition-all text-gray-900"
                                            value={user.bio || ''}
                                            onChange={(e) => setUser({...user, bio: e.target.value})}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button onClick={handleSave} className="bg-[#59598E] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4A4A7A] transition-colors flex items-center gap-2">
                                        <Save className="w-4 h-4" />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'warehouse' && !selectedWarehouse && (
                            <div className="space-y-6">
                                <div className="border-b pb-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                            <Building className="w-6 h-6 text-[#59598E]" />
                                            Warehouses
                                        </h3>
                                        <p className="text-gray-500 text-sm mt-1">Manage your warehouse locations and inventory.</p>
                                    </div>
                                    <button 
                                        onClick={() => setShowWarehouseModal(true)}
                                        className="bg-[#59598E] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#4A4A7A] transition-colors"
                                    >
                                        + Add Warehouse
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {warehouses.map((wh) => (
                                        <div 
                                            key={wh.id}
                                            onClick={() => setSelectedWarehouse(wh)}
                                            className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-[#59598E] transition-all cursor-pointer group"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="text-lg font-bold text-gray-800 group-hover:text-[#59598E] transition-colors">{wh.name}</h4>
                                                    <p className="text-sm text-gray-500 font-mono mt-1">{wh.code}</p>
                                                    <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-gray-400" />
                                                        {wh.address}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">Active</span>
                                                    <p className="text-sm text-gray-500 mt-3">Capacity: <span className="font-bold text-gray-800">{wh.capacity}</span></p>
                                                    <p className="text-sm text-gray-500">Items: <span className="font-bold text-gray-800">{wh.items}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'warehouse' && selectedWarehouse && (
                            <div className="space-y-6">
                                <div className="border-b pb-4">
                                    <button 
                                        onClick={() => setSelectedWarehouse(null)}
                                        className="flex items-center gap-2 text-gray-500 hover:text-[#59598E] mb-4 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back to List
                                    </button>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-800">{selectedWarehouse.name}</h3>
                                            <p className="text-gray-500 font-mono mt-1">{selectedWarehouse.code}</p>
                                        </div>
                                        <button className="text-[#59598E] font-semibold hover:underline">Edit Details</button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-sm text-gray-500 mb-1">Address</p>
                                        <p className="font-semibold text-gray-800">{selectedWarehouse.address}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-sm text-gray-500 mb-1">Total Capacity</p>
                                        <p className="font-semibold text-gray-800">{selectedWarehouse.capacity}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-sm text-gray-500 mb-1">Total Items</p>
                                        <p className="font-semibold text-gray-800">{selectedWarehouse.items}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <Package className="w-5 h-5 text-[#59598E]" />
                                        Current Inventory
                                    </h4>
                                    <div className="overflow-x-auto border rounded-xl">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Item Name</th>
                                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">SKU</th>
                                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Quantity</th>
                                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {warehouseInventory.map((item) => (
                                                    <tr key={item.id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-500 font-mono">{item.sku}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-900 font-bold">{item.qty}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                item.status === 'In Stock' ? 'bg-green-100 text-green-800' : 
                                                                item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                                            }`}>
                                                                {item.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'location' && (
                            <div className="space-y-6">
                                <div className="border-b pb-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                            <MapPin className="w-6 h-6 text-[#59598E]" />
                                            Locations
                                        </h3>
                                        <p className="text-gray-500 text-sm mt-1">Manage specific zones and locations within your warehouses.</p>
                                    </div>
                                    <button 
                                        onClick={() => setShowLocationModal(true)}
                                        className="bg-[#59598E] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#4A4A7A] transition-colors"
                                    >
                                        + Add Location
                                    </button>
                                </div>

                                <div className="overflow-hidden border rounded-xl">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Location Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Short Code</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Warehouse</th>
                                                <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {locations.map((loc) => (
                                                <tr 
                                                    key={loc.id} 
                                                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                                                >
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{loc.name}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">{loc.code}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{loc.warehouse?.name || 'N/A'}</td>
                                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                                        <button className="text-[#59598E] hover:text-[#4a4a7a]">Edit</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="space-y-6">
                                <div className="border-b pb-4">
                                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                        <Bell className="w-6 h-6 text-[#59598E]" />
                                        Notification Preferences
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-1">Manage how you receive notifications and alerts.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div>
                                            <h4 className="font-semibold text-gray-800">Email Notifications</h4>
                                            <p className="text-sm text-gray-500">Receive daily summaries via email</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={notifications.email}
                                                onChange={() => setNotifications({...notifications, email: !notifications.email})}
                                                className="sr-only peer" 
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#59598E]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#59598E]"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div>
                                            <h4 className="font-semibold text-gray-800">Low Stock Alerts</h4>
                                            <p className="text-sm text-gray-500">Get notified when items fall below threshold</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={notifications.stockLow}
                                                onChange={() => setNotifications({...notifications, stockLow: !notifications.stockLow})}
                                                className="sr-only peer" 
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#59598E]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#59598E]"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div>
                                            <h4 className="font-semibold text-gray-800">Weekly Reports</h4>
                                            <p className="text-sm text-gray-500">Receive weekly analysis of stock movements</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={notifications.weeklyReport}
                                                onChange={() => setNotifications({...notifications, weeklyReport: !notifications.weeklyReport})}
                                                className="sr-only peer" 
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#59598E]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#59598E]"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-8 pt-6 border-t flex justify-end">
                            <button 
                                onClick={handleSave}
                                className="flex items-center gap-2 bg-[#59598E] text-white px-6 py-2 rounded-lg hover:bg-[#4A4A7A] transition-colors shadow-lg hover:shadow-xl"
                            >
                                <Save className="w-4 h-4" />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Warehouse Modal */}
            {showWarehouseModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full z-10">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Add New Warehouse</h3>
                            <button 
                                onClick={() => setShowWarehouseModal(false)} 
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateWarehouse}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Warehouse Name</label>
                                    <input 
                                        type="text" 
                                        value={newWarehouse.name}
                                        onChange={(e) => setNewWarehouse({...newWarehouse, name: e.target.value})}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#59598E] focus:border-transparent outline-none transition-all text-gray-900"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Warehouse Code</label>
                                    <input 
                                        type="text" 
                                        value={newWarehouse.code}
                                        onChange={(e) => setNewWarehouse({...newWarehouse, code: e.target.value})}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#59598E] focus:border-transparent outline-none transition-all text-gray-900"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                    <input 
                                        type="text" 
                                        value={newWarehouse.address}
                                        onChange={(e) => setNewWarehouse({...newWarehouse, address: e.target.value})}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#59598E] focus:border-transparent outline-none transition-all text-gray-900"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                                    <input 
                                        type="number" 
                                        value={newWarehouse.capacity}
                                        onChange={(e) => setNewWarehouse({...newWarehouse, capacity: e.target.value})}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#59598E] focus:border-transparent outline-none transition-all text-gray-900"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button 
                                    type="submit"
                                    className="flex items-center gap-2 bg-[#59598E] text-white px-4 py-2 rounded-lg hover:bg-[#4A4A7A] transition-colors"
                                >
                                    <Save className="w-4 h-4" />
                                    Create Warehouse
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Location Modal */}
            {showLocationModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full z-10">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Add New Location</h3>
                            <button 
                                onClick={() => setShowLocationModal(false)} 
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateLocation}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location Name</label>
                                    <input 
                                        type="text" 
                                        value={newLocation.name}
                                        onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#59598E] focus:border-transparent outline-none transition-all text-gray-900"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Short Code</label>
                                    <input 
                                        type="text" 
                                        value={newLocation.code}
                                        onChange={(e) => setNewLocation({...newLocation, code: e.target.value})}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#59598E] focus:border-transparent outline-none transition-all text-gray-900"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Warehouse</label>
                                    <select 
                                        value={newLocation.warehouseId}
                                        onChange={(e) => setNewLocation({...newLocation, warehouseId: e.target.value})}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#59598E] focus:border-transparent outline-none transition-all text-gray-900"
                                        required
                                    >
                                        <option value="">Choose a warehouse</option>
                                        {warehouses.map((wh) => (
                                            <option key={wh.id} value={wh.id}>{wh.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button 
                                    type="submit"
                                    className="flex items-center gap-2 bg-[#59598E] text-white px-4 py-2 rounded-lg hover:bg-[#4A4A7A] transition-colors"
                                >
                                    <Save className="w-4 h-4" />
                                    Create Location
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;

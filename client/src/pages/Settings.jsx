import React, { useState } from 'react';
import { User, Bell, Lock, Save, Shield, Mail, MapPin, Building, Package, ArrowLeft } from 'lucide-react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [notifications, setNotifications] = useState({
        email: true,
        stockLow: true,
        weeklyReport: false
    });

    // Mock Data
    const warehouses = [
        { id: 1, name: 'Central Distribution Hub', code: 'WH-001', address: '123 Logistics Blvd, New York, NY 10001', capacity: '85%', items: 1250 },
        { id: 2, name: 'West Coast Facility', code: 'WH-002', address: '456 Harbor Dr, Los Angeles, CA 90001', capacity: '45%', items: 850 },
        { id: 3, name: 'European Branch', code: 'WH-EU-01', address: '789 Trade St, London, UK', capacity: '60%', items: 600 },
    ];

    const locations = [
        { id: 1, name: 'Zone A - Electronics', code: 'ZN-A', warehouse: 'Central Distribution Hub' },
        { id: 2, name: 'Zone B - Perishables', code: 'ZN-B', warehouse: 'Central Distribution Hub' },
        { id: 3, name: 'Zone C - Bulk Storage', code: 'ZN-C', warehouse: 'West Coast Facility' },
        { id: 4, name: 'Zone D - Returns', code: 'ZN-D', warehouse: 'West Coast Facility' },
        { id: 5, name: 'Zone E - High Value', code: 'ZN-E', warehouse: 'European Branch' },
    ];

    const warehouseInventory = [
        { id: 1, name: 'Widget A', sku: 'WID-001', qty: 500, status: 'In Stock' },
        { id: 2, name: 'Gadget B', sku: 'GAD-002', qty: 120, status: 'Low Stock' },
        { id: 3, name: 'Tool C', sku: 'TOL-003', qty: 50, status: 'Critical' },
        { id: 4, name: 'Component D', sku: 'COM-004', qty: 1000, status: 'In Stock' },
    ];

    const handleSave = () => {
        // Mock save functionality
        alert('Settings saved successfully!');
    };

    return (
        <div className="max-w-6xl mx-auto">
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
                                            defaultValue="Admin User"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#59598E] focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                            <input 
                                                type="email" 
                                                defaultValue="admin@stockmaster.com"
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#59598E] focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                        <textarea 
                                            rows="4"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#59598E] focus:border-transparent outline-none transition-all"
                                            defaultValue="Warehouse manager with 5 years of experience."
                                        ></textarea>
                                    </div>
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
                                    <button className="bg-[#59598E] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#4A4A7A] transition-colors">
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
                                    <button className="bg-[#59598E] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#4A4A7A] transition-colors">
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
                                                    onClick={() => {
                                                        const targetWarehouse = warehouses.find(w => w.name === loc.warehouse);
                                                        if (targetWarehouse) {
                                                            setActiveTab('warehouse');
                                                            setSelectedWarehouse(targetWarehouse);
                                                        }
                                                    }}
                                                >
                                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{loc.name}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">{loc.code}</td>
                                                    <td className="px-6 py-4 text-sm text-[#59598E] font-medium hover:underline">{loc.warehouse}</td>
                                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                                        <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
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
        </div>
    );
};

export default Settings;

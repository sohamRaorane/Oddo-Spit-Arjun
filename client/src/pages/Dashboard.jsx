import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { 
    TrendingUp, Package, AlertTriangle, DollarSign, 
    ArrowUpRight, ArrowDownRight, Activity, Clock 
} from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalItems: 120,
        totalStock: 4500,
        totalValue: 25000,
        lowStock: 5,
    });

    // Mock data for the specific cards in the sketch
    const receiptData = {
        toReceive: 4,
        late: 1,
        operations: 6
    };

    const deliveryData = {
        toDeliver: 4,
        late: 1,
        waiting: 2,
        operations: 6
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Stock Movement',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Inbound',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(89, 89, 142, 0.5)',
                borderColor: '#59598E',
                borderWidth: 1,
            },
            {
                label: 'Outbound',
                data: [2, 3, 20, 5, 1, 4],
                backgroundColor: 'rgba(131, 131, 173, 0.5)',
                borderColor: '#8383AD',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-wide drop-shadow-md">Dashboard</h2>
                    <p className="text-primary-lightest mt-1">Overview of your inventory performance</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-mono border border-white/20 shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    System Operational
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Stock Value', value: '$25,430', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
                    { label: 'Total Items', value: '1,240', icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
                    { label: 'Low Stock Alerts', value: '5', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' },
                    { label: 'Active Orders', value: '12', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-100' },
                ].map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-[#59598E] hover:transform hover:scale-105 transition-all duration-300">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Action Cards */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Receipt Card */}
                    <div className="bg-white rounded-2xl p-6 relative overflow-hidden shadow-xl border-t-4 border-[#59598E]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl text-[#59598E] font-bold">Receipts</h3>
                            <ArrowDownRight className="w-6 h-6 text-[#59598E]" />
                        </div>
                        
                        <div className="space-y-6">
                            <button 
                                onClick={() => navigate('/history', { state: { filter: 'RECEIPT' } })}
                                className="w-full bg-[#59598E] hover:bg-[#6E6E9D] text-white py-3 rounded-xl shadow-lg transition-all font-semibold flex justify-between items-center px-6"
                            >
                                <span>To Receive</span>
                                <span className="bg-white/20 px-2 py-1 rounded text-sm">{receiptData.toReceive}</span>
                            </button>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-red-50 p-3 rounded-xl text-center">
                                    <span className="block text-2xl font-bold text-red-600">{receiptData.late}</span>
                                    <span className="text-xs text-red-500 font-medium uppercase">Late</span>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-xl text-center">
                                    <span className="block text-2xl font-bold text-blue-600">{receiptData.operations}</span>
                                    <span className="text-xs text-blue-500 font-medium uppercase">Ops</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Card */}
                    <div className="bg-white rounded-2xl p-6 relative overflow-hidden shadow-xl border-t-4 border-[#8383AD]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl text-[#8383AD] font-bold">Deliveries</h3>
                            <ArrowUpRight className="w-6 h-6 text-[#8383AD]" />
                        </div>

                        <div className="space-y-6">
                            <button 
                                onClick={() => navigate('/history', { state: { filter: 'DELIVERY' } })}
                                className="w-full bg-[#8383AD] hover:bg-[#A3A3C0] text-white py-3 rounded-xl shadow-lg transition-all font-semibold flex justify-between items-center px-6"
                            >
                                <span>To Deliver</span>
                                <span className="bg-white/20 px-2 py-1 rounded text-sm">{deliveryData.toDeliver}</span>
                            </button>

                            <div className="grid grid-cols-3 gap-2">
                                <div className="bg-red-50 p-2 rounded-xl text-center">
                                    <span className="block text-xl font-bold text-red-600">{deliveryData.late}</span>
                                    <span className="text-[10px] text-red-500 font-medium uppercase">Late</span>
                                </div>
                                <div className="bg-yellow-50 p-2 rounded-xl text-center">
                                    <span className="block text-xl font-bold text-yellow-600">{deliveryData.waiting}</span>
                                    <span className="text-[10px] text-yellow-500 font-medium uppercase">Wait</span>
                                </div>
                                <div className="bg-blue-50 p-2 rounded-xl text-center">
                                    <span className="block text-xl font-bold text-blue-600">{deliveryData.operations}</span>
                                    <span className="text-[10px] text-blue-500 font-medium uppercase">Ops</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Charts & Activity */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Chart Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-[#59598E]">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Stock Movement Trends</h3>
                        <div className="h-64">
                            <Bar options={chartOptions} data={chartData} />
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-[#59598E]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
                            <button 
                                onClick={() => navigate('/history')}
                                className="text-sm text-[#59598E] font-semibold hover:text-[#4A4A7A] hover:underline"
                            >
                                View All
                            </button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { action: 'Received Stock', item: 'Widget A', qty: '+50', time: '2 mins ago', icon: ArrowDownRight, color: 'text-green-600', bg: 'bg-green-100' },
                                { action: 'Dispatched Order', item: 'Gadget B', qty: '-12', time: '15 mins ago', icon: ArrowUpRight, color: 'text-blue-600', bg: 'bg-blue-100' },
                                { action: 'Stock Adjustment', item: 'Tool C', qty: '-2', time: '1 hour ago', icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-100' },
                            ].map((activity, i) => (
                                <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-full ${activity.bg}`}>
                                            <activity.icon className={`w-4 h-4 ${activity.color}`} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">{activity.action}</p>
                                            <p className="text-xs text-gray-500">{activity.item}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-sm font-bold ${activity.qty.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{activity.qty}</p>
                                        <div className="flex items-center gap-1 text-xs text-gray-400">
                                            <Clock className="w-3 h-3" />
                                            {activity.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

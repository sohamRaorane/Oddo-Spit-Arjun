import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalItems: 120,
        totalStock: 4500,
        totalTransactions: 85,
        receipts: 50,
        deliveries: 35,
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

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white tracking-wide drop-shadow-md">Dashboard</h2>
                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-mono border border-white/30 shadow-sm">4 Notifications</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Receipt Card */}
                <div className="bg-white rounded-2xl p-8 relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-[#59598E]">
                    {/* Card Title */}
                    <h3 className="text-2xl text-[#59598E] mb-8 font-bold">Receipt</h3>

                    <div className="flex justify-between items-end">
                        {/* Action Button */}
                        <button className="bg-[#59598E] hover:bg-[#6E6E9D] text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 font-semibold">
                            {receiptData.toReceive} to receive
                        </button>

                        {/* Stats List */}
                        <div className="text-right space-y-1">
                            <p className="text-gray-500 text-sm font-medium">
                                <span className="text-[#59598E] font-bold text-lg">{receiptData.late}</span> Late
                            </p>
                            <p className="text-gray-500 text-sm font-medium">
                                <span className="text-[#59598E] font-bold text-lg">{receiptData.operations}</span> operations
                            </p>
                        </div>
                    </div>
                </div>

                {/* Delivery Card */}
                <div className="bg-white rounded-2xl p-8 relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-t-4 border-[#59598E]">
                    {/* Card Title */}
                    <h3 className="text-2xl text-[#59598E] mb-8 font-bold">Delivery</h3>

                    <div className="flex justify-between items-end">
                        {/* Action Button */}
                        <button className="bg-[#59598E] hover:bg-[#6E6E9D] text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 font-semibold">
                            {deliveryData.toDeliver} to Deliver
                        </button>

                        {/* Stats List */}
                        <div className="text-right space-y-1">
                            <p className="text-gray-500 text-sm font-medium">
                                <span className="text-[#59598E] font-bold text-lg">{deliveryData.late}</span> Late
                            </p>
                            <p className="text-gray-500 text-sm font-medium">
                                <span className="text-[#59598E] font-bold text-lg">{deliveryData.waiting}</span> waiting
                            </p>
                            <p className="text-gray-500 text-sm font-medium">
                                <span className="text-[#59598E] font-bold text-lg">{deliveryData.operations}</span> operations
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

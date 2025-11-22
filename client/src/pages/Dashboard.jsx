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
                <h2 className="text-3xl font-light text-primary-highlight tracking-wide">Dashboard</h2>
                <div className="bg-primary-light px-3 py-1 rounded text-white text-sm font-mono">4</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Receipt Card */}
                <div className="bg-[#1a1a2e] border border-primary rounded-2xl p-8 relative overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow">
                    {/* Card Title */}
                    <h3 className="text-2xl text-primary-highlight mb-8 font-light">Receipt</h3>

                    <div className="flex justify-between items-end">
                        {/* Action Button */}
                        <button className="bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg shadow-md transition-colors text-lg">
                            {receiptData.toReceive} to receive
                        </button>

                        {/* Stats List */}
                        <div className="text-right space-y-1">
                            <p className="text-primary-lightest text-sm">
                                <span className="text-white font-bold">{receiptData.late}</span> Late
                            </p>
                            <p className="text-primary-lightest text-sm">
                                <span className="text-white font-bold">{receiptData.operations}</span> operations
                            </p>
                        </div>
                    </div>

                    {/* Decorative border line similar to sketch */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-light"></div>
                </div>

                {/* Delivery Card */}
                <div className="bg-[#1a1a2e] border border-primary rounded-2xl p-8 relative overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow">
                    {/* Card Title */}
                    <h3 className="text-2xl text-primary-highlight mb-8 font-light">Delivery</h3>

                    <div className="flex justify-between items-end">
                        {/* Action Button */}
                        <button className="bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg shadow-md transition-colors text-lg">
                            {deliveryData.toDeliver} to Deliver
                        </button>

                        {/* Stats List */}
                        <div className="text-right space-y-1">
                            <p className="text-primary-lightest text-sm">
                                <span className="text-white font-bold">{deliveryData.late}</span> Late
                            </p>
                            <p className="text-primary-lightest text-sm">
                                <span className="text-white font-bold">{deliveryData.waiting}</span> waiting
                            </p>
                            <p className="text-primary-lightest text-sm">
                                <span className="text-white font-bold">{deliveryData.operations}</span> operations
                            </p>
                        </div>
                    </div>
                    {/* Decorative border line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-light"></div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

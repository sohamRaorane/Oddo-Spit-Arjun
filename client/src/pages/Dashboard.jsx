import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

    useEffect(() => {
        // Mock data is already set in initial state
        // In a real scenario, we would fetch from API here
    }, []);

    const chartData = {
        labels: ['Receipts', 'Deliveries'],
        datasets: [
            {
                label: 'Transactions',
                data: [stats.receipts, stats.deliveries],
                backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Total Items</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalItems}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Total Stock Quantity</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalStock}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Total Transactions</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalTransactions}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">Transaction Overview</h3>
                    <Bar data={chartData} options={{ responsive: true }} />
                </div>

                {/* Placeholder for other widgets */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">Quick Actions</h3>
                    <div className="space-y-4">
                        <p className="text-gray-600">Navigate to Operations to manage stock.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

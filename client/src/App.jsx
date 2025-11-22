import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import StockList from './pages/StockList';
import Operations from './pages/Operations';
import MoveHistory from './pages/MoveHistory';
import Settings from './pages/Settings';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/stock" element={<StockList />} />
                    <Route path="/operations" element={<Operations />} />
                    <Route path="/history" element={<MoveHistory />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

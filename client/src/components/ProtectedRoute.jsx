import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // TEMPORARY: Bypass auth for demo
    // if (!token) {
    //   return <Navigate to="/login" replace />;
    // }

    return children;
};

export default ProtectedRoute;

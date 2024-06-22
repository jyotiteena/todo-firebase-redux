import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const user = useSelector((state) => state.auth.user);
    console.log("user.................");
    console.log(user)

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

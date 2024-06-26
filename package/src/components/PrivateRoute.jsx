import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const token = localStorage.getItem('authToken');
  return userInfo ? <Outlet /> : <Navigate to="/welcome" />;
};

export default PrivateRoute;

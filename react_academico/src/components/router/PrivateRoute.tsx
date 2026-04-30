import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute: React.FC = () => {
  // Mantemos o hook para não quebrar componentes que dependem dele, 
  // mas liberamos o acesso direto conforme pedido (professor ensinará JWT depois).
  return <Outlet />;
};

export default PrivateRoute;

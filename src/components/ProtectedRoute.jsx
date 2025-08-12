// src/components/ProtectedRoute.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Context/authContext'; 

const ProtectedRoute = ({ children }) => {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) {
      navigate('/signin');
    }
  }, [loading, session, navigate]);

  if (loading) return null; // أو Loader

  return children;
};

export default ProtectedRoute;

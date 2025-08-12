import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../Supabase/supabase_config';

export default function useSidebarLogic() {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1024);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };
    checkAuth();

    const handleResize = () => {
      setCollapsed(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    navigate('/signin');
  };

  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  return {
    collapsed,
    setCollapsed,
    isAuthenticated,
    handleLogout,
    toggleSidebar,
    navigate
  };
}

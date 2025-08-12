import React, { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {
  FaHome,
  FaUsers,
  FaCog,
  FaChartBar,
  FaSignOutAlt,
  FaBars,
  FaAmbulance,
  FaSignInAlt,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import supabase from '../../Supabase/supabase_config'; 

const CustomSidebar = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1024);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Get user status on mount
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

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    navigate('/signin');
  };

  return (
    <div className="sidebar-container h-screen overflow-hidden">
      <Sidebar
        collapsed={collapsed}
        className="h-full bg-[var(--light-color)] text-[var(--text-color)] !border-none !shadow-none overflow-hidden"
      >
        {/* Logo and toggle */}
        <div
          className={`relative flex items-center justify-between bg-[var(--main-color)] ${
            collapsed ? 'py-5 px-0 justify-center' : 'p-4'
          }`}
        >
          <h1
            className={`glow-text animate-glow text-white font-bold tracking-wider transition-all duration-300 ${
              collapsed ? 'text-base text-center w-full' : 'text-2xl'
            }`}
          >
            Hospital
          </h1>

          {!collapsed && (
            <FaBars
              className="cursor-pointer text-white text-xl"
              onClick={() => setCollapsed(!collapsed)}
            />
          )}
        </div>

        <Menu
          className="px-2 py-2 overflow-hidden"
          menuItemStyles={{
            button: {
              color: 'var(--text-color)',
              opacity: 0.8,
              transition: '0.3s',
              '&:hover': {
                backgroundColor: 'var(--background-color)',
                opacity: 1,
              },
            },
            label: {
              color: 'var(--text-color)',
            },
            icon: {
              color: 'var(--text-color)',
              fontSize: '1.2rem',
            },
          }}
        >
          {collapsed && (
            <MenuItem icon={<FaBars />} onClick={() => setCollapsed(!collapsed)} />
          )}

          <div className="space-y-1 mb-3 pb-3 border-b border-[var(--background-color)] border-opacity-20">
            <MenuItem icon={<FaHome />} onClick={() => navigate('/')}>
              Dashboard
            </MenuItem>
            <MenuItem icon={<FaUsers />} onClick={() => navigate('/users')}>
              Users
            </MenuItem>
          </div>

          <div className="space-y-1 mb-3 pb-3 border-b border-[var(--background-color)] border-opacity-20">
            <SubMenu label="Emergency" icon={<FaAmbulance />}>
              <MenuItem onClick={() => navigate('/doctors')}>Doctors</MenuItem>
              <MenuItem onClick={() => navigate('/patients')}>Patients</MenuItem>
              <MenuItem onClick={() => navigate('/cases')}>Cases</MenuItem>
              <MenuItem onClick={() => navigate('/beds')}>Beds</MenuItem>
              <MenuItem onClick={() => navigate('/nurses')}>Nurses</MenuItem>
            </SubMenu>
            <MenuItem icon={<FaChartBar />} onClick={() => navigate('/analytics')}>
              Analytics
            </MenuItem>
          </div>

          <div className="space-y-1 pt-2">
            <SubMenu label="Administration" icon={<FaCog />}>
              <MenuItem onClick={() => navigate('/')}>Control 1</MenuItem>
              <MenuItem onClick={() => navigate('/')}>Control 2</MenuItem>
            </SubMenu>

            {isAuthenticated ? (
              <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>
                Logout
              </MenuItem>
            ) : (
              <MenuItem icon={<FaSignInAlt />} onClick={() => navigate('/signin')}>
                Login
              </MenuItem>
            )}
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default CustomSidebar;

// import React from 'react';
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import {
//   FaHome, FaUsers, FaCog, FaChartBar, FaSignOutAlt, FaBars,
//   FaAmbulance, FaSignInAlt, FaUserMd, FaProcedures,
//   FaNotesMedical, FaBed, FaUserNurse
// } from 'react-icons/fa';
// import useSidebarLogic from '../../hooks/useSidebarLogic';
// import './Sidebar.css';

// const CustomSidebar = () => {
//   const {
//     collapsed, isAuthenticated, handleLogout,
//     toggleSidebar, navigate
//   } = useSidebarLogic();

//   return (
//     <div className="sidebar-container h-screen overflow-hidden">
//       <Sidebar
//         collapsed={collapsed}
//         className="h-full !border-none !shadow-none overflow-hidden transition-colors duration-300"
//         style={{
//           backgroundColor: 'var(--light-color)',
//           color: 'var(--text-color)',
//         }}
//       >
//         {/* Logo */}
//         <div
//           className="relative flex items-center justify-between transition-colors duration-300"
//           style={{
//             backgroundColor: 'var(--main-color)',
//           }}
//         >
//           <h1
//             className={`glow-text animate-glow font-bold tracking-wider text-white transition-all duration-300 ${
//               collapsed ? 'text-base text-center w-full py-5' : 'text-2xl p-4'
//             }`}
//           >
//             Emergency
//           </h1>

//           {!collapsed && (
//             <FaBars
//               className="cursor-pointer text-white text-xl mr-4"
//               onClick={toggleSidebar}
//             />
//           )}
//         </div>

//         {/* Menu */}
//         <Menu
//           className="px-2 py-2 overflow-hidden"
//           menuItemStyles={{
//             button: {
//               color: 'var(--text-color)',
//               backgroundColor: 'transparent',
//               opacity: 0.9,
//               transition: 'all 0.3s ease',
//               borderRadius: '8px',
//               marginBottom: '4px',
//               '&:hover': {
//                 backgroundColor: 'var(--background-color)',
//                 opacity: 1,
//               },
//             },
//             label: { color: 'var(--text-color)' },
//             icon: { color: 'var(--text-color)', fontSize: '1.2rem' },
//             subMenuContent: {
//               backgroundColor: 'var(--light-color)',
//               padding: '0px',
//               borderRadius: '6px',
//               transition: 'background-color 0.3s ease',
//               '& .ps-menuitem-root': {
//                 borderRadius: '6px',
//                 marginBottom: '4px',
//                 color: 'var(--text-color)',
//                 transition: 'background-color 0.3s ease, color 0.3s ease',
//               },
//               '& .ps-menuitem-root:hover': {
//                 backgroundColor: 'var(--main-color)',
//                 color: '#fff',
//               },
//               '& .ps-menuitem-root:hover svg': {
//                 color: '#fff',
//               },
//             },
//           }}
//         >
//           {collapsed && (
//             <MenuItem icon={<FaBars />} onClick={toggleSidebar} />
//           )}

//           {/* Dashboard & Users */}
//           <div className="space-y-1 mb-3 pb-3 border-b border-[var(--background-color)] border-opacity-20">
//             <MenuItem icon={<FaHome />} onClick={() => navigate('/')}>
//               Dashboard
//             </MenuItem>
//             <MenuItem icon={<FaUsers />} onClick={() => navigate('/users')}>
//               Users
//             </MenuItem>
//           </div>

//           {/* Emergency Section */}
//           <div className="space-y-1 mb-3 pb-3 border-b border-[var(--background-color)] border-opacity-20">
//             <SubMenu label="Emergency" icon={<FaAmbulance />}>
//               <MenuItem icon={<FaUserMd />} onClick={() => navigate('/doctors')}>
//                 Doctors
//               </MenuItem>
//               <MenuItem icon={<FaProcedures />} onClick={() => navigate('/patients')}>
//                 Patients
//               </MenuItem>
//               <MenuItem icon={<FaNotesMedical />} onClick={() => navigate('/cases')}>
//                 Cases
//               </MenuItem>
//               <MenuItem icon={<FaBed />} onClick={() => navigate('/beds')}>
//                 Beds
//               </MenuItem>
//               <MenuItem icon={<FaUserNurse />} onClick={() => navigate('/nurses')}>
//                 Nurses
//               </MenuItem>
//             </SubMenu>
//             <MenuItem icon={<FaChartBar />} onClick={() => navigate('/analytics')}>
//               Analytics
//             </MenuItem>
//           </div>

//           {/* Administration */}
//           <div className="space-y-1 pt-2">
//             <SubMenu label="Administration" icon={<FaCog />}>
//               <MenuItem onClick={() => navigate('/')}>Control 1</MenuItem>
//               <MenuItem onClick={() => navigate('/')}>Control 2</MenuItem>
//             </SubMenu>

//             {isAuthenticated ? (
//               <MenuItem icon={<FaSignOutAlt />} onClick={handleLogout}>
//                 Logout
//               </MenuItem>
//             ) : (
//               <MenuItem icon={<FaSignInAlt />} onClick={() => navigate('/signin')}>
//                 Login
//               </MenuItem>
//             )}
//           </div>
//         </Menu>
//       </Sidebar>
//     </div>
//   );
// };

// export default CustomSidebar;















import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {
  FaHome, FaUsers, FaCog, FaChartBar, FaSignOutAlt, FaBars,
  FaAmbulance, FaSignInAlt, FaUserMd, FaProcedures,
  FaNotesMedical, FaBed, FaUserNurse
} from 'react-icons/fa';
import useSidebarLogic from '../../hooks/useSidebarLogic';
import './Sidebar.css';

const CustomSidebar = () => {
  const {
    collapsed, isAuthenticated, handleLogout,
    toggleSidebar, navigate
  } = useSidebarLogic();

  return (
    <div className="sidebar-container h-screen overflow-hidden">
      <Sidebar
        collapsed={collapsed}
        className="h-full !border-none !shadow-none overflow-hidden transition-colors duration-300 bg-[var(--light-color)]"
      >
        {/* Logo */}
        <div
          className="relative flex items-center justify-between transition-colors duration-300"
          style={{
            backgroundColor: 'var(--main-color)',
          }}
        >
          <h1
            className={`glow-text animate-glow font-bold tracking-wider text-white transition-all duration-300 ${
              collapsed ? 'text-base text-center w-full py-5' : 'text-2xl p-4'
            }`}
          >
            Emergency
          </h1>

          {!collapsed && (
            <FaBars
              className="cursor-pointer text-white text-xl mr-4"
              onClick={toggleSidebar}
            />
          )}
        </div>

        {/* Menu */}
        <Menu
          className="px-2 py-2 overflow-hidden"
          menuItemStyles={{
            button: {
              color: 'var(--text-color)',
              backgroundColor: 'transparent',
              opacity: 1, // Set to 1 to remove opacity
              transition: 'all 0.3s ease',
              borderRadius: '8px',
              marginBottom: '4px',
              '&:hover': {
                backgroundColor: 'var(--background-color)',
                opacity: 1,
              },
            },
            label: { color: 'var(--text-color)' },
            icon: { color: 'var(--text-color)', fontSize: '1.2rem' },
            subMenuContent: {
              backgroundColor: 'var(--light-color)',
              padding: '0px',
              borderRadius: '6px',
              transition: 'background-color 0.3s ease',
              '& .ps-menuitem-root': {
                borderRadius: '6px',
                marginBottom: '4px',
                color: 'var(--text-color)',
                transition: 'background-color 0.3s ease, color 0.3s ease',
              },
              '& .ps-menuitem-root:hover': {
                backgroundColor: 'var(--main-color)',
                color: '#fff',
              },
              '& .ps-menuitem-root:hover svg': {
                color: '#fff',
              },
            },
          }}
        >
          {collapsed && (
            <MenuItem icon={<FaBars />} onClick={toggleSidebar} />
          )}

          {/* Dashboard & Users */}
          <div className="space-y-1 mb-3 pb-3 border-b border-[var(--background-color)] border-opacity-20">
            <MenuItem icon={<FaHome />} onClick={() => navigate('/')}>
              Dashboard
            </MenuItem>
            <MenuItem icon={<FaUsers />} onClick={() => navigate('/users')}>
              Users
            </MenuItem>
          </div>

          {/* Emergency Section */}
          <div className="space-y-1 mb-3 pb-3 border-b border-[var(--background-color)] border-opacity-20">
            <SubMenu label="Emergency" icon={<FaAmbulance />}>
              <MenuItem icon={<FaUserMd />} onClick={() => navigate('/doctors')}>
                Doctors
              </MenuItem>
              <MenuItem icon={<FaProcedures />} onClick={() => navigate('/patients')}>
                Patients
              </MenuItem>
              <MenuItem icon={<FaNotesMedical />} onClick={() => navigate('/cases')}>
                Cases
              </MenuItem>
              <MenuItem icon={<FaBed />} onClick={() => navigate('/beds')}>
                Beds
              </MenuItem>
              <MenuItem icon={<FaUserNurse />} onClick={() => navigate('/nurses')}>
                Nurses
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<FaChartBar />} onClick={() => navigate('/analytics')}>
              Analytics
            </MenuItem>
          </div>

          {/* Administration */}
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
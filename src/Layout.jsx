// src/Layout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';

function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (fixed height full) */}
      <Sidebar />

      {/* Main content (Navbar + Content + Footer) */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5 bg-gray-100">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Layout;

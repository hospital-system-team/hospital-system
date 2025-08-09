import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import {
  FiSearch,
  FiBell,
  FiSun,
  FiMoon,
  FiX,
  FiUser,
} from 'react-icons/fi';

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="Navbar w-full px-4 sm:px-8 h-16 flex items-center justify-between bg-[var(--main-color)] text-[var(--text-color)] shadow-md transition-colors duration-300 z-50 relative">
      
      {/*  Search Input */}
      <div className="flex items-center gap-3 w-full">
        {/* Mobile Search Toggle */}
        <div className="sm:hidden">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="iconsNav text-2xl transition duration-150 relative z-50"
          >
            {showSearch ? <FiX /> : <FiSearch />}
          </button>
        </div>

        {/* Mobile Search Input */}
        {showSearch && (
          <div className="sm:hidden absolute left-0 top-full w-full bg-white p-3 z-40 shadow">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                ref={searchRef}
                className="w-full pl-10 pr-4 py-2 rounded border outline-none text-black"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        )}

        {/* Desktop Search Input */}
        <div className="hidden sm:block w-[250px] relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded bg-white text-black outline-none"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4 relative">

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="iconsNav text-2xl"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

        {/* Notifications Icon */}
        <div className="relative">
          <button className="iconsNav text-2xl relative">
            <FiBell />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full leading-none">
              0
            </span>
          </button>
        </div>

        {/* Login Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="iconsNav text-2xl"
          >
            <FiUser />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-[var(--text-color)] rounded shadow-md z-50">
              <ul className="py-2">

                <li className="px-4 py-2 cursor-pointer hover:bg-[var(--background-color)] hover:text-[var(--main-color)]">
                  Settings
                </li>
                <li className="px-4 py-2 cursor-pointer hover:bg-[var(--background-color)] hover:text-[var(--main-color)]">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

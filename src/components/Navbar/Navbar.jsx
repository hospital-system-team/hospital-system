import React from 'react';
import {
  FiSearch,
  FiBell,
  FiSun,
  FiMoon,
  FiX,
  FiUser,
} from 'react-icons/fi';
import useNavbarLogic from '../../hooks/useNavbarLogic';
import './Navbar.css';

function Navbar() {
  const {
    darkMode,
    setDarkMode,
    showSearch,
    setShowSearch,
    showDropdown,
    setShowDropdown,
    query,
    setQuery,
    suggestions,
    handleSelect,
    searchRef,
    dropdownRef,
    handleLogout
  } = useNavbarLogic();

  return (
    <nav className="Navbar w-full px-4 sm:px-8 h-16 flex items-center justify-between 
                    bg-[var(--main-color)] text-[var(--text-color)] shadow-md 
                    transition-colors duration-300 z-50 relative">

      <div className="flex items-center gap-3 w-full">
        <div className="sm:hidden">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="iconsNav text-2xl transition duration-150 relative z-50"
          >
            {showSearch ? <FiX /> : <FiSearch />}
          </button>
        </div>

        {showSearch && (
          <div className="sm:hidden absolute left-0 top-full w-full bg-[var(--light-color)] 
                          p-3 z-40 shadow">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                ref={searchRef}
                className="w-full pl-10 pr-4 py-2 rounded border outline-none 
                           bg-[var(--light-color)] text-[var(--text-color)]"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              {suggestions.length > 0 && (
                <ul className="absolute left-0 top-full w-full bg-[var(--light-color)] rounded shadow mt-1 z-50 border-0">
                  {suggestions.map((page, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-[var(--background-color)] cursor-pointer"
                      onClick={() => handleSelect(page.path)}
                    >
                      {page.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        <div className="hidden sm:block w-[250px] relative">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded bg-[var(--light-color)] text-[var(--text-color)] outline-none"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          {suggestions.length > 0 && (
            <ul className="absolute left-0 top-full w-full bg-[var(--light-color)] rounded shadow mt-1 z-50 border-0">
              {suggestions.map((page, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-[var(--background-color)] cursor-pointer"
                  onClick={() => handleSelect(page.path)}
                >
                  {page.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="iconsNav text-2xl"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>

        <div className="relative">
          <button className="iconsNav text-2xl relative">
            <FiBell />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full leading-none">
              0
            </span>
          </button>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="iconsNav text-2xl"
          >
            <FiUser />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-[var(--light-color)] text-[var(--text-color)] rounded shadow-md z-50">
              <ul className="py-2">
                <li className="px-4 py-2 cursor-pointer hover:bg-[var(--background-color)] hover:text-[var(--main-color)]">
                  Settings
                </li>
                <li
                  onClick={handleLogout}
                  className="px-4 py-2 cursor-pointer hover:bg-[var(--background-color)] hover:text-[var(--main-color)]"
                >
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

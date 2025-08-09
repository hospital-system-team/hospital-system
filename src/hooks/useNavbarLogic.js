import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useNavbarLogic() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Cases', path: '/cases' },
    { name: 'Nurses', path: '/nurses' },
    { name: 'Beds', path: '/beds' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Patients', path: '/patients' },
  ];

  // Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search filter
  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
    } else {
      const filtered = pages.filter((page) =>
        page.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    }
  }, [query]);

  const handleSelect = (path) => {
    navigate(path);
    setQuery('');
    setSuggestions([]);
    setShowSearch(false);
  };

  return {
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
  };
}

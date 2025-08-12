import React from 'react';

function Footer() {
  return (
    <footer
      className="text-center text-sm py-3 mt-10 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--main-color)',
        color: 'var(--light-color)',
      }}
    >
      © 2025 Hospital Management System. All rights reserved.
    </footer>
  );
}

export default Footer;

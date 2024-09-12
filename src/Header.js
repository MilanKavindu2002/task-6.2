import React from 'react';

const Header = ({ onLogin, onPost }) => (
  <header className="header-bar">
    <div className="header-content">
      <h1>DEV@Deakin</h1>
      <input type="text" className="search-bar" placeholder="Search..." />
      <nav className="nav-links">
        <a href="#" onClick={(e) => { e.preventDefault(); onLogin(); }}>Login</a>
        <a href="#" onClick={(e) => { e.preventDefault(); onPost(); }}>Post</a> {/* Add this */}
      </nav>
    </div>
  </header>
);

export default Header;

import React from 'react';

const Header = ({ user, onLogin, onLogout, onPost }) => {
  return (
    <header className="header-bar">
      <div className="header-content">
        <h1>DEV@Deakin</h1>
        <input type="text" className="search-bar" placeholder="Search..." />
        <nav className="nav-links">
          {/* Show 'Login' if no user is logged in, otherwise show 'Sign Out' */}
          {user ? (
            <>
              <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }}>
                Sign Out
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); onPost(); }}>
                Post
              </a>
            </>
          ) : (
            <>
              <a href="#" onClick={(e) => { e.preventDefault(); onLogin(); }}>
                Login
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); onPost(); }}>
                Post
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

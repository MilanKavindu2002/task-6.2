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
              <button onClick={onLogout}>Sign Out</button>
              <button onClick={onPost}>Post</button>
            </>
          ) : (
            <>
              <button onClick={onLogin}>Login</button>
              <button onClick={onPost}>Post</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

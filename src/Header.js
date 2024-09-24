import React from 'react';

const Header = ({ user, onLogin, onLogout, onPost, onFindQuestions }) => {
  return (
    <header className="header-bar">
      <div className="header-content">
        {/* Logo or title */}
        <h1>DEV@Deakin</h1>
        
        {/* Search bar */}
        <input type="text" className="search-bar" placeholder="Search..." />
        
        {/* Navigation buttons */}
        <nav className="nav-links">
          {user ? (
            <>
              <button onClick={onLogout}>Sign Out</button>
              <button onClick={onPost}>Post</button>
              <button onClick={onFindQuestions}>Find Questions</button>
            </>
          ) : (
            <>
              <button onClick={onLogin}>Login</button>
              <button onClick={onFindQuestions}>Find Questions</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

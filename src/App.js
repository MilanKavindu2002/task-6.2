import React, { useState } from 'react';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import HomePage from './HomePage';
import Header from './Header';
import SignOutPage from './SignOutPage';

const App = () => {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [justLoggedOut, setJustLoggedOut] = useState(false);

  const handleNavigate = (newPage) => {
    setPage(newPage);
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setJustLoggedOut(false);
    handleNavigate('home');
  };

  const handleLogout = () => {
    setUser(null);
    setJustLoggedOut(true);
    handleNavigate('login');
  };

  return (
    <div className="app-container">
      {/* Show Header only on the home page */}
      {page === 'home' && (
        <Header 
          user={user} 
          onLogin={() => handleNavigate('login')} 
          onLogout={handleLogout} 
          onPost={() => handleNavigate('post')} 
        />
      )}
      {page === 'login' && <LoginPage onNavigate={handleNavigate} setUser={handleLogin} justLoggedOut={justLoggedOut} />}
      {page === 'signup' && <SignUpPage onNavigate={handleNavigate} />}
      {page === 'signout' && <SignOutPage user={user} onLogout={handleLogout} onNavigate={handleNavigate} />}
      {page === 'home' && <HomePage />}
    </div>
  );
};

export default App;

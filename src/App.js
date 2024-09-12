import React, { useState } from 'react';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import HomePage from './HomePage';

const App = () => {
  const [page, setPage] = useState('home'); 
  const handleNavigate = (page) => {
    setPage(page);
  };

  return (
    <div className="app-container">
      {page === 'login' && <LoginPage onNavigate={handleNavigate} />}
      {page === 'signup' && <SignUpPage onNavigate={handleNavigate} />}
      {page === 'home' && <HomePage onLogin={() => handleNavigate('login')} />} {}
    </div>
  );
};

export default App;

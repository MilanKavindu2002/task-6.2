import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from './firebase';

const LoginPage = ({ onNavigate, setUser, justLoggedOut }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // Pass user info to App
      onNavigate('home'); // Redirect to home after login
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>

      {/* Show message if the user has just logged out */}
      {justLoggedOut ? (
        <p>
          You were logged in as <strong>{auth.currentUser?.email.split('@')[0]}</strong>. If you want to sign out, please click below.
          <button onClick={() => { setUser(null); onNavigate('login'); }}>
            Sign Out
          </button>
        </p>
      ) : (
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
        </form>
      )}

      {/* Sign up and back buttons */}
      <div className="button-container">
        <button onClick={() => onNavigate('signup')}>Sign Up</button>
        <button onClick={() => onNavigate('home')}>Back to Home</button>
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useState } from 'react';
import { auth, firestore, createUserWithEmailAndPassword, doc, setDoc } from './firebase';
import './styles.css'; 
const SignUpPage = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(firestore, 'users', user.uid), {
        name,
        lastName,
        email
      });

      onNavigate('login'); 
    } catch (err) {
      setError('Failed to create account');
    }
  };

  return (
    <div className="signup-page">
      <h2>Create a DEV@Deakin Account</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <div className="button-container">
        <button onClick={() => onNavigate('login')} className="nav-button">
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;

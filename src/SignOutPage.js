import React from 'react';

const SignOutPage = ({ user, onLogout }) => {
  return (
    <div className="signout-page">
      <h2>User Information</h2>
      <p>First Name: {user?.email.split('@')[0]}</p>
      <p>Last Name: Placeholder</p>
      <p>Email: {user?.email}</p>
      <button onClick={onLogout}>Sign Out</button>
    </div>
  );
};

export default SignOutPage;

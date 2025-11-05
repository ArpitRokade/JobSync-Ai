import React, { useState } from 'react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload/popup

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Add your signup logic here (API call, validation, etc)
    console.log('Signup submitted:', { email, password });
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label><br />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        /><br /><br />

        <label>Password:</label><br />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        /><br /><br />

        <label>Confirm Password:</label><br />
        <input 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
        /><br /><br />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://healthbridge-backend-mmfn.onrender.com/api/auth/register', {
        name,
        role,
        email,
        password
      });

      alert('Registered successfully! Please login.');
      navigate('/');
    } catch (err) {
      alert('Registration failed.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Register</h2>

      <form onSubmit={handleRegister} autoComplete="off">
        {/* Fake invisible fields to prevent browser autofill */}
        <input type="text" name="fake-user" autoComplete="off" style={{ display: 'none' }} />
        <input type="password" name="fake-pass" autoComplete="new-password" style={{ display: 'none' }} />

        {/* Actual Fields */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        /><br /><br />

        <input
          type="email"
          name="username"
          autoComplete="username"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br /><br />

        <input
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /><br /><br />

        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="learner">Yoga Learner</option>
          <option value="instructor">Yoga Instructor</option>
        </select><br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

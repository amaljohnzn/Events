import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveUser } from '../redux/features/userSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = async () => {
    const formData = { email, password };

    // Single login endpoint
    const loginUrl = 'http://localhost:4007/api/user/login'; // Update with your env variable if needed

    try {
      const response = await axios.post(loginUrl, formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // if cookies/session are used
      });

      const { token, user } = response.data;

      if (!user || !token) {
        setError('Invalid login response from server.');
        return;
      }

      // Save token and user info
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(saveUser(user));

      alert('Login successful!');

      // Navigate based on role
      if (user.role === 'admin') navigate('/admin-dashboard');
      else navigate('/user-dashboard');

    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin();
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4">Login</h2>
      <Form onSubmit={handleSubmit} className="p-3 shadow-sm rounded bg-light">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>

        <div className="text-center mt-3">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </Form>
    </Container>
  );
}

export default Login;

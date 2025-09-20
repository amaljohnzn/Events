import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const userSignUp = async () => {
    const formData = { name, email, password, role };
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/user/register`,
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      return response.data;
    } catch (error) {
      console.error('Axios Error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userSignUp();
      console.log('Response from server:', res);
      alert('Sign-up successful!');
      navigate('/login');
    } catch (err) {
      console.error('Error during sign-up:', err);
      const message = err.response?.data?.message || 'Sign-up failed. Please try again.';
      alert(message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="shadow-sm p-4" style={{ width: '100%', maxWidth: '420px', borderRadius: '10px' }}>
        <h2 className="text-center mb-4">Create Account</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </Form.Group>

          <Form.Group controlId="formRole" className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">-- Select a Role --</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Sign up
          </Button>

          <div className="text-center">
            <small>
              Already have an account? <Link to="/login">Log In</Link>
            </small>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default Signup;

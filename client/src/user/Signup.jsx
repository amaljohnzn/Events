import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const userSignUp = async () => {
    const formData = { name, email, password, role };
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/user/register`, // Use environment variable for API URL
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Axios Error:', error);
      throw error;
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    userSignUp()
      .then((res) => {
        console.log('Response from server:', res);
        alert('Sign-up successful!');
        navigate("/");
      })
      .catch((err) => {
        console.error('Error during sign-up:', err);
        alert('Sign-up failed. Please try again.');
      });
  };

  return (
    <Container>
      <h2>Sign up</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">-- Select a Role --</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign up
        </Button>
        <div className="text-center">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </Form>
    </Container>
  );
}

export default Signup;

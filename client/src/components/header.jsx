import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/features/userSlice';
import axios from 'axios';
import { persistor } from '../redux/store';

function Header() {
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Call logout API (make sure your backend route is correct)
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/logout`,
        {},
        { withCredentials: true }
      );

      // Clear local storage, Redux, and persisted state
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      await persistor.purge();
      dispatch(clearUser());

      navigate('/login');
      alert('You have been logged out successfully!');
    } catch (error) {
      console.error('Error during logout:', error.response?.data || error.message);
      alert('Failed to logout. Please try again.');
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/">
          <strong>🎟 Event Management</strong>
        </Navbar.Brand>

        {/* Navbar Toggle (for mobile) */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Links */}
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            {userData.user?.role === 'admin' && (
              <Nav.Link as={Link} to="/admin-dashboard">Admin Dashboard</Nav.Link>
            )}
            {userData.user?.role === 'user' && (
              <Nav.Link as={Link} to="/events">User Dashboard</Nav.Link>
            )}
          </Nav>

          {/* Right-side: user or login */}
          {userData.user && Object.keys(userData.user).length > 0 ? (
            <div className="d-flex align-items-center ms-3">
              <span className="badge bg-success me-2">
                {userData.user.name}
              </span>
              <Button
                onClick={handleLogout}
                variant="outline-light"
                size="sm"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => navigate('/signup')}
              variant="warning"
              className="ms-3"
              size="sm"
            >
              Join us
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

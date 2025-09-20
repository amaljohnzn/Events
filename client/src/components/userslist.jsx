import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Spinner } from 'react-bootstrap';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get API base URL from environment
    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    // Fetch all users from the API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_BASE}/api/user/userslist`);
                setUsers(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users');
                setLoading(false);
            }
        };
        fetchUsers();
    }, [API_BASE]);

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" variant="primary" />
                <span className="ms-3">Loading...</span>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <div className="alert alert-danger">{error}</div>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h3>All Users</h3>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default UsersList;

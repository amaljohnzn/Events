import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/events/eventlist`);
        if (res.data?.eventList) {
          setEvents(res.data.eventList);
        } else {
          setError('No events found.');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch events.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [API_BASE]);

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await axios.delete(`${API_BASE}/api/events/delete/${eventId}`);
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (err) {
      setError('Error deleting event: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleUpdate = (eventId) => {
    navigate(`/events/update/${eventId}`); // make sure your route matches
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <span className="ms-2">Loading events...</span>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4 rounded-pill bg-black text-white p-2">
        Event Management
      </h1>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Time</th>
            <th>Venue</th>
            <th>Ticket Price</th>
            <th>Total Slots</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event._id}>
                <td>
                  <img
                    src={event.image}
                    alt={event.title}
                    style={{ width: '100px', height: '60px', objectFit: 'cover' }}
                  />
                </td>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.time}</td>
                <td>{event.venue}</td>
                <td>{event.ticketPrice}</td>
                <td>{event.totalSlots}</td>
                <td>
                  <Button
                    onClick={() => handleUpdate(event._id)}
                    variant="warning"
                    className="me-2"
                  >
                    Update
                  </Button>
                  <Button onClick={() => handleDelete(event._id)} variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No events available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default EventList;

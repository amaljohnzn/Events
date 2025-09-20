import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const EventUpdate = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    image: '', // now only URL
    ticketPrice: '',
    totalSlots: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Predefined times for selection
  const timeOptions = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/events/eventdetails/${eventId}`);
        const data = res.data?.eventDetails;

        if (data) {
          setEventData({
            title: data.name || '',
            description: data.description || '',
            date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
            time: data.time || '',
            venue: data.venue || '',
            image: data.image || '',
            ticketPrice: data.ticketPrice || '',
            totalSlots: data.totalSlots || ''
          });
        } else {
          setError('Event details not found.');
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to fetch event details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, API_BASE_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Only JSON now
      await axios.put(`${API_BASE_URL}/api/events/update/${eventId}`, eventData, {
        headers: { 'Content-Type': 'application/json' }
      });

      setSuccess(true);
      setLoading(false);

      setTimeout(() => navigate('/eventlist'), 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to update event.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <span className="ms-2">Loading event...</span>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Update Event</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Event updated successfully!</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Event Title</Form.Label>
          <Form.Control type="text" name="title" value={eventData.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={eventData.description} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="date" value={eventData.date} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Select name="time" value={eventData.time} onChange={handleChange} required>
            <option value="">Select time</option>
            {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Venue</Form.Label>
          <Form.Control type="text" name="venue" value={eventData.venue} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ticket Price</Form.Label>
          <Form.Control type="number" name="ticketPrice" value={eventData.ticketPrice} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Total Slots</Form.Label>
          <Form.Control type="number" name="totalSlots" value={eventData.totalSlots} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Event Image URL</Form.Label>
          <Form.Control type="text" name="image" value={eventData.image} onChange={handleChange} required />
          {eventData.image && (
            <img
              src={eventData.image}
              alt="Event"
              style={{ width: '120px', height: '70px', objectFit: 'cover', marginTop: '10px' }}
            />
          )}
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
          {loading ? 'Updating...' : 'Update Event'}
        </Button>
      </Form>
    </Container>
  );
};

export default EventUpdate;

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

const EventCreation = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [totalSlots, setTotalSlots] = useState('');
  const [venue, setVenue] = useState('');
  const [image, setImage] = useState(''); // URL string
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !description || !date || !time || !ticketPrice || !totalSlots || !venue || !image) {
      setError('All fields are required, including ticket price, total slots, and image URL!');
      return;
    }

    const eventData = { name, description, date, time, ticketPrice, totalSlots, venue, image };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/events/create`,
        eventData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.message === 'Event added successfully') {
        setSuccess(true);
        setName('');
        setDescription('');
        setDate('');
        setTime('');
        setTicketPrice('');
        setTotalSlots('');
        setVenue('');
        setImage('');
        setError(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
      setSuccess(false);
    }
  };

  return (
    <Container className="mt-3 mb-6" >
      <Row className="justify-content-center">
        <Col md={6}>
          <h3>Create an Event</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Event added successfully!</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDate" className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formTime" className="mb-3">
  <Form.Label>Time</Form.Label>
  <Form.Select
    value={time}
    onChange={(e) => setTime(e.target.value)}
  >
    <option value="">Select event time</option>
    <option value="09:00 AM">09:00 AM</option>
    <option value="10:00 AM">10:00 AM</option>
    <option value="11:00 AM">11:00 AM</option>
    <option value="12:00 PM">12:00 PM</option>
    <option value="01:00 PM">01:00 PM</option>
    <option value="02:00 PM">02:00 PM</option>
    <option value="03:00 PM">03:00 PM</option>
    <option value="04:00 PM">04:00 PM</option>
    <option value="05:00 PM">05:00 PM</option>
    <option value="06:00 PM">06:00 PM</option>
    <option value="07:00 PM">07:00 PM</option>
    <option value="08:00 PM">08:00 PM</option>
  </Form.Select>
</Form.Group>


            <Form.Group controlId="formTicketPrice" className="mb-3">
              <Form.Label>Ticket Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter ticket price"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formTotalSlots" className="mb-3">
              <Form.Label>Total Slots</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter total slots"
                value={totalSlots}
                onChange={(e) => setTotalSlots(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formVenue" className="mb-3">
              <Form.Label>Venue</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formImage" className="mb-3">
              <Form.Label>Event Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Create Event
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EventCreation;

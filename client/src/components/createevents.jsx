import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

const EventCreation = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [totalSlots, setTotalSlots] = useState('');
  const [venue, setVenue] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !date || !time || !ticketPrice || !totalSlots || !venue || !image) {
      setError('All fields are required!');
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
        setError(null);
        setName('');
        setDescription('');
        setDate('');
        setTime('');
        setTicketPrice('');
        setTotalSlots('');
        setVenue('');
        setImage('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
      setSuccess(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm p-4 border-0 rounded">
            <h3 className="mb-4 text-center">Create an Event</h3>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Event added successfully!</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formTime">
                    <Form.Label>Time</Form.Label>
                    <Form.Select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    >
                      <option value="">Select event time</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={`${i + 9}:00 ${i + 9 < 12 ? 'AM' : 'PM'}`}>
                          {i + 9}:00 {i + 9 < 12 ? 'AM' : 'PM'}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formTicketPrice">
                    <Form.Label>Ticket Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter ticket price"
                      value={ticketPrice}
                      onChange={(e) => setTicketPrice(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formTotalSlots">
                    <Form.Label>Total Slots</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter total slots"
                      value={totalSlots}
                      onChange={(e) => setTotalSlots(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="formVenue">
                <Form.Label>Venue</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formImage">
                <Form.Label>Event Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 py-2">
                Create Event
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EventCreation;

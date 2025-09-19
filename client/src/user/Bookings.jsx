import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Spinner, Alert, Button, Form } from "react-bootstrap";
import axios from "axios";

const BookingPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/events/eventdetails/${eventId}`);
        setEvent(res.data.eventDetails);
      } catch (err) {
        setError("Failed to fetch event.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId, API_BASE]);

  const handleBooking = async () => {
  try {
    const res = await axios.post(
      `${API_BASE}/api/bookings`,
      { eventId, tickets },
      { withCredentials: true } // <- this is required
    );

    navigate(`/payment/${res.data.booking._id}`);
  } catch (err) {
    setError(err.response?.data?.message || "Booking failed.");
  }
};


  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4 d-flex justify-content-center">
      {event && (
        <Card className="p-3 shadow-sm" style={{ width: "24rem" }}>
          <h3 className="mb-3">Book Tickets</h3>
          <p><strong>Event:</strong> {event.title}</p>
          <p><strong>Price per ticket:</strong> ₹{event.ticketPrice}</p>
          <p><strong>Available Slots:</strong> {event.totalSlots}</p>

          <Form.Group className="mb-3">
            <Form.Label>Select Tickets</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max={event.totalSlots}
              value={tickets}
              onChange={(e) => setTickets(Number(e.target.value))}
            />
          </Form.Group>

          <h5>Total: ₹{tickets * event.ticketPrice}</h5>

          <Button
            onClick={handleBooking}
            disabled={event.totalSlots === 0}
            variant="primary"
            className="w-100 mt-3"
          >
            {event.totalSlots === 0 ? "Sold Out" : "Proceed to Payment"}
          </Button>
        </Card>
      )}
    </Container>
  );
};

export default BookingPage;

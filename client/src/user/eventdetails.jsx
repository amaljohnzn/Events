import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Spinner, Alert, Button, Badge } from "react-bootstrap";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE_URL; // from .env

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        if (!eventId) throw new Error("Invalid event ID");

        const response = await fetch(`${API_BASE}/api/events/eventdetails/${eventId}`);
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

        const data = await response.json();
        setEvent(data.eventDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId, API_BASE]);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading event details...</p>
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
        <Card className="shadow-sm" style={{ width: "22rem" }}>
          <Card.Img
            variant="top"
            src={event.image}
            alt={`${event.title} Image`}
            style={{ height: "200px", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title className="mb-3">{event.title}</Card.Title>
            <Card.Text><strong>Description:</strong> {event.description}</Card.Text>
            <Card.Text><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</Card.Text>
            <Card.Text><strong>Time:</strong> {event.time}</Card.Text>
            <Card.Text><strong>Venue:</strong> {event.venue}</Card.Text>
            <Card.Text>
              <strong>Ticket Price:</strong> ₹{event.ticketPrice}
            </Card.Text>
            <Card.Text>
              <strong>Available Slots:</strong>{" "}
              {event.totalSlots > 0 ? (
                <Badge bg="success">{event.totalSlots} Available</Badge>
              ) : (
                <Badge bg="danger">Sold Out</Badge>
              )}
            </Card.Text>

           <Button
  onClick={() => navigate(`/booking/${event._id}`)} // ✅ navigate to booking page
  variant="primary"
  disabled={event.totalSlots === 0} // Disable if sold out
  className="w-100"
>
  {event.totalSlots === 0 ? "Sold Out" : "Book Now"}
</Button>

          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default EventDetails;

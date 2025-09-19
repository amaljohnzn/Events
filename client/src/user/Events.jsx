import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE_URL; // from .env

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/events/eventlist`)
      .then((res) => {
        setEvents(res.data.eventList || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch events");
        setLoading(false);
      });
  }, [API_BASE]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading events...</p>
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
      <h2 className="text-center mb-4 border border-dark rounded-pill bg-dark text-white py-2">
        Events List
      </h2>
      <Row className="g-4">
        {events.length > 0 ? (
          events.map((event) => (
            <Col md={6} lg={4} sm={12} key={event._id}>
              <Card className="shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={event.image}
                  alt={event.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text className="text-truncate" style={{ maxHeight: "60px" }}>
                    {event.description}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/api/events/eventdetails/${event._id}`)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No events available.</p>
        )}
      </Row>
    </Container>
  );
};

export default Events;

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
      .catch(() => {
        setError("Failed to fetch events");
        setLoading(false);
      });
  }, [API_BASE]);

  if (loading) {
    return (
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading events...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center shadow-sm rounded">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-5 fw-bold">
        <span className="px-4 py-2 rounded-pill bg-primary text-white shadow-sm">
          Events List
        </span>
      </h2>
      <Row className="g-4">
        {events.length > 0 ? (
          events.map((event) => (
            <Col md={6} lg={4} sm={12} key={event._id}>
              <Card className="shadow-sm h-100 border-0 rounded-3 hover-shadow">
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <Card.Img
                    variant="top"
                    src={event.image}
                    alt={event.title}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">{event.title}</Card.Title>
                  <Card.Text className="text-muted flex-grow-1">
                    {event.description.length > 100
                      ? event.description.substring(0, 100) + "..."
                      : event.description}
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="mt-auto w-100 rounded-pill"
                    onClick={() => navigate(`/api/events/eventdetails/${event._id}`)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center text-muted">No events available.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Events;

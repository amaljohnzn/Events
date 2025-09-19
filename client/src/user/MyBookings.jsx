import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Spinner, Alert, Badge } from "react-bootstrap";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token"); // assume JWT stored here
        const res = await axios.get(`${API_BASE}/api/bookings/mybookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data.bookings);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [API_BASE]);

  if (loading)
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
      </Container>
    );

  if (error)
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">My Bookings</h2>
      <Row>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Col md={6} lg={4} key={booking._id} className="mb-3">
              <Card className="shadow-sm">
                <Card.Img
                  variant="top"
                  src={booking.eventId.image}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{booking.eventId.title}</Card.Title>
                  <Card.Text>
                    <strong>Date:</strong> {new Date(booking.eventId.date).toLocaleDateString()} <br />
                    <strong>Time:</strong> {booking.eventId.time} <br />
                    <strong>Venue:</strong> {booking.eventId.venue} <br />
                    <strong>Tickets:</strong> {booking.ticketsBooked} <br />
                    <strong>Total:</strong> ₹{booking.totalAmount} <br />
                  </Card.Text>
                  <Badge bg={booking.paymentStatus === "completed" ? "success" : "warning"}>
                    {booking.paymentStatus.toUpperCase()}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No bookings yet.</p>
        )}
      </Row>
    </Container>
  );
};

export default MyBookings;

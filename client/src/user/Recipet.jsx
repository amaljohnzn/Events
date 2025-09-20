import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import "./Ticket.css"; // custom CSS for ticket look

const ReceiptPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/bookings/${bookingId}`, {
          withCredentials: true,
        });
        setBooking(res.data.booking);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch booking");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, API_BASE]);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4 text-center">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={() => navigate("/events")}>Back to Events</Button>
      </Container>
    );
  }

  if (!booking) {
    return (
      <Container className="mt-4 text-center">
        <h3>Booking not found</h3>
        <Button onClick={() => navigate("/events")}>Back to Events</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card className="ticket-card">
        {/* Header */}
        <div className="ticket-header">
          <h3>🎟 Booking Receipt</h3>
          <p>Your Digital Ticket</p>
        </div>

        {/* Body */}
        <div className="ticket-body">
          <p>
            <strong>Booking ID:</strong> {booking._id}
          </p>
          <p>
            <strong>Event:</strong> {booking.eventId?.name}
          </p>
          <p>
            <strong>Date & Time:</strong> {booking.eventId?.date}{" "}
            {booking.eventId?.time}
          </p>
          <p>
            <strong>Tickets:</strong> {booking.tickets}
          </p>
          <p className="text-success fw-bold">
            <strong>Total Paid:</strong> ${booking.totalAmount}
          </p>
        </div>

        {/* Separator */}
        <div className="ticket-separator"></div>

        {/* QR */}
        <div className="ticket-qr">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/10/25/qr-code-157182_1280.png"
            alt="QR Code"
            className="qr-img"
          />
          <p className="text-muted small">Scan at entry</p>
        </div>

        {/* Button */}
        <div className="text-center mt-3">
          <Button onClick={() => navigate("/events")} variant="primary">
            Back to Events
          </Button>
        </div>

        {/* Punch Holes */}
        <div className="ticket-hole left"></div>
        <div className="ticket-hole right"></div>
      </Card>
    </Container>
  );
};

export default ReceiptPage;

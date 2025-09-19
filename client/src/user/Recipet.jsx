import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const ReceiptPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Use your backend base URL from environment
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchBooking = async () => {
      console.log("Fetching booking for ID:", bookingId);
      try {
        const res = await axios.get(`${API_BASE}/api/bookings/${bookingId}`, {
          withCredentials: true, // only if backend uses cookies
        });
        console.log("Booking response:", res.data);
        setBooking(res.data.booking);
      } catch (err) {
        console.error("Error fetching booking:", err);
        setError(err.response?.data?.message || "Failed to fetch booking");
      } finally {
        setLoading(false);
        console.log("Loading finished");
      }
    };

    fetchBooking();
  }, [bookingId, API_BASE]);

  if (loading) {
    console.log("Loading booking...");
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    console.log("Error state:", error);
    return (
      <Container className="mt-4 text-center">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={() => navigate("/events")}>Back to Events</Button>
      </Container>
    );
  }

  if (!booking) {
    console.log("Booking not found");
    return (
      <Container className="mt-4 text-center">
        <h3>Booking not found</h3>
        <Button onClick={() => navigate("/events")}>Back to Events</Button>
      </Container>
    );
  }

  console.log("Rendering booking:", booking);

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card className="shadow-sm p-4" style={{ width: "28rem" }}>
        <h3 className="mb-3 text-center">Booking Receipt</h3>

        <p><strong>Booking ID:</strong> {booking._id}</p>
        <p><strong>Event:</strong> {booking.eventId?.name}</p>
        <p><strong>Date & Time:</strong> {booking.eventId?.date} {booking.eventId?.time}</p>
        <p><strong>Tickets:</strong> {booking.tickets}</p>
        <p><strong>Total Paid:</strong> ${booking.totalAmount}</p>
        <p><strong>Status:</strong> {booking.status}</p>

        <div className="text-center mt-3">
          <Button onClick={() => navigate("/events")}>Back to Events</Button>
        </div>
      </Card>
    </Container>
  );
};

export default ReceiptPage;

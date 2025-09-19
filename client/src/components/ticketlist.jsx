import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Spinner, Alert } from "react-bootstrap";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const API_BASE = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        console.log("🔄 Fetching bookings from API...");
         const res = await axios.get(`${API_BASE}/api/bookings`);
        console.log("✅ Bookings API raw response:", res.data);
        // Always normalize backend response
        const normalized = res.data.bookings || [];
        console.log("📦 Normalized bookings array:", normalized);

        setBookings(normalized);
      } catch (err) {
        console.error("❌ Error fetching bookings:", err);
        setError(err.response?.data?.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    console.log("📊 Current bookings state:", bookings);
  }, [bookings]);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Loading bookings...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4 text-center">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">All Bookings</h2>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Booking ID</th>
            <th>Event</th>
            <th>Date</th>
            <th>Tickets</th>
            <th>Total Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => {
              console.log(`🔎 Rendering row ${index + 1}:`, booking);
              return (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking._id}</td>
                  <td>{booking.eventId?.name || booking.eventId?.title || "N/A"}</td>
                  <td>
                    {booking.eventId?.date || "—"} {booking.eventId?.time || ""}
                  </td>
                  <td>{booking.tickets}</td>
                  <td>₹{booking.totalAmount}</td>
                  <td>{booking.status}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AllBookings;

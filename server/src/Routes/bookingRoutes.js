// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const Booking = require("../Models/bookingModel"); // <-- import Booking model
const { getReceipt, createBooking } = require("../controllers/bookingController");

// Create booking
router.post("/", createBooking);

// Get booking receipt
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("eventId");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json({ booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("eventId"); 
    res.json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;

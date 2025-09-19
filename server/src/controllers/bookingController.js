const Booking = require("../Models/bookingModel");
const Event = require("../Models/eventModel");

// Create Booking
exports.createBooking = async (req, res) => {
  try {
    const { eventId, tickets } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.totalSlots < tickets) {
      return res.status(400).json({ message: "Not enough slots available" });
    }

    // Create booking
    const booking = new Booking({
      userId: req.user?._id || "guest", // or get from auth
      eventId,
      tickets,
      totalAmount: tickets * event.ticketPrice,
      status: "PENDING",
    });
    await booking.save();

    // Reduce slots
    event.totalSlots -= tickets;
    await event.save();

    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// controllers/bookingController.js
exports.getReceipt = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId).populate(
      "eventId",
      "name date time venue ticketPrice"
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // You can customize the receipt data
    const receipt = {
      bookingId: booking._id,
      eventName: booking.eventId.name,
      eventDate: booking.eventId.date,
      eventTime: booking.eventId.time,
      venue: booking.eventId.venue,
      tickets: booking.tickets,
      totalAmount: booking.totalAmount,
      status: booking.status,
      bookedAt: booking.bookedAt,
    };

    res.status(200).json({ receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

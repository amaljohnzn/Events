const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
//  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  tickets: { type: Number, required: true, min: 1 },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["PENDING", "PAID", "CANCELLED"], default: "PENDING" },
  bookedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);


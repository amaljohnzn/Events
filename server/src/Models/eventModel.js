const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
      name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },

    ticketPrice: { type: Number, required: true, min: 0 },
    totalSlots: { type: Number, required: true, min: 0 },

    // Track how many slots are already booked
    bookedSlots: { type: Number, default: 0 },

    venue: { type: String, required: true },
    image: { type: String, required: true }, // Image URL

    // Optional: status field (good for admin control)
    status: { 
      type: String, 
      enum: ["ACTIVE", "CANCELLED", "COMPLETED"], 
      default: "ACTIVE" 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);


const mongoose = require("mongoose");

const eventDb = require('../Models/eventModel'); // Adjust path

// Create new event
const create = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log incoming data

    const { name, description, date, time, ticketPrice, totalSlots, venue, image } = req.body;

    // Validate required fields
    if (!name || !description || !date || !time || !ticketPrice || !totalSlots || !venue || !image) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({ message: "All fields including image URL are required" });
    }

    const newEvent = new eventDb({
      name,
      description,
      date,
      time,
      ticketPrice,
      totalSlots,
      venue,
      image, // store direct URL
    });

    console.log("Saving new event to DB...");
    const savedEvent = await newEvent.save();
    console.log("Event saved successfully:", savedEvent);

    return res.status(200).json({ message: "Event added successfully", savedEvent });

  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// List all events
const listEvents = async (req, res) => {
  try {
    console.log("Fetching all events from DB...");
    const eventList = await eventDb.find();
    console.log("Event list retrieved:", eventList);

    if (!eventList.length) {
      console.log("No events found in DB");
      return res.status(404).json({ message: "No events found" });
    }

    res.status(200).json({ message: "Events retrieved successfully", eventList });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get event details by ID
const eventsDetails = async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid Event ID format" });
    }

    const eventDetails = await eventDb.findById(eventId);
    if (!eventDetails) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event retrieved successfully", eventDetails });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { name, description, date, time, ticketPrice, totalSlots, venue, image } = req.body;

    const isEventExist = await eventDb.findById(eventId);
    if (!isEventExist) {
      return res.status(404).json({ message: "Event not found" });
    }

    const updatedEvent = await eventDb.findByIdAndUpdate(
      eventId,
      { name, description, date, time, ticketPrice, totalSlots, venue, image },
      { new: true }
    );

    res.status(200).json({ message: "Event updated successfully", updatedEvent });
  } catch (error) {
    console.error("Server error:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }

    const deletedEvent = await eventDb.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json({ message: "Event deleted successfully", deletedEvent });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  create,
  listEvents,
  eventsDetails,
  updateEvent,
  deleteEvent
};

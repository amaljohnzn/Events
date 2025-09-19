const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../Models/userModel');
const Admin = require('../Models/adminModel');

// User authentication
exports.authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "You must be logged in" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(404).json({ message: "User not found" });

    next();
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Admin authentication
exports.authAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "You must be logged in" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id);
    if (!req.admin) return res.status(404).json({ message: "Admin not found" });

    next();
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.admin.role !== 'admin') return res.status(403).json({ message: "Access denied" });
  next();
};

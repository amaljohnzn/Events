const jwt = require('jsonwebtoken')
// const bcrypyt = require('bcryptjs')
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config()
const userDb = require('../Models/userModel')

// Register
exports.register = async (req, res) => {
    try {
        let { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        email = email.toLowerCase();

        const userExists = await userDb.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already exists" });
        }


        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userDb({ name, email, password: hashedPassword, role });
        await newUser.save();

        const { password: _, ...safeUser } = newUser._doc;
        return res.status(200).json({ message: "User registered", data: safeUser });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Login
exports.login = async (req, res) => {
  try {
    console.log("Login request body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Email or password missing");
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase();
    console.log("Normalized email:", normalizedEmail);

    const userExist = await userDb.findOne({ email: normalizedEmail });
    console.log("User found in DB:", userExist);

    if (!userExist) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("Password incorrect");
      return res.status(401).json({ message: "Password incorrect" });
    }

    if (!process.env.JWT_secret) {
      console.log("JWT secret missing");
      throw new Error("JWT secret is not defined");
    }

    // Create JWT including role
    const token = jwt.sign(
      { id: userExist._id, email: userExist.email, role: userExist.role },
      process.env.JWT_secret,
      { expiresIn: '7d' }
    );
    console.log("JWT created:", token);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    console.log("Cookie set");

    const { password: _, ...safeUser } = userExist._doc;

    console.log("Returning response with user data:", safeUser);

    return res.status(200).json({
      message: "Logged in successfully",
      user: safeUser,
      token
    });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userDb.find(); // Get all users from the database
        return res.status(200).json({ message: "Users retrieved successfully", data: users });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}


// Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params; // or req.body if you send the userId in the body
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId' });
          }

        // Fetch the user details from the database
        const user = await userDb.findById(userId).select('-password'); // Exclude password from the response

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User profile fetched successfully', user });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error.message); 
        res.status(500).json({ message: "Server error", error: error.message });
    }
};




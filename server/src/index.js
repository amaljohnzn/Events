const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../src/config/db');
const userRoute = require('../src/Routes/userroute');
const adminRoute = require('../src/Routes/adminroute');
const eventRoute = require('../src/Routes/eventRoute');
const bookings = require('../src/Routes/bookingRoutes');

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

// ✅ Debug CORS middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || "https://events-pearl.vercel.app",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("CORS origin:", origin); // <-- log incoming origin
    if (!origin || allowedOrigins.includes(origin)) {
      console.log("Origin allowed");
      callback(null, true);
    } else {
      console.log("Origin blocked:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/events', eventRoute);
app.use('/api/bookings', bookings);

app.get('/', (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

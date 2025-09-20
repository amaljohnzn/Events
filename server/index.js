const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const userRoute = require('./src/Routes/userroute');
const adminRoute = require('./src/Routes/adminroute');
const eventRoute = require('./src/Routes/eventRoute');
const bookings = require('./src/Routes/bookingRoutes');

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL, // Allow only your frontend
  credentials: true, // Allow cookies (important for JWT)
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));

// ✅ Handle preflight requests properly
app.options("*", cors());





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

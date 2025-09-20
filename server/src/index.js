const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const dotenv = require('dotenv');
const connectDB = require('../src/config/db');
const userRoute = require('../src/Routes/userroute');
const adminRoute = require('../src/Routes/adminroute');
const eventRoute = require('../src/Routes/eventRoute');
const bookings = require('../src/Routes/bookingRoutes');

dotenv.config(); // Load environment variables
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

// ✅ Allow multiple origins dynamically
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));



app.get('/', (req, res) => {
    res.send("Welcome to my pages");
});

app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/events', eventRoute);
app.use('/api/bookings', bookings);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


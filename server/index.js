const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const userRoute = require('./src/Routes/userroute');
const adminRoute = require('./src/Routes/adminroute');
const eventRoute = require('./src/Routes/eventRoute');
const ticketRoute = require('./src/Routes/ticketroute');
const paymentRoute = require('./src/Routes/paymentRoute');

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}));

app.get('/', (req, res) => {
    res.send("Welcome");
});

app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/events', eventRoute);
app.use('/api/tickets', ticketRoute);
app.use('/api/payment', paymentRoute);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
    module.exports = app; // For Vercel
} else {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

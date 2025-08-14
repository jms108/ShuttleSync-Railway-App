const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');
const TrainRouter = require('./routes/TrainRouter');
const BookingRouter = require('./routes/BookingRouter');
const PaymentRouter = require('./routes/PaymentRouter');

require('dotenv').config();
require('./db');
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});


app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use(bodyParser.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/auth', AuthRouter);
app.use('/trains', TrainRouter);
app.use('/bookings', BookingRouter);
app.use('/payments', PaymentRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
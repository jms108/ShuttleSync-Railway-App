const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    train: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trains',
        required: true
    },
    passengers: [{
        name: String,
        age: Number,
        gender: String
    }],
    journeyDate: {
        type: Date,
        required: true
    },
    totalFare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const BookingModel = mongoose.model('bookings', BookingSchema);
module.exports = BookingModel;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookings',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },
    paymentDetails: {
        type: Object
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const PaymentModel = mongoose.model('payments', PaymentSchema);
module.exports = PaymentModel;
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const TrainSchema = new Schema({
//     trainNumber: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     from: {
//         type: String,
//         required: true
//     },
//     to: {
//         type: String,
//         required: true
//     },
//     departure: {
//         type: Date,
//         required: true
//     },
//     arrival: {
//         type: Date,
//         required: true
//     },
//     class: {  // Add this new field
//         type: String,
//         enum: ['AC', 'Shovan', 'Shulov', 'AC Chair'],
//         required: true
//     },
//     seatsAvailable: {
//         type: Number,
//         required: true
//     },
//     fare: {
//         type: Number,
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ['active', 'inactive', 'cancelled'],
//         default: 'active'
//     }
// });

// const TrainModel = mongoose.model('trains', TrainSchema);
// module.exports = TrainModel;








const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrainSchema = new Schema({
    trainNumber: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    departure: {
        type: String,  // Changed from Date to String
        required: true
    },
    arrival: {
        type: String,  // Changed from Date to String
        required: true
    },
    class: {
        type: String,
        enum: ['AC', 'Shovan', 'Shulov', 'AC Chair'],
        required: true
    },
    seatsAvailable: {
        type: Number,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'cancelled'],
        default: 'active'
    },
    isShuttle: {
        type: Boolean,
        default: false
    }
});

const TrainModel = mongoose.model('trains', TrainSchema);
module.exports = TrainModel;
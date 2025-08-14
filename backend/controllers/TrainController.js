// const TrainModel = require('../models/Train');


// const searchTrains = async (req, res) => {
//     try {
//         const { from, to, date, class: trainClass } = req.query;
        
//         const query = {
//             from: new RegExp(from, 'i'),
//             to: new RegExp(to, 'i'),
//             class: trainClass,  // Add class to query
//             departure: {
//                 $gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
//                 $lte: new Date(new Date(date).setHours(23, 59, 59, 999))
//             },
//             status: 'active',
//             seatsAvailable: { $gt: 0 }
//         };

//         const trains = await TrainModel.find(query).sort({ departure: 1 });
        
//         res.status(200).json({
//             success: true,
//             data: trains
//         });
//     } catch (err) {
//         console.error("Search error:", err);
//         res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// };

// const getTrainDetails = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const train = await TrainModel.findById(id);
        
//         if (!train) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Train not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             data: train
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// };

// module.exports = {
//     searchTrains,
//     getTrainDetails
// }; 













const TrainModel = require('../models/Train');

const searchTrains = async (req, res) => {
    try {
        const { from, to, class: trainClass } = req.query;
        
        const query = {
            from: new RegExp(from, 'i'),
            to: new RegExp(to, 'i'),
            class: trainClass,
            status: 'active',
            seatsAvailable: { $gt: 0 }
        };

        const trains = await TrainModel.find(query).sort({ departure: 1 });
        
        res.status(200).json({
            success: true,
            data: trains
        });
    } catch (err) {
        console.error("Search error:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getTrainDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const train = await TrainModel.findById(id);
        
        if (!train) {
            return res.status(404).json({
                success: false,
                message: "Train not found"
            });
        }

        res.status(200).json({
            success: true,
            data: train
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    searchTrains,
    getTrainDetails
};
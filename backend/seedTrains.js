// require('dotenv').config();
// const mongoose = require('mongoose');
// const TrainModel = require('./models/Train');

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/railway-booking')
//   .then(() => {
//     console.log('Connected to MongoDB for seeding...');
//     seedData();
//   })
//   .catch(err => console.error('MongoDB connection error:', err));

// async function seedData() {
//   try {
//     // Clear existing data
//     await TrainModel.deleteMany({});
//     console.log('Cleared existing train data');

//     // Get current date
//     const now = new Date();
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
//     // Sample stations
//     const stations = ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet'];
    
//     // Train classes with base fare multipliers
//     const trainClasses = [
//       { name: 'Shovan', multiplier: 1.0 },
//       { name: 'Shulov', multiplier: 1.2 },
//       { name: 'AC Chair', multiplier: 1.5 },
//       { name: 'AC', multiplier: 2.0 }
//     ];
    
//     // Generate trains for next 7 days
//     const trains = [];
    
//     for (let day = 0; day < 7; day++) {
//       const currentDate = new Date(today);
//       currentDate.setDate(today.getDate() + day);
      
//       // Create 3 trains per day
//       for (let i = 0; i < 3; i++) {
//         const from = stations[Math.floor(Math.random() * stations.length)];
//         let to;
//         do {
//           to = stations[Math.floor(Math.random() * stations.length)];
//         } while (to === from);
        
//         const departureHour = 6 + Math.floor(Math.random() * 10); // Between 6AM and 4PM
//         const durationHours = 4 + Math.floor(Math.random() * 4); // 4-8 hour trips
//         const trainClass = trainClasses[Math.floor(Math.random() * trainClasses.length)];
//         const baseFare = 300 + Math.floor(Math.random() * 400); // 300-700 BDT base fare
        
//         trains.push({
//           trainNumber: `T-${day}${i}${Math.floor(Math.random() * 10)}`,
//           name: `${['Express', 'Mail', 'Commuter', 'Intercity'][i % 4]} ${from}-${to}`,
//           from,
//           to,
//           class: trainClass.name,
//           departure: new Date(
//             currentDate.getFullYear(),
//             currentDate.getMonth(),
//             currentDate.getDate(),
//             departureHour,
//             Math.floor(Math.random() * 60),
//             0
//           ),
//           arrival: new Date(
//             currentDate.getFullYear(),
//             currentDate.getMonth(),
//             currentDate.getDate(),
//             departureHour + durationHours,
//             Math.floor(Math.random() * 60),
//             0
//           ),
//           seatsAvailable: 20 + Math.floor(Math.random() * 80), // 20-100 seats
//           fare: Math.round(baseFare * trainClass.multiplier), // Apply class multiplier
//           status: 'active'
//         });
//       }
//     }

//     // Insert all trains
//     await TrainModel.insertMany(trains);
//     console.log(`✅ Successfully seeded ${trains.length} trains`);
    
//     // Print sample of inserted trains
//     const sampleTrains = await TrainModel.find().limit(5);
//     console.log('Sample trains:');
//     sampleTrains.forEach(train => {
//       console.log({
//         name: train.name,
//         number: train.trainNumber,
//         route: `${train.from} → ${train.to}`,
//         class: train.class,
//         departure: train.departure.toLocaleString(),
//         seats: train.seatsAvailable,
//         fare: `৳${train.fare}`
//       });
//     });

//     process.exit(0);
//   } catch (err) {
//     console.error('Seeding error:', err);
//     process.exit(1);
//   }
// }




require('dotenv').config();
const mongoose = require('mongoose');
const TrainModel = require('./models/Train');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/railway-booking')
  .then(() => {
    console.log('Connected to MongoDB for seeding...');
    seedData();
  })
  .catch(err => console.error('MongoDB connection error:', err));

async function seedData() {
  try {
    // Clear existing data
    await TrainModel.deleteMany({});
    console.log('Cleared existing train data');

    // Define shuttle train schedules for one day with AM/PM format
    const trains = [
      // BotToli to Chittagong University
      {
        trainNumber: 'CU-BOT-0730-1',
        name: 'CU Shuttle Express (BotToli)',
        from: 'BotToli',
        to: 'Chittagong University',
        departure: '07:30 AM',
        arrival: '08:15 AM',
        class: 'Shovan',
        seatsAvailable: 150,
        fare: 20,
        status: 'active',
        isShuttle: true
      },
      {
        trainNumber: 'CU-BOT-0800-1',
        name: 'CU Shuttle Express (BotToli)',
        from: 'BotToli',
        to: 'Chittagong University',
        departure: '08:00 AM',
        arrival: '08:45 AM',
        class: 'Shovan',
        seatsAvailable: 150,
        fare: 20,
        status: 'active',
        isShuttle: true
      },
      {
        trainNumber: 'CU-BOT-0900-1',
        name: 'CU Shuttle Express (BotToli)',
        from: 'BotToli',
        to: 'Chittagong University',
        departure: '09:00 AM',
        arrival: '09:45 AM',
        class: 'Shovan',
        seatsAvailable: 150,
        fare: 20,
        status: 'active',
        isShuttle: true
      },
      {
        trainNumber: 'CU-BOT-0250-1',
        name: 'CU Shuttle Express (BotToli)',
        from: 'BotToli',
        to: 'Chittagong University',
        departure: '02:50 PM',
        arrival: '03:35 PM',
        class: 'Shovan',
        seatsAvailable: 150,
        fare: 20,
        status: 'active',
        isShuttle: true
      },
      {
        trainNumber: 'CU-BOT-0350-1',
        name: 'CU Shuttle Express (BotToli)',
        from: 'BotToli',
        to: 'Chittagong University',
        departure: '03:50 PM',
        arrival: '04:35 PM',
        class: 'Shovan',
        seatsAvailable: 150,
        fare: 20,
        status: 'active',
        isShuttle: true
      },
      {
        trainNumber: 'CU-BOT-0830-1',
        name: 'CU Shuttle Express (BotToli)',
        from: 'BotToli',
        to: 'Chittagong University',
        departure: '08:30 PM',
        arrival: '09:15 PM',
        class: 'Shovan',
        seatsAvailable: 150,
        fare: 20,
        status: 'active',
        isShuttle: true
      },

      // Sholoshahar to Chittagong University
      {
        trainNumber: 'CU-SHO-0945-1',
        name: 'CU Shuttle Express (Sholoshahar)',
        from: 'Sholoshahar',
        to: 'Chittagong University',
        departure: '09:45 AM',
        arrival: '10:30 AM',
        class: 'Shovan',
        seatsAvailable: 120,
        fare: 25,
        status: 'active',
        isShuttle: true
      },
      {
        trainNumber: 'CU-SHO-1030-1',
        name: 'CU Shuttle Express (Sholoshahar)',
        from: 'Sholoshahar',
        to: 'Chittagong University',
        departure: '10:30 AM',
        arrival: '11:15 AM',
        class: 'Shovan',
        seatsAvailable: 120,
        fare: 25,
        status: 'active',
        isShuttle: true
      },
      {
        trainNumber: 'CU-SHO-0130-1',
        name: 'CU Shuttle Express (Sholoshahar)',
        from: 'Sholoshahar',
        to: 'Chittagong University',
        departure: '01:30 PM',
        arrival: '02:15 PM',
        class: 'Shovan',
        seatsAvailable: 120,
        fare: 25,
        status: 'active',
        isShuttle: true
      },

      // Chittagong University to BotToli
      {
        trainNumber: 'CU-UNI-0845-1',
        name: 'CU Shuttle Express (Return - BotToli)',
        from: 'Chittagong University',
        to: 'BotToli',
        departure: '08:45 AM',
        arrival: '09:30 AM',
        class: 'Shovan',
        seatsAvailable: 150,
        fare: 20,
        status: 'active',
        isShuttle: true
      },
      {
        trainNumber: 'CU-UNI-0920-1',
        name: 'CU Shuttle Express (Return - BotToli)',
        from: 'Chittagong University',
        to: 'BotToli',
        departure: '09:20 AM',
        arrival: '10:05 AM',
        class: 'Shovan',
        seatsAvailable: 150,
        fare: 20,
        status: 'active',
        isShuttle: true
      },
      {
        trainNumber: 'CU-UNI-0400-1',
        name: 'CU Shuttle Express (Return - BotToli)',
        from: 'Chittagong University',
        to: 'BotToli',
        departure: '04:00 PM',
        arrival: '04:45 PM',
        class: 'Shovan',
        seatsAvailable: 150,
        fare: 20,
        status: 'active',
        isShuttle: true
      },
      {
        trainNumber: 'CU-UNI-0530-1',
        name: 'CU Shuttle Express (Return - BotToli)',
        from: 'Chittagong University',
        to: 'BotToli',
        departure: '05:30 PM',
        arrival: '06:15 PM',
        class: 'Shovan',
        seatsAvailable: 150,
        fare: 20,
        status: 'active',
        isShuttle: true
      },
      {
        trainNumber: 'CU-UNI-0930-1',
        name: 'CU Shuttle Express (Return - BotToli)',
        from: 'Chittagong University',
        to: 'BotToli',
        departure: '09:30 PM',
        arrival: '10:15 PM',
        class: 'Shovan',
        seatsAvailable: 150,
        fare: 20,
        status: 'active',
        isShuttle: true
      },

      // Additional routes (Chittagong University to Sholoshahar)
      {
        trainNumber: 'CU-UNI-0130-1',
        name: 'CU Shuttle Express (Return - Sholoshahar)',
        from: 'Chittagong University',
        to: 'Sholoshahar',
        departure: '01:30 PM',
        arrival: '02:15 PM',
        class: 'Shovan',
        seatsAvailable: 120,
        fare: 25,
        status: 'active',
        isShuttle: true
      },
      {
        trainNumber: 'CU-UNI-0230-1',
        name: 'CU Shuttle Express (Return - Sholoshahar)',
        from: 'Chittagong University',
        to: 'Sholoshahar',
        departure: '02:30 PM',
        arrival: '03:15 PM',
        class: 'Shovan',
        seatsAvailable: 120,
        fare: 25,
        status: 'active',
        isShuttle: true
      }
    ];

    // Insert all trains
    await TrainModel.insertMany(trains);
    console.log(` Successfully seeded ${trains.length} shuttle trains for today`);

    // Print sample of inserted trains
    const sampleTrains = await TrainModel.find().limit(5);
    console.log('Sample shuttle trains:');
    sampleTrains.forEach(train => {
      console.log({
        name: train.name,
        number: train.trainNumber,
        route: `${train.from} → ${train.to}`,
        departure: train.departure,
        arrival: train.arrival,
        seats: train.seatsAvailable,
        fare: `৳${train.fare}`
      });
    });

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}
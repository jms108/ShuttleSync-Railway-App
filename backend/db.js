require ('dotenv').config();
const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_URI || 'mongodb+srv://zainsaima418:MTUbQ3wtIBMW59nm@cluster0.t0hrjjo.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => {
        console.log('MongoDB Connection Error: ', err);
    });
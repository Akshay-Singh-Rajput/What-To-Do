const mongoose = require('mongoose');
const { setDatabaseStatus } = require('./dbConnectionStatus');
require('dotenv').config();
require('colors');

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        setDatabaseStatus(true);
        console.log('Successfully connected to database'.green.bold, conn.connection._connectionString);

    } catch (error) {
        console.log('database connection faild. exiting now...'.red.bold);
        console.log('err', error.message.red);
        setDatabaseStatus(false);
        process.exit(1);
    }
};

module.exports = connectDB;
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to DB ${con.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

const connectToMongo = async () => {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Database connected successfully");
        }).catch((err) => {
            console.log(err);
        })
}

module.exports = connectToMongo;
const mongoose = require('mongoose');
const config = require('../environment');

const connectToMongo = async () => {
    await mongoose.connect(config.mongoUri)
        .then(() => {
            console.log("Database connected successfully");
        }).catch((err) => {
            console.log(err);
        })
}

module.exports = connectToMongo;
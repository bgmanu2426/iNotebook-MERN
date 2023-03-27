const mongoose = require('mongoose');

const connectToMongo = async() => {
    await mongoose.connect('mongodb://localhost:27017/');
}
connectToMongo().catch(err => console.log(err));

module.exports = connectToMongo;


const mongoose = require('mongoose')

const UserModelSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: String,
    image: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
// Compile model from schema
const Users = mongoose.model('Users', UserModelSchema);


module.exports = Users
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    contact: {
        required: true,
        type: String
    },
    bloodgroup: {
        required: true,
        type: String
    },
    profileImage: {
        type: String, 
        default: "", 
    },
    profileImageID: {
        type: String, 
        default: "", 
    },
    lastdonatedate: {
        type: Date,
        default: "",
    },
    statusupdate: {
        type: String,
        default: 'active'
    }

})

module.exports = mongoose.model('Doner', dataSchema)
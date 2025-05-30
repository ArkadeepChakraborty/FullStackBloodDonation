const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    user_id: {
        required: true,
        type: String
    },
    donor_id: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type: String
    },
    request_date: {
        required: true,
        type: String
    },
})

module.exports = mongoose.model('Request', dataSchema)

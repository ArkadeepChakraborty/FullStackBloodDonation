const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    points: [{ type: String }],
});

module.exports = mongoose.model('About', aboutSchema);

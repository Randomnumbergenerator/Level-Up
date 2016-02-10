var mongoose = require('mongoose');

var listSchema = new mongoose.Schema({
    name: { type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    otherUser: { type: Array}
});

module.exports = mongoose.model('List', listSchema);

var mongoose = require('mongoose');




var listSchema = new mongoose.Schema({
    name: { type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});



module.exports = mongoose.model('List', listSchema);
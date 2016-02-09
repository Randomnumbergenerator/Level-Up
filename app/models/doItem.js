var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var User = require('../models/user');



var itemSchema = new mongoose.Schema({
    item: { type: String, required: true},
    points: {type: Number, required: true},
    done: { type: Boolean, default: false},
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

});



module.exports = mongoose.model('Item', itemSchema);

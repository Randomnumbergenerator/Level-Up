var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    item: { type: String, required: true},
    points: {type: Number, required: true},
    done: { type: Boolean, default: false},
    listId: {type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true}

});

module.exports = mongoose.model('Task', taskSchema);

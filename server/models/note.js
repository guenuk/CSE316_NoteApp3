var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NoteSchema = new Schema(
    {
        num: Number,
        text: String,
        lastUpdatedDate: String,
    }
);

module.exports = mongoose.model('Note', NoteSchema);
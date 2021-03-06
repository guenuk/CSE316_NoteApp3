var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NoteSchema = new Schema(
    {
        num: Number,
        text: String,
        lastUpdatedDate: String,
        user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    }
);

module.exports = mongoose.model('Note', NoteSchema);
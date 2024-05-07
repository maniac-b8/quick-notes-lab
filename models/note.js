const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    text: {
        type: String,
        minlength: 1,
        maxlength: 150,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);
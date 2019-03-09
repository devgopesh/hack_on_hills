const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MsgreqSchema = new Schema({
    senderId: String,
    receiverId: String,
    senderName: String,
    pendingStatus: {
        type: Boolean,
        default: true
    },
    chat: {
        type: Boolean,
        default: false
    }
});

const Msgreq = mongoose.model('msgrequests', MsgreqSchema);

module.exports = Msgreq;

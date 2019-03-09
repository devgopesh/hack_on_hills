const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
	senderId: String,
	receiverId: String,
	message: String,
	time : { 
		type : Date, 
		default: Date.now 
	}
});

const UserMessage = mongoose.model('usermessages', MessageSchema);
module.exports = UserMessage;
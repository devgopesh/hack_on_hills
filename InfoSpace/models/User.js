const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    username: String,
    roll: String,
    course: String,
    person: String,
    profession: String,
    passing: String,
    isVerified: {
    	type: Number,
    	default: 0
    },
    socketId: String
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
//The name, email, and password come from the React.js form. We fetch the avatar from gravatar based on email address.
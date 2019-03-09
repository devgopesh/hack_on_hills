const express = require('express'),
	  mongoose = require('mongoose'),
	  bodyParser = require('body-parser'),
	  passport = require('passport');

const users = require('./routes/user'); 

const app = express();
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);

app.get('/', (req, res) => {
	res.send('HI!');
});

const PORT = process.env.PORT || 5000;

server = app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

//Implementing sockets
var io = require('socket.io')(server)
var connectedUsers = [];	
io.on('connection', (socket) => {
	
	console.log(socket.id)
	
	//private chat implementation
	socket.on('NEW_USER', (user) => {		
		connectedUsers.push(user);
		console.log(connectedUsers)
	})

	socket.on('SEND_MESSAGE', (data) => {		
		var i = 1;
		connectedUsers.map(user => {
			if (user.userName === data.userName) {
				io.to(user.uId).emit('RECEIVE_MESSAGE', data)
				if(i == 1){
					io.to(socket.id).emit('RECEIVE_MESSAGE',data)
					i--;
				}
			}
		})		
	})

	socket.on('REMOVE_USER', (user) => {	
		connectedUsers.map((u,index) => {
			if (u.userName === user.userName && u.uId === user.uId) {
				return connectedUsers.splice(index, 1);
			}
		})
		console.log(connectedUsers)	
	})
	
	//rooms implementation
	socket.on('JOIN_ROOM', (room) => {				
		console.log(room)
		socket.join(room.roomName);
	})

	socket.on('SEND_MESSAGE_ROOM', (data) => {			
		io.in(data.roomName).emit('RECEIVE_MESSAGE_ROOM', data);	
	})

	socket.on('LEAVE_ROOM', (room) => {						
		socket.leave(room);
	})	
}) 
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');


    socket.on('join',(params,callback)=>{

    if(!isRealString(params.name) || !isRealString(params.room)){
        return callback('Name and room name are required.');
    }
 
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList',users.getUserList(params.room));
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app!!'));
    socket.to(params.room).broadcast.emit('newMessage',generateMessage('Admin',`${params.name} has joined!!`));
    callback();
    });

  socket.on('createMessage', (newMessage, callback) => {   
    console.log('createMessage', newMessage);

	var user = users.getUser(socket.id);
	if(user && isRealString(newMessage.text)){
		io.to(user.room).emit('newMessage',generateMessage(user.name,newMessage.text));//--127--
	}
    callback();

  });



socket.on('createLocationMessage',(data)=>{
    console.log(data.latitude,data.longitude);
    var user = users.getUser(socket.id);
    if(user){
        io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name, data.latitude, data.longitude));//--127--
    }
});


  socket.on('disconnect', () => {
    console.log('User was disconnected');
  var user = users.removeUser(socket.id);
  if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));
  }
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

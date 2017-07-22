// Setup basic express server with sockets
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')({ transports: ['websocket'] });
io.attach(server);

var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// ################ Routing ################
app.use(express.static("..\public"));

// Gameroom
const GameRooms = [];

io.on('connection', function (socket) {
  var addedUser = false;

  // when the client emits 'create gameroom', this listens and executes
  socket.on("create gameroom", function (roomTitle) {
    // Create new gameroom to global list.
    // Add user to proper socket room
    if(!io.sockets.adapter.rooms[roomTitle]) {
      var room = new GameRoom(roomTitle, socket.username);
      GameRooms[room.title] = room;
      socket.room = room;
      socket.join(room.title);
      socket.boardcast.to(room.title).emit("gameroom created", room);
    }
    else {
      // TODO näytä keskaria - huone on jo olemassa.
    }
  });

  socket.on("join gameroom", function (roomTitle){
    // Add user to socket room
    if(io.sockets.adapter.rooms[roomTitle].length < 2) {
      var room = GameRooms[roomTitle];
      room.addPlayer(socket.username);
      socket.join(room.title);
    }
    else {
      // TODO gtfo
    }
  });

  // when the client emits 'add user', this listens and executes
  socket.on("new user", function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;

    addedUser = true;
    // Ditch login page and render hello msg + list of available game rooms
    socket.emit('login', {
      username: username,
      rooms: GameRooms
    });
  });

  // when the user disconnects.. perform this
  // socket.on('disconnect', function () {
  //   if (addedUser) {

  //     // echo globally that this client has left
  //     socket.broadcast.to(socket.room).emit('user left', {
  //       username: socket.username,
  //       numUsers: numUsers
  //     });
  //   }
  // });
});

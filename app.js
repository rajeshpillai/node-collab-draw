var express = require('express'),
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http);


app.use("/assets", express.static(__dirname + '/assets'));
app.use("/app", express.static(__dirname + '/app'));



app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

http.listen(9999, function () {
  console.log(__dirname);
  console.log("Server running on 9999...");
})


// Listen for incoming connections from clients
/*
Here a handler for new incoming connections is registered. Whenever a new client connects, this function is called and the socket of the new client is passed as an argument.
*/
io.sockets.on('connection', function (socket) {

  // Start listening for mouse move events
  socket.on('mousemove', function (data) {

    // This line sends the event (broadcasts it)
    // to everyone except the originating client.
    //socket.broadcast.emit('moving', data);
    io.sockets.emit('moving', data);
  });
});
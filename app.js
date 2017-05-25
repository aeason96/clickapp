var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var path = require('path');


app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/game.html');
});
var allClients = [];
var clientDivs = [];
io.on('connection', function(socket){
    console.log("user connected");
    allClients.push(socket);
    socket.on('joined', function(num){
        console.log("joined");
        io.emit('joined', allClients.length);
    });
    socket.on('disconnect', function(socket) {
        console.log("left");
        allClients.pop();
        console.log(allClients.length);
        io.emit('joined', allClients.length);
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});

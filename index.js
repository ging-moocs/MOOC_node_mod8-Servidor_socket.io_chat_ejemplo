var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path");
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.get("*", function(req,res,next) {
    res.send("Hello");
})
io.on('connection', function(socket){
    console.log("New connection");
    io.emit("new_member");
    socket.on("chat_message_sent", function(msg){
    	io.emit("chat_message_received", msg);
    }); 
    socket.on('disconnect', function(msg){
		io.emit('member_exit');
	});
});

http.listen(port, function() {
  console.log('Open your browser on http://localhost:' + port);
});


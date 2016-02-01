"use strict"

var http = require("http")
var express = require("express")
var app = express()
var server = http.createServer(app)
var io = require("socket.io").listen(server)

io.sockets.on("connection", function(socket) {
	console.log("socket connection established")
})

app.set("port", process.env.PORT || 8080)

server.listen(app.get("port"), function() {
	console.log("express server listening on port " + app.get("port"))
})
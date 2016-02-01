// keep the JS clean
"use strict"

var http = require("http")

// create an express application
var express = require("express")
var app = express()

// this is used for getting data out of the body of a request
var bodyParser = require("body-parser")

// configure the body-parser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

// configure the header rules for REST and token authentication usage
app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Methods", "GET, POST")
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type, Authorization")
	next()
})

// real-time configuration
var serv = http.createServer(app)
var io = require("socket.io").listen(serv)

io.sockets.on("connection", function(socket) {

	console.log(socket)

	// socket.on("input", function(data) {
	// 	console.log(data)
	// 	socket.emit("receive", data.message.split('').reverse().join(''))
	// })

})

// // create an express router to handle our api's url based control flow
// var router = express.Router()

// // note: express will handle non existing api calls with "Cannot + HTTP VERB + URI PATH", and will not crash 

// // test GET route
// router.route("/socket").get(function(req, res) {
// 	res.json({
// 		message: "here's some json data"
// 	})
// })

// // set standard path name for our api, and include the router
// app.use("/api", router)

app.set('port', process.env.PORT || 8080)
serv.listen(app.get('port'), function() {
	console.log('express server listening on port ' + app.get('port'))
})
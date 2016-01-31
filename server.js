// keep the JS clean
"use strict"

// create an express application
var express = require("express")
var app = express()

// this is used for getting data out of the body of a request
var bodyParser = require("body-parser")

// set our application port
var port = process.env.PORT || 8080

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

// create an express router to handle our api's url based control flow
var router = express.Router()

// note: express will handle non existing api calls with "Cannot + HTTP VERB + URI PATH", and will not crash 

// test GET route
router.route("/socket").get(function(req, res) {
	// 100% json data api
	res.json({
		message: "here's some json data"
	})
})

// set standard path name for our api, and include the router
app.use("/api", router)
// set our port
app.listen(port)
// this is to view the instance starting via terminal
console.log("api is running and is accessible from port " + port)
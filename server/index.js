var http = require("http");
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");
var compression = require('compression');
var express = require("express");
const util = require('util');
const favicon = require("serve-favicon");

var app = express();
var router = express.Router();

var config = require(path.join(__dirname, "/Config.js"));

var session = require('client-sessions');

app.use(session({
	cookieName: 'session',
	secret: process.env.SESSION_SECRET,
	duration: 5 * 60 * 60 * 1000,
	activeDuration: 3 *30 * 60 * 1000
}));

app.use(favicon(path.join(__dirname, "static/favicon.ico")));

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json({
	limit: '50mb',
	type: 'application/json'
}));

app.use(compression());

app.use(express.static(path.join(__dirname, "/static")));
app.use(express.static(path.join(__dirname, "/../client")));
app.use(express.static(path.join(__dirname, "/../node_modules")));
app.use(express.static(path.join(__dirname, "/../resources")));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

/*************************************/
/********     Main Routes     ********/
/*************************************/

router.get("/demo", function(req, res) {
	res.render("Demo");
});

/*************************************/
/*********   Start Service   *********/
/*************************************/


app.use(config.base_url, router);
module.exports = router;

let async0 = new Promise((resolve, reject) => {
	resolve();
});


Promise.all([async0]).then(res => {
	const server = http.createServer(app).listen(config.http_port, function() {
		const host = server.address().address;
		const port = server.address().port;
		console.log(util.format("Example app listening at address https://%s:%s ", host, port))
	});
});

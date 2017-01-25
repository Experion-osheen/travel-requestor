var jwt = require('jsonwebtoken');
var cookieparser = require('cookie-parser');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express'),
	path = require('path');
var loginrouter=express.Router();
var app = express();


app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var loginrouter = require('./login1');
var verifyrouter = require('./verification')
var projectrouter = require('./project');
var userinsert = require('./userinsert');
var useredit = require('./useredit');
var user = require('./user');
var admin = require('./admin');
var adminaction = require('./adminaction');
var auth = require('./authentication');

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'client/index.html'));
});
app.use(express.static(path.join(__dirname, '..', 'client')));

app.use('/',loginrouter);
app.use('/',auth);
app.use('/',adminaction);
app.use('/',user);
app.use('/',projectrouter);
app.use('/',userinsert);
app.use('/',useredit);
app.use('/',admin);
app.use('/',verifyrouter);

var server = app.listen(8081,function(){
	var port = server.address().port;
	console.log("Listening  on port %s",port);
});

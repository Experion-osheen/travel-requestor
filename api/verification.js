var jwt = require('jsonwebtoken');
var cookieparser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var validator = require('validator');
var userrouter=express.Router();
var connection=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"123",
	database:"traveldb"
});
var app = express();
var jwt = require('jsonwebtoken');
var cookieparser = require('cookie-parser');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var loginrouter=express.Router();
var validator = require('validator');
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieparser());
var js={"message":"invalid user"};

userrouter.post('/verify',function (request, response){
	//var id1=request.body.eid;
	var tok=request.body.token;
	var id=request.body.id;
	var role=request.body.role1;
	var decoded = jwt.verify(tok, 'osheen');
	console.log(decoded);
	if(decoded.token==null){
		console.log("invalid access verification failed");
	}
	else{
		if(id==decoded.userid && role==decoded.role){
			js.message="valid user";
			response.send(js);

		}
		else{
			js.message="invalid user";
			response.send(js);

		}
		console.log(js);
	}
	
});

module.exports = userrouter;
var jwt = require('jsonwebtoken');
var cookieparser = require('cookie-parser');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var loginrouter=express.Router();
var validator = require('validator');
var connection=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"123",
	database:"traveldb"
});
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieparser());
var js={"status":'403',"message":"Login failed","user_type":null};
loginrouter.post('/login',function (request, response){
	var userid=request.body.userid;
	var password=request.body.password;
	if ((validator.isEmpty(userid) && validator.isEmpty(password))) js.message="id and password missing in server side";
	else if ((validator.isEmpty(userid))) js.message="id missing in server side";	
	else if ((validator.isEmpty(password))) js.message="password missing in server side";	
	connection.query('select user_id,password,flag from user where user_id="'+userid+'" and password="'+password+'"',function(err,rows){
		js={"status":'403',"message":"Login failed","user_type":null,"jwttoken":null};
		var data=JSON.stringify(rows);
		var json=JSON.parse(data);
		console.log(data);
		if(rows.length > 0){
			if(json[0].password==password){
				js.status='200';
				js.message="Login success";
				if(json[0].flag==0)
					js.user_type="user";
				else if(json[0].flag==1)
					js.user_type="admin";
				var token = jwt.sign({ userid: json[0].user_id,role:js.user_type}, 'osheen',{expiresIn:60*10000});
				js.jwttoken=token;	
				console.log(js);
				response.send(js);
			}
		}
		else{ 
			response.send(js);
		}	
	});
});

module.exports = loginrouter;
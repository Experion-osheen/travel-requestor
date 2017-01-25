var express = require('express');
var bodyParser = require('body-parser');
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
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

userrouter.get('/project',function (request, response){
	connection.query("select * from project",function(err,rows){
	console.log("here");
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    console.log(json);
    response.send(json);
	});
});

module.exports = userrouter;

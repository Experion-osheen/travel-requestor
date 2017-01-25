var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var validator = require('validator');
var userrouter=express.Router();
var md5 = require('md5');
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
var pass={"message":""};
userrouter.get('/user/:userid',function (request, response){
	var id1=request.params.userid;
	console.log("uid from client:"+id1);
	connection.query("select cause,source,destination,mode,todate,no_days,priority,status,projectname,CONCAT(EXTRACT(DAY FROM fromdate),'/',EXTRACT(MONTH FROM fromdate),'/',EXTRACT(YEAR FROM fromdate)) fromdate,CONCAT(EXTRACT(DAY FROM todate),'/',EXTRACT(MONTH FROM todate),'/',EXTRACT(YEAR FROM todate)) todate from request,project where request.projectid=project.pid and request.empid=?",[id1],function(err,rows){
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    console.log(json);
    response.send(json);
	});
});
userrouter.get('/user/:userid/:status',function (request, response){
	var id1=request.params.userid;
	var status=request.params.status;
	connection.query("select empid,tid,cause,source,destination,mode,todate,no_days,priority,status,projectname,CONCAT(EXTRACT(DAY FROM fromdate),'/',EXTRACT(MONTH FROM fromdate),'/',EXTRACT(YEAR FROM fromdate)) fromdate,CONCAT(EXTRACT(DAY FROM todate),'/',EXTRACT(MONTH FROM todate),'/',EXTRACT(YEAR FROM todate)) todate from request,project where request.projectid=project.pid and status=? and request.empid=?",[status,id1],function(err,rows){
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    response.send(json);
	});
});


userrouter.get('/Reason/:tid',function (request, response){
	var id1=request.params.tid;
	console.log("here reason");
	connection.query("select * from rejectdetails where requestid = ?",[id1],function (err,rows){
		var data=JSON.stringify(rows);
    	var json=JSON.parse(data);
    	console.log(json);
    	response.send(json);
	});

});
userrouter.put('/password',function(request,response){
	pass.message="failure";
	var newp=request.body.newp;
	var oldp=request.body.oldp;
	var eid=request.body.eid;
	oldp=md5(oldp);
	newp=md5(newp);
	connection.query("UPDATE user set password=? where user_id=? and password=?",[newp,eid,oldp],function (err,rows){
		if(err){ 
			throw err;
			pass.message="failure"
			console.log(pass);
			response.send(pass);
		}
		else{
		var data=JSON.stringify(rows);
		var json=JSON.parse(data);
		console.log(json);
			if(json.affectedRows==0){
				pass.message="failure";
				console.log(pass);
				response.send(pass);
			}
			else{
			pass.message="success"
			console.log(pass);
			response.send(pass);
			}
		
		}
		
	});

});


module.exports = userrouter;

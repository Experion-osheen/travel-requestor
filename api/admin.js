var jwt = require('jsonwebtoken');
var cookieparser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var md5 = require('md5');
var validator = require('validator');
var nodemailer = require('nodemailer');
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
app.use(cookieparser());
var admin1={'message':""};


function sendMail(toAddress,password,id) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'bugtrackerndm@gmail.com', // Your email id
            pass: 'bugtracker' // Your password
        }
    });

    var text = 'Your Have Been Added to travel desk with password '+password+' and userid '+id;

    var mailOptions = {
        from: 'bugtrackerndm@gmail.com', // sender address
        to: toAddress, // list of receivers
        subject: 'Travel Desk Access', // Subject line
        text: text //, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
        else{
            console.log('Message sent: ' + info.response);
        }
    });
}


function generatePassword() {
    var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
       for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}



userrouter.get('/admin',function (request, response){
	
	console.log(request,response);
	connection.query("select tid,empid,cause,source,destination,mode,todate,no_days,priority,status,projectname,CONCAT(EXTRACT(DAY FROM fromdate),'/',EXTRACT(MONTH FROM fromdate),'/',EXTRACT(YEAR FROM fromdate)) fromdate,CONCAT(EXTRACT(DAY FROM todate),'/',EXTRACT(MONTH FROM todate),'/',EXTRACT(YEAR FROM todate)) todate from request,project where request.projectid=project.pid",function(err,rows){
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    response.send(json);
	});
});

userrouter.get('/admin/approved',function (request, response){
	console.log("hai");
	connection.query("select tid,empid,cause,source,destination,mode,todate,no_days,priority,status,projectname,CONCAT(EXTRACT(DAY FROM fromdate),'/',EXTRACT(MONTH FROM fromdate),'/',EXTRACT(YEAR FROM fromdate)) fromdate,CONCAT(EXTRACT(DAY FROM todate),'/',EXTRACT(MONTH FROM todate),'/',EXTRACT(YEAR FROM todate)) todate from request,project where request.projectid=project.pid and request.status='approved'",function(err,rows){
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    response.send(json);
	});
});

userrouter.get('/admin/rejected',function (request, response){
	connection.query("select tid,empid,cause,source,destination,mode,todate,no_days,priority,status,projectname,CONCAT(EXTRACT(DAY FROM fromdate),'/',EXTRACT(MONTH FROM fromdate),'/',EXTRACT(YEAR FROM fromdate)) fromdate,CONCAT(EXTRACT(DAY FROM todate),'/',EXTRACT(MONTH FROM todate),'/',EXTRACT(YEAR FROM todate)) todate from request,project where request.projectid=project.pid and request.status='rejected'",function(err,rows){
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    response.send(json);
	});
});

userrouter.post('/:empid/:username',function(request,response){
	var uid=request.params.empid;
	var uname=request.params.username;
    var matching = uname.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);
	if(matching==null) admin1.message="Failure";
    else{
    var pwd=generatePassword();
	var pwd1=md5(pwd);
	post={user_id:uid,username:uname,password:pwd1};
	console.log('/:empid/:username',post);
	connection.query("insert into user set ?",[post],function(err,rows){
		if(!err){
			admin1.message="Success";
			sendMail(uname,pwd,uid);
			response.send(admin1);
		}
		else{
			admin1.message="failure";
			response.send(admin1);
		}
	});

    }

});

module.exports = userrouter;

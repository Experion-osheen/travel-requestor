var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors');
var nodemailer = require('nodemailer');
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
var adminjs={"status":'403',"message":"Update Failed","action":"nothing"};
var adminreject={"message":"failure"};




function sendMail(toAddress,status) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'bugtrackerndm@gmail.com', // Your email id
            pass: 'bugtracker' // Your password
        }
    });

    var text = 'Your request status is updated to '+status;

    var mailOptions = {
        from: 'bugtrackerndm@gmail.com', // sender address
        to: toAddress, // list of receivers
        subject: 'Travel Request Status update', // Subject line
        text: text //, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        };
    });
}


userrouter.get('/admin/pending',function (request, response){
	connection.query("select tid,empid,cause,source,destination,mode,todate,no_days,priority,status,projectname,CONCAT(EXTRACT(DAY FROM fromdate),'/',EXTRACT(MONTH FROM fromdate),'/',EXTRACT(YEAR FROM fromdate)) fromdate,CONCAT(EXTRACT(DAY FROM todate),'/',EXTRACT(MONTH FROM todate),'/',EXTRACT(YEAR FROM todate)) todate from request,project where request.projectid=project.pid and ( request.status='pending' or request.status='not done')",function(err,rows){
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    response.send(json);
	});
});


userrouter.post('/status',function (request, response){
	var ted=request.body.tid11;
	var stat=request.body.status;
	console.log(ted,stat);
	connection.query("UPDATE request SET status=? where tid= ?" , [stat, ted], function (err,result) {
		if(!err){
			adminjs.message="Updated Successfully";
			adminjs.status='200';
			adminjs.action=stat;
			console.log(adminjs);
			connection.query("select user_id,username from user,request where request.tid = ? and request.empid=user.user_id",[ted],function(err,rows){
				if(!err){
					var data=JSON.stringify(rows);
    				var json=JSON.parse(data);
    				console.log(json);
    				console.log("hi");
    				console.log(json[0].username);
					sendMail(json[0].username,stat);
				}
			});
			response.send(adminjs);
		}
	});
});

userrouter.post('/Reject',function(request,response){
	var tid=request.body.tid;
	var reason1=request.body.reason;
	console.log(tid,reason1);
	post={requestid:tid,reason:reason1};
	connection.query('INSERT into rejectdetails SET ?',[post],function (err,result){
		if(!err){
			adminreject.message="success";
		}
		else{
			adminreject.message="failure";
		}
		console.log(adminreject);
		response.send(adminreject);
	});

});

module.exports = userrouter;

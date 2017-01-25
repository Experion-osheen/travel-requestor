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
var js={"status":'403',"message":"Login failed","user_type":null};
var jsinsert={"status":'403',"message":"insertion failed"};
var adminjs={"status":'403',"message":"Update Failed","action":"nothing"};
userrouter.post('/login',function (request, response){
	var userid=request.body.userid;
	var password=request.body.password;
	if ((validator.isEmpty(userid) && validator.isEmpty(password))) js.message="id and password missing in server side";
	else if ((validator.isEmpty(userid))) js.message="id missing in server side";	
	else if ((validator.isEmpty(password))) js.message="password missing in server side";	
	connection.query('select user_id,password,flag from user where user_id="'+userid+'"',function(err,rows){
		
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
			}
		}
		console.log(js);
		response.send(js);
	});
});

userrouter.post('/getproject',function (request, response){
	connection.query("select * from project",function(err,rows){
	console.log("here");
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    console.log(json);
    response.send(json);
	});
});


userrouter.post('/insert',function (request, response){
	var eid=request.body.empid;
	var pname=request.body.proname;
	var cse=request.body.cause;
	var src=request.body.source;
	var dst=request.body.destination;
	var fd=request.body.fromdate;
	fd1=new Date(fd);
	var td=request.body.todate;
	td1=new Date(td);
	var num=request.body.no;
	var mo=request.body.mode;
	var prio=request.body.priority;
	console.log(eid,pname,cse,src,dst,fd,td,num,mo,prio);
	if (validator.isEmpty(eid)||validator.isEmpty(pname)||validator.isEmpty(cse)||validator.isEmpty(src)||validator.isEmpty(dst)||validator.isEmpty(fd)||validator.isEmpty(td)||validator.isEmpty(num)||validator.isEmpty(prio)){
		jsinsert.message("empty fields in server side");
	}
	else
		{
		 var post1 = {empid:eid,cause:cse,source:src,destination:dst,mode:mo,fromdate:fd1,todate:td1,no_days:num,priority:prio,status:"not done",projectid:pname };
		 var abc='INSERT INTO request SET '+post1;
		 console.log(abc);
		 connection.query('INSERT INTO request SET ?' , post1,function (err,result) {
		 	 if (err) {
                jsinsert.message="failure";
                console.log(jsinsert);
                response.send(jsinsert);
            }
            else {
                jsinsert.status='200';
                jsinsert.message="success";
                console.log(jsinsert);
                response.send(jsinsert);
            }
          });
		
	}

});


userrouter.post('/editinsert',function (request, response){
	var tid1=request.body.tid;
	var eid=request.body.empid;
	var pname=request.body.proname;
	var cse=request.body.cause;
	var src=request.body.source;
	var dst=request.body.destination;
	var fd1=request.body.fromdate;
	var fd2=new Date(fd1);
	var td1=request.body.todate;
	var td2=new Date(td1);
	var num=request.body.no;
	var mo=request.body.mode;
	var prio=request.body.priority;
	if (validator.isEmpty(eid)||validator.isEmpty(pname)||validator.isEmpty(cse)||validator.isEmpty(src)||validator.isEmpty(dst)||validator.isEmpty(fd1)||validator.isEmpty(td1)||validator.isEmpty(num)||validator.isEmpty(prio)){
		jsinsert.message("empty fields in server side");
	}
	else
		{
		 var post1 = {empid:eid,cause:cse,source:src,destination:dst,mode:mo,fromdate:fd2,todate:td2,no_days:num,priority:prio,status:"pending",projectid:pname };
		 var abc="UPDATE request SET "+post1+" where tid= "+tid1;
		 console.log(post1);
		 connection.query("UPDATE request SET ? where tid= ?" , [post1, tid1], function (err,result) {
		 	if (err) {
                jsinsert.message="failure";
                response.send(jsinsert);
            }
            else {
                jsinsert.status='200';
                jsinsert.message="success";
                console.log(jsinsert);
                response.send(jsinsert);
            }
          });
		
	}

});




userrouter.post('/all',function (request, response){
	var id1=request.body.eid;
	console.log(id1);
	connection.query("select * from request,project where request.projectid=project.pid and request.empid=?",[id1],function(err,rows){
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    response.send(json);
	});
});

userrouter.post('/adminall',function (request, response){
	console.log("hai");
	connection.query("select * from request,project where request.projectid=project.pid",function(err,rows){
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    response.send(json);
	});
});

userrouter.post('/approved',function (request, response){
	var id1=request.body.eid;
	connection.query("select * from request,project where request.projectid=project.pid and request.status='approved' and request.empid=?",[id1],function(err,rows){
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    response.send(json);
	});
});

userrouter.post('/adminapproved',function (request, response){
	console.log("hai");
	connection.query("select * from request,project where request.projectid=project.pid and request.status='approved'",function(err,rows){
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    response.send(json);
	});
});
userrouter.post('/pending',function (request, response){
	var id1=request.body.eid;
	connection.query("select * from request,project where request.projectid=project.pid and request.status='pending' and request.empid=?",[id1],function(err,rows){
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    response.send(json);
	});
});

userrouter.post('/rejected',function (request, response){
	console.log("gdsfsgf");
	var id1=request.body.eid;
	connection.query("select * from request,project where request.projectid=project.pid and request.status='rejected' and request.empid=?",[id1],function(err,rows){
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    response.send(json);
	});
});

userrouter.post('/adminpending',function (request, response){
	connection.query("select * from request,project where request.projectid=project.pid and ( request.status='pending' or request.status='not done')",function(err,rows){
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    response.send(json);
	});
});


userrouter.post('/adminpendingupdate',function (request, response){
	var ted=request.body.tid11;
	var stat=request.body.status;

	console.log(ted,stat);
	connection.query("UPDATE request SET status=? where tid= ?" , [stat, ted], function (err,result) {
		if(!err){
			adminjs.message="Updated Successfully";
			adminjs.status='200';
			adminjs.action=stat;
		}
		response.send(adminjs);
	});
});

userrouter.post('/adminrejected',function (request, response){
	connection.query("select * from request,project where request.projectid=project.pid and request.status='rejected'",function(err,rows){
    var data=JSON.stringify(rows);
    var json=JSON.parse(data);
    response.send(json);
	});
});
userrouter.post('/editload',function (request, response){
	var tid=request.body.tid;
	var conn;
	//var sql = mysql.format("SELECT * FROM request WHERE request.tid=?",[tid]);
	conn = connection.query("SELECT * FROM request WHERE request.tid=?",[tid], function(err,rows,fields) {
		var data=JSON.stringify(rows);
	    var json=JSON.parse(data);
	    console.log(json);
	    response.send(json);
	});
	//connection.query("select * from request,project where request.projectid=project.pid and request.tid=tid",function(err,rows){
	
});


app.use('/',userrouter);
var server = app.listen(8081,function(){
	var port = server.address().port;
	console.log("Listening  on port %s",port);
});
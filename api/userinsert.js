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
var jsinsert={"status":'403',"message":"insertion failed"};

function check(check){
  if ((check.search(regexp) == -1)||(check.length>50)){
  	console.log(check); 
    return true;
  }
  
  return false;
}

function check2(check){
  if (check.search(reg) == -1){ 
  	console.log(check);   
    return true;
  }
  
  return false;
}

function check3(check){
  if (check.search(date1) == -1){ 
   return true;
  }
  
  return false;
}

var date1 = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
var reg = /^\d+$/;
var regexp = /^[a-zA-Z0-9-_. ]+$/;



userrouter.post('/Request',function (request, response){
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
	else if(fd1>td1){
		jsinsert.message="Date validation fails in server side"
	}
	else if(check(cse)){
		jsinsert.message="Invalid cause in server side";
	}
	else if(check2(pname)){
		jsinsert.message="Invalid projectname in server side ";
	}
	else if(check(src)){
		jsinsert.message="Invalid source in server side";
	}
	else if(check3(fd)){
		jsinsert.message="Invalid fromdate in server side";
	}
	else if(check3(td)){
		jsinsert.message="Invalid Todate in server side";
	}
	else if(check(dst)){
		jsinsert.message="Invalid destination in server side";
	}
	else if(check2(num)){
		jsinsert.message="Invalid No:of days in server side";
	}
	else if(check(mo)){
		jsinsert.message="Invalid mode of travel in server side";
	}
	else if(check(prio)){
		jsinsert.message="Invalid priority in server side";
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

module.exports = userrouter;

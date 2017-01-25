var jwt = require('jsonwebtoken');
var cookieparser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var validator = require('validator');
var userrouter=express.Router();


 var verify = function (req, res, next) {
 var auth=req.headers.authorization;
 if(auth==null){
	console.log("invalid access")
 }
 else{
	 auth=JSON.parse(auth);
	 console.log(auth);
	 var token=auth.token;
	 var id=auth.id1;
	 var role=auth.role;
	 var decoded = jwt.verify(token, 'osheen');
	 if(id==decoded.userid && role==decoded.role){
			req.auth=true;
			next();
		}

	 else{
			req.auth=false;
			console.log("false");
			res.status=403;
			var js = {
	                   "status": "",
	                   "message": ""
			         };
			               
			       js.status = '403';
			       js.message = "invalid request";
			       res.send(js);
			res.end();
		 }
	 }
		 
}

module.exports = verify;
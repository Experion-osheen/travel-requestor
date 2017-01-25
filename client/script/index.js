// function getCookie(cname) {
//     var name = cname + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(';');
//     for(var i = 0; i <ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }
var regexp = /^[a-zA-Z0-9-_ ]+$/;
var flag=0;
function check(check){
  if (check.search(regexp) == -1){ 
    return true;
  }
  
  return false;
}

function login(){
	var pass1=document.getElementById('password').value;
	password = (Crypto.MD5(pass1)).toString();
	console.log(password);
	var httpObj=new	XMLHttpRequest();
	httpObj.onreadystatechange=function(){
		if(this.readyState=='4' && this.status=='200'){
			
			var result=this.responseText;
			result=JSON.parse(result);
			console.log(result);
			if(result.message=="Login success"){
				console.log(result.message);
				console.log(result.jwttoken);
				sessionStorage.setItem("eid",document.getElementById('userid').value);
				// console.log("qwerty");
				localStorage.setItem('token1',result.jwttoken);
				console.log(localStorage.getItem('token1'));
				console.log(result.user_type);
				if(result.user_type=="user") {
					localStorage.setItem("rolestore","user");
					window.location="user.html";
				}
					
				else if(result.user_type=="admin") {
					localStorage.setItem("rolestore","admin");
					window.location="admin.html";
					 
				}
					
			}

			else {
					console.log("fail");
					var result=this.responseText;
					console.log(result);
					result=JSON.parse(result);
					bootbox.alert(result.message);

				}
			}		
		};

	httpObj.open('POST','http://192.168.1.226:8081/login',true);
	httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
	console.log(document.getElementById('userid').value);
	httpObj.send('userid='+document.getElementById('userid').value+'&password='+password);
}
function validate(){
	var id=document.getElementById('userid').value;
	var pass=document.getElementById('password').value;
	if(id=="" && pass==""){
		bootbox.alert("ID AND PASSWORD FIELD EMPTY");
		return false;
	}
	else if(pass==""){
		bootbox.alert("PASSWORD FIELD EMPTY");
		return false;
	}

	else if(id==""){
		bootbox.alert("ID FIELD EMPTY");
		return false;
	}
	else if(check(id)){
		bootbox.alert("ID FIELD IS NOT VALID");
	}
	else{
		login();
	}
	
}


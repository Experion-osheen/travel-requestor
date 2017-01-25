$('#adde').click(function () {
    $('#adduser').toggle();
});
var token=localStorage.getItem('token1');
var role=localStorage.getItem('rolestore');
var id=sessionStorage.getItem('eid');
var auth={'token': token,'role': role,'id1': id};

function add1(){
	empid=document.getElementById('empid').value;
	username=document.getElementById('username').value;
	var matching = username.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);
	
	var httpObj=new XMLHttpRequest();
	httpObj.onreadystatechange=function(){

			if(this.readyState=='4' && this.status=='200')
    		{
    			var result=this.responseText;
        		result=JSON.parse(result);
        		if(result.message="success"){
        			console.log(result);
        			bootbox.alert("User added Successfully and password has been send",function(){
        				window.location.reload();
        			});
        		}
        		else{
        			console.log(result);
        			bootbox.alert("Sorry Try Again Once More",function(){
        				window.location.reload();
        			});
        		}
    		}
	};
	if(empid==""||username==""){
		bootbox.alert("Please Enter Fields");
	}
	else if(matching==null){
		bootbox.alert("Invalid Mail Format");
	}
	else if(empid.length>10){
		bootbox.alert("Invalid Employee id");
	}
	else{
	httpObj.open('POST','http://192.168.1.226:8081/'+empid+'/'+username,true);
	httpObj.setRequestHeader("Authorization", JSON.stringify(auth));
	httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
	httpObj.send();	
	}
	
}
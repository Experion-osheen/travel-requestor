var token=localStorage.getItem('token1');
var role=localStorage.getItem('rolestore');
var id=sessionStorage.getItem('eid');
var auth={'token': token,'role': role,'id1': id};
$('#reset').click(function () {
    $('#resetform').toggle();
});
function changep(){
	eid=sessionStorage.getItem('eid');
	curp=document.getElementById("curp").value;
	newp=document.getElementById("newp").value;
	newp2=document.getElementById("newp2").value;
	if(curp==""||newp==""||newp2==""){
		bootbox.alert("please enter valid details");
	}
	else if(newp!=newp2){
		bootbox.alert("new passwords dont match");
	}
	else if(newp.length>10){
		bootbox.alert("passwords length too large");
	}
	else{

		var httpObj1=new XMLHttpRequest();
		httpObj1.onreadystatechange=function(){
			if(this.readyState=='4' && this.status=='200'){
				var result=this.responseText;
				result=JSON.parse(result);
				if(result.message=="success"){
					bootbox.alert("Password Updated Successfully",function(){
						window.location.reload();
					});
				}
				else if(result.message=="failure"){
					bootbox.alert("Sorry Password Not Updated",function(){
						window.location.reload();
					});
				}

			}

		}

		httpObj1.open('PUT','http://127.0.0.1:8081/password',true);
		httpObj1.setRequestHeader('content-type','application/x-www-form-urlencoded');
		httpObj1.setRequestHeader("Authorization", JSON.stringify(auth));
		httpObj1.send("newp="+newp+"&oldp="+curp+"&eid="+eid);

	}

}


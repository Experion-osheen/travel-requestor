function verify1(clue){
	var jwttoken=localStorage.getItem('token1');
	var id=sessionStorage.getItem('eid');
	var role1=localStorage.getItem('rolestore');
	console.log(jwttoken,id,role1);
	var httpObj=new	XMLHttpRequest();
	httpObj.onreadystatechange=function(){
		if(this.readyState=='4' && this.status=='200'){
			var result=this.responseText;
			result=JSON.parse(result);
			if((clue==1&&role1=="user")||(clue=0&&role1=="admin")||(result.message=="invalid user")||jwttoken==null||jwttoken==undefined){
				sessionStorage.removeItem('eid');
				sessionStorage.removeItem('tid');
				localStorage.clear();
				console.log(jwttoken,id,role1);
				window.location = "index.html";
			}

		}
	};

	if(jwttoken!=null){
	httpObj.open('POST','http://192.168.1.226:8081/verify',true);
	httpObj.setRequestHeader("Authorization", JSON.stringify(auth));
	httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
	httpObj.send('token='+jwttoken+'&id='+id+'&role1='+role1);
	}
	else{
		window.location = "index.html";
	}

}
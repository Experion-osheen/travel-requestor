
function logout1(){
   bootbox.confirm({
       size: "small",
       message: "Do you want to logout ?",
       callback: function(result){ 

       		if(result==true){
       		sessionStorage.removeItem('eid');
    			sessionStorage.removeItem('tid');
          localStorage.removeItem('token1');
    			localStorage.clear();
          window.location.reload();
    			window.location="index.html";
       		}
      }
   });

}
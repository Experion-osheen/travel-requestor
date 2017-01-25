var reg = /^\d+$/;
var regexp = /^[a-zA-Z0-9-_]+$/;

function check(check){
  var flag=0;
  if (check.search(regexp) == -1){ 
    alert('invalid '+ check); 
    flag=1;
  }
  return flag;
}

function check2(check){
  var stat=0;
  if (check.search(reg) == -1){ 
    alert('invalid '+ check); 
    stat=1;
  }
  return stat;
}


function validate(){
     flag=0;
     empid=document.getElementById("empid").value;
     proname=document.getElementById("proname").value;
     cause=document.getElementById("cause").value;
     source=document.getElementById("source").value;
     destination=document.getElementById("destination").value;
     fromdate=document.getElementById("fromdate").value;
     todate=document.getElementById("todate").value;
     mode=document.getElementById("mode").value;
     no=document.getElementById("no").value;
     e=document.getElementById("sel1");
     priority=e.options[e.selectedIndex].text;
     
     flag=check(cause);
     flag=check(source);
     flag=check(destination);
     flag=check(mode);
     flag=check2(no);
     
     return flag;

}


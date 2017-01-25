var token=localStorage.getItem('token1');
var role=localStorage.getItem('rolestore');
var id=sessionStorage.getItem('eid');
var auth={'token': token,'role': role,'id1': id};

var empid,proname,cause,source,destination,fromdate,todate,no,mode,priority;
var tid=sessionStorage.getItem('tid');
var reg = /^\d+$/;
var regexp = /^[a-zA-Z0-9-_. ]+$/;
// var date1 = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
console.log(tid);
var flag=0;
$("#empid").click(function(){
      alert("Non editable");
    });

function getproject(){
  verify1(0);
  console.log("och");
  var httpObj1=new XMLHttpRequest();
  httpObj1.onreadystatechange=function(){
      if(this.readyState=='4' && this.status=='200'){
        var result=this.responseText;
        console.log("hello");
        result=JSON.parse(result);
        var li = document.getElementById("proname");
        result.forEach(function(element){
            var option1 = document.createElement("option");
            option1.text = element.projectname;
            option1.value = element.pid;
            option1.innerHTML=element.projectname;
            li.appendChild(option1);
      });
    }
  };
  httpObj1.open('GET','http://192.168.1.226:8081/project',true);
  httpObj1.setRequestHeader("Authorization", JSON.stringify(auth));
  httpObj1.setRequestHeader('content-type','application/x-www-form-urlencoded');
  httpObj1.send();
 
}


$(document).ready(function(){
      var fromdate_input=$('input[name="fromdate"]'); 
      var todate_input=$('input[name="todate"]');//our date input has the name "date"
      var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
      var options={
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
      };
      fromdate_input.datepicker(options);
      todate_input.datepicker(options);

  });

function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function daydiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}

document.getElementById("no").onclick =function(){ 
    date1 = document.getElementById("fromdate").value;
    date2=document.getElementById("todate").value;
    no=(daydiff(parseDate(date1), parseDate(date2)));
    document.getElementById('no').value=no;
};


function check(check){
  if ((check.search(regexp) == -1)||(check.length>50)){ 
    //alert('invalid '+ check);
    flag=1;
  }
  
  return flag;
}

function check2(check){
  if (check.search(reg) == -1){ 
    //alert('invalid '+ check); 
    flag=1;
  }
  
  return flag;
}

function checkday(check){
  if(check>100){
    flag=1;
    //alert("No of days greater than 100")
  }
  return flag;
}
/*function check3(check){
  if (check.search(date1) == -1){ 
    alert('invalid '+ check); 
    flag=1;
  }
  
  return flag;
}*/


function submit11(){
    flag=0;
    validate()
     .then(function(){
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
  
            var httpObj=new XMLHttpRequest();
            httpObj.onreadystatechange=function(){
              if(this.readyState=='4' && this.status=='200'){
                var result=this.responseText;
                result=JSON.parse(result);
                var mum=result.message;
                 if(result.message=="success")
                  //window.alert("Your Request is Not Edited  "+mum);
                  bootbox.alert("Your Request is Edited");
                 else
                  bootbox.alert("Your Request is Not Edited  "+mum);
              }
            };

        httpObj.open('PUT','http://192.168.1.226:8081/Request',true);
        httpObj.setRequestHeader("Authorization", JSON.stringify(auth));
        httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
        httpObj.send('tid='+ tid +'&empid='+ empid + '&proname=' + proname + '&cause='+ cause + '&source=' + source + '&destination=' + destination + '&fromdate=' + fromdate + '&todate=' + todate + '&no=' + no + '&mode=' + mode + '&priority=' + priority);
      })
      .catch(function(){
        bootbox.alert("please enter valid fields");
      });
  
}

var httpObj2=new XMLHttpRequest();
httpObj2.onreadystatechange=function(){
      if(this.readyState=='4' && this.status=='200'){
        var result=this.responseText;
        result1=JSON.parse(result);
        document.getElementById("empid").value=result1[0].empid;
        document.getElementById("proname").value=result1[0].projectname;
        document.getElementById("cause").value=result1[0].cause;
        document.getElementById("source").value=result1[0].source;
        document.getElementById("destination").value=result1[0].destination;
        document.getElementById("fromdate").value=result1[0].fromdate;
        document.getElementById("todate").value=result1[0].todate;
        document.getElementById("no").value=result1[0].no_days;
        document.getElementById("mode").value=result1[0].mode;
        document.getElementById("sel1").value=result1[0].priority;
      }
    }

  httpObj2.open('GET','http://192.168.1.226:8081/Request/'+tid,true);
  httpObj2.setRequestHeader("Authorization", JSON.stringify(auth));
  httpObj2.setRequestHeader('content-type','application/x-www-form-urlencoded');
  httpObj2.send();


function validate(){

    flag=0;
   return new Promise(function(resolve,reject){
  
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
     if(empid==""||proname==""||cause==""||source==""||destination==""||fromdate==""||no==""||priority==""){
      bootbox.alert(" Please fill in all fields ");
      flag=1;
      }
     fd=new Date(fromdate);
     td=new Date(todate);
     if(fd>td){
      bootbox.alert("from date should be less than to date");
      flag=1;
     }
     flag=check(empid);
     flag=check2(proname);
     flag=check(cause);
     flag=check(source);
     flag=check(destination);
     flag=check(mode);
     flag=check2(no);
     flag=checkday(no);
     /*flag=check3(fromdate);
     flag=check3(todate);*/
      if(flag==0){
        resolve();
      }
      else if(flag==1){
        reject();
      }
  });    

}

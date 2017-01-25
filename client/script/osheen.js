var empid,proname,cause,source,destination,fromdate,todate,no,mode,priority;

$("#empid").click(function(){
      alert("Non editable");
    });

function getproject(){
  console.log("hai");
  var httpObj1=new XMLHttpRequest();
  console.log("hello");
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
  httpObj1.setRequestHeader('content-type','application/x-www-form-urlencoded');
  httpObj1.send();
  document.getElementById("empid").value=sessionStorage.getItem('eid');
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







function submit1(){
    console.log("hfdhd");
     var flag=2;
     validate(flag)
     .then(function(){
         console.log("sfds");
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
            window.alert(" Please fill in all fields ");
            return false;
            }

          else{
            console.log("123");
            var httpObj=new XMLHttpRequest();
            httpObj.onreadystatechange=function(){
              if(this.readyState=='4' && this.status=='200'){
                var result=this.responseText;
                result=JSON.parse(result);
                 if(result.message=="success")
                  window.alert("Your Request is Inserted");
                 else
                  window.alert("Your Request is Not Added");
              }
            };

          httpObj.open('POST','http://192.168.1.226:8081/Request',true);
          httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
          httpObj.send('empid='+ empid + '&proname=' + proname + '&cause='+ cause + '&source=' + source + '&destination=' + destination + '&fromdate=' + fromdate + '&todate=' + todate + '&no=' + no + '&mode=' + mode + '&priority=' + priority);
          }
      })
      catch(function(){
        window.alert("please enter valid fields");
      });
}

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


function validate(flag){

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
     flag=check(cause);
     flag=check(source);
     flag=check(destination);
     flag=check(mode);
     flag=check2(no);
     if(flag==0){
       resolve();
     }
     else if(flag==1){
      reject();
     }


  });
}
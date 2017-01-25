var token=localStorage.getItem('token1');
var role=localStorage.getItem('rolestore');
var id=sessionStorage.getItem('eid');
var auth={'token': token,'role': role,'id1': id};

var empid,proname,cause,source,destination,fromdate,todate,no,mode,priority;
var reg = /^\d+$/;
var regexp = /^[a-zA-Z0-9-_. ]+$/;
//var date1 = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
//var date1 = /^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/;
var flag=0;
function getproject(){
  verify1(0);
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
  httpObj1.setRequestHeader('content-type','application/x-www-form-urlencoded');
  httpObj1.setRequestHeader("Authorization", JSON.stringify(auth));
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

$("#empid").click(function(){
      bootbox.alert("Non editable");
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

// function check3(check){
//   if (check.search(date1) == -1){ 
//     alert('invalid '+ check); 
//     flag=1;
//   }
  
//   return flag;
// }


// jQuery.validator.addMethod("greaterThan", 
// function(value, element, params) {

//     if (!/Invalid|NaN/.test(new Date(value))) {
//         return new Date(value) > new Date($(params).val());
//     }

//     return isNaN(value) && isNaN($(params).val()) 
//         || (Number(value) > Number($(params).val())); 
// },'Must be greater than {0}.');

function validate(){
   return new Promise(function(resolve,reject){
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
     fd=new Date(fromdate);
     td=new Date(todate);
     if(fd>td){
      bootbox.alert("from date should be less than to date");
      flag=1;
     }
     if(empid==""||proname==""||cause==""||source==""||destination==""||fromdate==""||no==""||priority==""){
      bootbox.alert(" Please fill in all fields ");
      flag=1;
     }
           //console.log($("#todate").rules('add', { greaterThan: "#fromdate" }));
     flag=check(empid);
     flag=check2(proname);
     flag=check(cause);
     flag=check(source);
     flag=check(destination);
     flag=check(mode);
     flag=check2(no);
     // flag=check3(fromdate);
     // flag=check3(todate);
     
      if(flag==0){
        resolve();
      }
      else if(flag==1){
        reject();
      }
  });    

}



function submit1(){
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
                  var abc=result.message;
                 if(result.message=="success")
                  bootbox.alert("Your Request is Inserted");
                 else
                  bootbox.alert("Your Request is Not Added "+abc);
              }
            };

          httpObj.open('POST','http://192.168.1.226:8081/Request',true);
          httpObj.setRequestHeader("Authorization", JSON.stringify(auth));
          httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
          httpObj.send('empid='+ empid + '&proname=' + proname + '&cause='+ cause + '&source=' + source + '&destination=' + destination + '&fromdate=' + fromdate + '&todate=' + todate + '&no=' + no + '&mode=' + mode + '&priority=' + priority);
       
      })
      .catch(function(){
        bootbox.alert("please enter valid fields");
      });
  
}
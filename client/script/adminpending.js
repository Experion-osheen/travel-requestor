var token=localStorage.getItem('token1');
var role=localStorage.getItem('rolestore');
var id=sessionStorage.getItem('eid');
var auth={'token': token,'role': role,'id1': id};
var regexp = /^[a-zA-Z0-9-_. ]+$/;
function check(check){
  if ((check.search(regexp) == -1)||(check.length>50)){ 
    //alert('invalid '+ check);
   return true
  }
  
  return false;
}


var httpObj=new XMLHttpRequest();



httpObj.onreadystatechange=function()
{
    console.log(this.readyState);
    //document.getElementById("result").innerHTML=this.status;
    if(this.readyState=='4' && this.status=='200')
    {
        var result=this.responseText;
        result=JSON.parse(result);
            console.log(result[0]);
            content = "<div class='table-responsive'><table class='table table-hover' id='table1'><thead><tr><th>Rid</th><th>EmpID</th><th>Cause</th><th>Source</th><th>Destination</th><th>Mode</th><th>FromDate</th><th>Todate</th><th>No:days</th><th>Priority</th><th>Status</th><th>ProjectId</th><th>Action</th></tr></thead><tbody>";
        var i = 1;
        result.forEach(function(element) {
            content += "<tr><td>"+element.tid+"<td>" + element.empid + "</td><td>" + element.cause + "</td><td>" + element.source + "</td><td>" + element.destination + "</td><td>" + element.mode + "</td><td>" + element.fromdate + "</td><td>" + element.todate + "</td><td>" + element.no_days + "</td><td>" + element.priority + "</td><td>" + element.status + "</td><td>" + element.projectname + "</td><td> <select class='gp' id="+element.tid+" onChange=action1(this.selectedIndex,"+element.tid+")><option value='select'>Select</option><option value='approved'>Approved</option><option value='rejected'>Rejected</option><option value='onhold'>Onhold</option></select></td></tr>";
            i++;
        });
        content += "</tbody> </table> </div>";  
                document.getElementById('tablecontent').innerHTML = content;
                $('#table1').DataTable();
    }
};
httpObj.open('GET','http://192.168.1.226:8081/admin/pending',true);
httpObj.setRequestHeader("Authorization", JSON.stringify(auth));
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.send();

function action1(value,tid){
    if(value==0) status="not done";
    else if(value==1) status="approved";
    else if(value==2) status="rejected";
    else if(value==3) status="pending";

    if(value==2){

    modal1="<button type='button' class='.btn-default buthead' data-toggle='modal' data-target='#myModal'>Open for entering reason for rejection</button><div class='modal fade' id='myModal' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header' id='headreason'><button type='button' class='close' data-dismiss='modal'>&times;</button><h4 class='modal-title'></h4></div><div class='modal-body' id='reasonreject'> <p>Reason for Rejection.</p></div><div class='modal-footer'>"+`<button type="button" class="btn btn-default" data-dismiss="modal" onclick="reasonupload('${tid}')">Close</button>`+"</div></div></div></div>";

 document.getElementById('modal2').innerHTML = modal1;


    }
    console.log(status);
    var httpObj1=new XMLHttpRequest();
    httpObj1.onreadystatechange=function(){
        if(this.readyState=='4' && this.status=='200'){
            var result=this.responseText;

            if(value!=2){
            bootbox.alert("Update Successfully and mail has been sent to the user",function(){
             window.location.reload();   
            });
            console.log(result);
            
            }
            else{
                document.getElementById("headreason").innerText="Reason for rejecting Request "+tid;
                document.getElementById("reasonreject").innerHTML="<textarea class='form-control' rows='5' id='reason'></textarea>";
            }

        }
    };
    httpObj1.open('POST','http://192.168.1.226:8081/status',true);
    httpObj1.setRequestHeader("Authorization", JSON.stringify(auth));
    httpObj1.setRequestHeader('content-type','application/x-www-form-urlencoded');
    httpObj1.send("tid11="+tid+"&status="+status);
}


function reasonupload(rid){
    console.log("hai osheen");
    var httpObj1=new XMLHttpRequest();
    httpObj1.onreadystatechange=function(){
        if(this.readyState=='4' && this.status=='200'){
        var data=this.responseText;
        var result=JSON.parse(data);
            if(result.message=="success") {
               bootbox.alert("Update Successfully and mail has been sent to the user",function(){
               window.location.reload();   
                });
            }
        }

    };
    reason1=document.getElementById('reason').value;
    if(check(reason1)){

        bootbox.alert("enter a valid reason");
        document.getElementById('reason').innerText="";
    }
    else{
    console.log(reason1);
    httpObj1.open('POST','http://192.168.1.226:8081/Reject',true);
    httpObj1.setRequestHeader("Authorization", JSON.stringify(auth));
    httpObj1.setRequestHeader('content-type','application/x-www-form-urlencoded');
    httpObj1.send("tid="+rid+"&reason="+reason1);
    }
}
var token=localStorage.getItem('token1');
var role=localStorage.getItem('rolestore');
var id=sessionStorage.getItem('eid');
var auth={'token': token,'role': role,'id1': id};


var employee=sessionStorage.getItem("eid");
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
            content = "<div class='table-responsive'><table class='table table-hover' id='table1'><thead><tr><th>Cause</th><th>Source</th><th>Destination</th><th>Mode</th><th>FromDate</th><th>Todate</th><th>No:days</th><th>Priority</th><th>ProjectId</th><th>Reason</th></tr></thead><tbody>";
        var i = 1;
        result.forEach(function(element) {
            content += "<tr><td>" + element.cause + "</td><td>" + element.source + "</td><td>" + element.destination + "</td><td>" + element.mode + "</td><td>" + element.fromdate + "</td><td>" + element.todate + "</td><td>" + element.no_days + "</td><td>" + element.priority + "</td><td>" + element.projectname + "</td><td><button class='buthead' onclick='modal1("+element.tid+");' data-toggle='modal' data-target='#myModal'>Details</button></td></tr>";
            i++;
        });
        content += "</tbody> </table> </div>";   
                document.getElementById('container').innerHTML = content;
                $('#table1').DataTable();
    }
};
httpObj.open('GET','http://192.168.1.226:8081/user/'+employee+'/rejected',true);
httpObj.setRequestHeader("Authorization", JSON.stringify(auth));
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.send();


function modal1(id){
    var id2=id;
    modalcontent="<div class='modal fade' id='myModal' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header' id='headreason'><button type='button' class='close' data-dismiss='modal'>&times;</button><h4 class='modal-title'></h4></div><div class='modal-body' id='reasonreject'> <p>Reason for Rejection.</p></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal' onclick='reload1();'>Close</button></div></div></div></div>";
    var httpObj1=new XMLHttpRequest();
        httpObj1.onreadystatechange=function()
        {
            if(this.readyState=='4' && this.status=='200')
            {
                var result=this.responseText;
                result=JSON.parse(result);
                console.log(result);
                console.log(result[0].reason);
                document.getElementById("headreason").innerText="Reason for rejecting Request "+result[0].requestid;
                document.getElementById("reasonreject").innerText= result[0].reason;

            }
        };



    document.getElementById('modal2').innerHTML = modalcontent;
    httpObj1.open('GET','http://192.168.1.226:8081/Reason/'+id2);
    httpObj1.setRequestHeader("Authorization", JSON.stringify(auth));
    httpObj1.send();
}

function reload1(){
    window.location.reload();
}
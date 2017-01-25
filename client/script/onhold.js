var token=localStorage.getItem('token1');
var role=localStorage.getItem('rolestore');
var id=sessionStorage.getItem('eid');
var auth={'token': token,'role': role,'id1': id};
var httpObj=new XMLHttpRequest();
var employee=sessionStorage.getItem("eid");
httpObj.onreadystatechange=function()
{
    console.log(this.readyState);
    //document.getElementById("result").innerHTML=this.status;
    if(this.readyState=='4' && this.status=='200')
    {
        var result=this.responseText;
        result=JSON.parse(result);
            console.log(result[0]);
            content = "<div class='table-responsive'><table class='table table-hover' id='table1'><thead><tr><th>Cause</th><th>Source</th><th>Destination</th><th>Mode</th><th>FromDate</th><th>Todate</th><th>No:days</th><th>Priority</th><th>Status</th><th>ProjectId</th><th>Edit</th></tr></thead><tbody>";
        var i = 1;
        result.forEach(function(element) {
            content += "<tr><td>" + element.cause + "</td><td>" + element.source + "</td><td>" + element.destination + "</td><td>" + element.mode + "</td><td>" + element.fromdate + "</td><td>" + element.todate + "</td><td>" + element.no_days + "</td><td>" + element.priority + "</td><td>" + element.status + "</td><td>" + element.projectname + "</td><td><button class='buthead' onclick='edit1("+element.tid+");' id="+element.tid+">Edit</button></td></tr>";
            i++;
        });
        content += "</tbody> </table> </div>";  
                document.getElementById('tablecontent').innerHTML = content;
                 $('#table1').DataTable();
    }
};
httpObj.open('GET','http://192.168.1.226:8081/user/'+employee+'/pending',true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.setRequestHeader("Authorization", JSON.stringify(auth));
httpObj.send("eid="+employee);

function edit1(tid){
    console.log(tid);
    sessionStorage.setItem('tid',tid);
    window.location = "edit1.html";
}

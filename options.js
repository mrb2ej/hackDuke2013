txtPassword = document.getElementById("txtPassword");
txtUsername = document.getElementById("txtUsername");
pswPassword = document.getElementById("pswPassword");
btnSave = document.getElementById("btnSave");

document.getElementById("btnSave").onclick = function(){
	localStorage['api_key'] = document.getElementById("txtPassword").value;
	alert("Account Information Saved Successfully!");
}
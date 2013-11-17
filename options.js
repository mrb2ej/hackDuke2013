txtPassword = document.getElementById("txtPassword");
btnSave = document.getElementById("btnSave");

document.getElementById("btnSave").onclick = function(){
	localStorage['api_key'] = document.getElementById("txtPassword").value;
	alert("Saved Successfully!");
}
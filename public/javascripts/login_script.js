window.addEventListener("DOMContentLoaded", script_start);

function script_start() {
	buttonLog = document.getElementById("login");
	buttonLog.onclick = checkForm;
	console.log(buttonLog)
};

function checkForm() {
	usernameEmail = document.getElementById("username");
	password1 = document.getElementById("password");
	
	if(usernameEmail.value.length <= 255 && username.value.length > 5) {
		if (password1.value.length <= 255 && password1.value.length > 5) {
			name = usernameEmail.value
			if(name.includes("?") || name.includes("<") || name.includes(">") || name.includes("<") || name.includes("&") || name.includes("\"")) {
				alert("Vstup nesmí obsahovat nepovolené znaky: < > & \" ?")
				return false;
			} else {
				return true;
			}
		} else {
			alert("Zadejte heslo v rozsahu 6 - 255 znaků.")
			return false;
		}
	} else {
		alert("Zadejte uživatelské jméno v rozsahu 6 - 63 znaků, nebo email v rozsahu 6 - 255 znaků.");
		return false;
	}
}
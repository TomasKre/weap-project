window.addEventListener("DOMContentLoaded", script_start);

function script_start() {
	buttonReg = document.getElementById("register");
	buttonReg.onclick = checkForm;
};

function checkForm() {
	username = document.getElementById("username");
	email = document.getElementById("email");
	password1 = document.getElementById("password1");
	password2 = document.getElementById("password2");
	
	if(username.value.length <= 63 && username.value.length > 5) {
		if (email.value.length <= 255 && email.value.length > 5) {
			if (password1.value.length <= 255 && password1.value.length > 5) {
				if (password1.value == password2.value) {
					name = username.value
					if(name.includes("?") || name.includes("<") || name.includes(">") || name.includes("<") || name.includes("&") || name.includes("\"")) {
						alert("Vstupy nesmí obsahovat nepovolené znaky: < > & \" ?")
						return false;
					} else {
						return true;
					}
				} else {
					alert("Zadaná hesla se neshodují.")
					return false;
				}
			} else {
				alert("Zadejte heslo v rozsahu 6 - 255 znaků.")
				return false;
			}
		} else {
			alert("Zadejte email v rozsahu 6 - 255 znaků.");
			return false;
		}
	} else {
		alert("Zadejte uživatelské jméno v rozsahu 6 - 63 znaků.");
		return false;
	}
}
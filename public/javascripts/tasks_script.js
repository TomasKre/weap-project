window.addEventListener("DOMContentLoaded", script_start);

function script_start() {
	addEventListenersToFilterButtons();
	addEventListenersToAddUpdateButtons();	
};

function addEventListenersToAddUpdateButtons () {
	buttons = document.getElementsByClassName("crud_buttons")
	
	for(var i = 0; i < buttons.length; i++) {
		buttons[i].onclick = checkForm;
	}
}

function addEventListenersToFilterButtons () {
	buttons = document.getElementsByClassName("tasks_buttons")
	
	for(var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener("click", displayTasks);
	}
}

function checkForm() {
	title = document.getElementById("title");
	content = document.getElementById("content");
	console.log(title.value);
	if(content.value.length <= 256) {
		if (title.value.length <= 64) {
			return true;
		} else {
			alert("Nadpis je příliš dlouhý (max 64 znaků).");
			return false;
		}
	} else {
		alert("Popisek je příliš dlouhý (max 256 znaků).");
		return false;
	}
}

function displayTasks(eventOnButton) {
	leaves = document.getElementsByTagName("li");

	buttonId = eventOnButton.target.id;
	
	for(let i = 0; i < leaves.length; i++) {
		switch (buttonId) {
		case 'all':
			leaves[i].style.display = "block"
			break;
		case 'finished':
			if (leaves[i].style.backgroundColor == 'rgb(136, 255, 136)') {
				leaves[i].style.display = "block"
			} else {
				leaves[i].style.display = "none"
			}
			break;
		case 'notfinished':
			if (leaves[i].style.backgroundColor == 'rgb(255, 136, 136)') {
				leaves[i].style.display = "block"
			} else {
				leaves[i].style.display = "none"
			}
			break;
		};
	};
};
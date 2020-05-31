window.addEventListener("DOMContentLoaded", script);

function script() {
	buttons = document.getElementsByClassName("tasks_buttons")

	for(var i = 0; i < buttons.length; i++) {
		addEventListener("click", displayTasks);
	}
};

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
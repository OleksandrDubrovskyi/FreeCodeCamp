const gametable = document.querySelector("#gametable");
const test = document.querySelector("#test");
let times = 1;
let usedColors = [];
let esersColors = [];

test.innerText = "";

function chooseColor() {
	let colors = ["red", "green", "yellow", "blue"];
	let color = colors[Math.floor(Math.random() * 4)];
	usedColors.push(color);

	return color;
}

function showColors() {
	for (let index = 0; index < usedColors.length; index++) {
		test.innerText = usedColors[index];
	}

}

// function receiveUserChoices() {
// 	let usersChoice = clickEvent(e);
// }

function clickEvent (e) {
	console.log(chooseColor());
	console.log(usedColors);

	let usersChoice = e.target.id;
	console.log(usersChoice);
}

// function gamePlay() {
// 	chooseColor();
// 	showColors();

// 	for (let i = 0; i < times; i++) {
// 		receiveUserChoices();		
// 	}

// 	times++;
// }

gametable.addEventListener('click', clickEvent, false);


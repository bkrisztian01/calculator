function operate(operator, x, y) {
	switch (operator) {
		case "+": 
			return x + y;
			break;
		case "-": 
			return x - y;
			break;
		case "*": 
			return x * y;
			break;
		case "/": 
			return x / y;
			break;
		default:
			console.log("ERROR");
			break;
		}
}

function resetVariables() {
	lastOperator = null;
	x = 0;
	y = 0;
	lastWasOperator = false;
}

function numberPress(number) {
	if (display.textContent == "0" || lastWasOperator == true || lastWasAnswer) {
	 		display.textContent = number;
	 		lastWasOperator = false;
	 		lastWasAnswer = false;
 	}
 	else {
 		display.textContent += number;
 	}
}

function decimalPress() {
	if (display.textContent.indexOf(".") == -1) {
			display.textContent += ".";
	}
}

function operatorPress(operator) {
	if (lastWasOperator == false && lastOperator !== null) {
			y = parseFloat(display.textContent);
			x = operate(lastOperator, x, y);
			lastOperator = operator;
		}
		else if (lastWasOperator == true && lastOperator !== null) {
			lastOperator = operator;
		}
		else if (lastWasOperator == false && lastOperator == null) {
			x = parseFloat(display.textContent);
			lastOperator = operator;
		}
		lastWasOperator = true;
}

function equalPress() {
	if (lastWasOperator == true) {
		display.textContent = String(x);
		resetVariables();
	}
	else if (lastWasAnswer  == false && lastOperator !== null) {
		y = parseFloat(display.textContent);
		x = operate(lastOperator, x, y);
		display.textContent = String(x);
		resetVariables();
	}
	lastWasAnswer = true;
}

function backspacePress() {
	if (display.textContent !== "0") {
		var temp = display.textContent.split("");
		temp.pop();
		display.textContent = temp.join("");
		if (display.textContent == "") {
			display.textContent = "0";
		}
	}
}

function buttonPress(event) {
	var key;
	//TODO: fix problem when you press on screen button with keyboard buttons (=)
	if (event.type == "click") { //if clicked on a button
		key = this.textContent;
	}
	else if (event.type == "keydown") {
		key = event.key;
	}

	if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].indexOf(key) !== -1) {
	 	numberPress(key);
	}
	else if (key == ".") {
		decimalPress();
	}
	else if (["/", "*", "-", "+"].indexOf(key) !== -1) {
		operatorPress(key);
	}
	else if (key == "=" || key == "Enter") {
		equalPress();
	}
	else if (key == "AC") {
		resetVariables();
		display.textContent = "0";
	}
	else if (key == "<-" || key == "Backspace") {
		backspacePress();
	}
}

var display = document.querySelector("#display");
var buttons = document.querySelectorAll("button");
var lastWasOperator = false;
var lastOperator = null;
var lastWasAnswer = false;
var x = 0;
var y = 0;

for (var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", buttonPress);
}

document.addEventListener("keydown", buttonPress);
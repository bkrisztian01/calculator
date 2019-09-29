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

function buttonPress() {
	var buttonText = this.textContent;
	if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].indexOf(buttonText) !== -1) {
	 	if (display.textContent == "0" || lastWasOperator == true || lastWasAnswer) {
	 		display.textContent = buttonText;
	 		lastWasOperator = false;
	 		lastWasAnswer = false;
	 	}
	 	else {
	 		display.textContent += buttonText;
	 	}
	}

	else if (buttonText == ".") {
		if (display.textContent.indexOf(buttonText) == -1) {
			display.textContent += buttonText;
		}
	}

	else if (["/", "*", "-", "+"].indexOf(buttonText) !== -1) {
		if (lastWasOperator == false && lastOperator !== null) {
			y = parseFloat(display.textContent);
			x = operate(lastOperator, x, y);
			lastOperator = buttonText;
		}
		else if (lastWasOperator == true && lastOperator !== null) {
			lastOperator = buttonText;
		}
		else if (lastWasOperator == false && lastOperator == null) {
			x = parseFloat(display.textContent);
			lastOperator = buttonText;
		}
		lastWasOperator = true;
	}

	else if (buttonText == "=") {
		if (lastWasOperator == true) {
			resetVariables();
		}
		else if (lastWasAnswer  == false) {
			y = parseFloat(display.textContent);
			x = operate(lastOperator, x, y);
			display.textContent = String(x);
			resetVariables();
		}
		lastWasAnswer = true;
	}
	else if (buttonText == "AC") {
		resetVariables();
		display.textContent = "0";
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
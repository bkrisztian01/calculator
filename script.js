var states = [
	{
		"name": "Ready",
		"initial": true,
		"events": {
			"NumberPress": "TypingNumber1",
			"OperatorPress": "TypingOperator",
			"EqualPress": "DisplayingResult"
		}
	},
	{
		"name": "TypingNumber1",
		"events": {
			"OperatorPress": "TypingOperator",
			"EqualPress": "DisplayingResult",
			"Reset": "Ready"
		}
	},
	{
		"name": "TypingNumber2",
		"events": {
			"OperatorPress": "TypingOperator",
			"EqualPress": "DisplayingResult",
			"Reset": "Ready"
		}
	},
	{
		"name": "DisplayingResult",
		"events": {
			"Reset": "Ready",
			"NumberPress": "TypingNumber1",
			"OperatorPress": "TypingOperator"
		}
	},
	{
		"name": "TypingOperator",
		"events": {
			"Reset": "Ready",
			"NumberPress": "TypingNumber2"
		}
	}
];

function StateMachine(states) {
	this.states = states;
	this.indexes = {};
	for (var i = 0; i < this.states.length; i++) {
		this.indexes[this.states[i].name] = i;
		if (this.states[i].initial) {
      		this.currentState = this.states[i];
    	}
	}
};

StateMachine.prototype.consumeEvent = function(e) {
	if (this.currentState.events[e]) {
		this.currentState = this.states[this.indexes[this.currentState.events[e]]]
	}
}

StateMachine.prototype.getStatus = function() {
	return this.currentState.name;
}

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
}

function numberPress(number) {
	if (sm.getStatus() == "Ready" || sm.getStatus() == "TypingOperator" || sm.getStatus() == "DisplayingResult") {
	 		display.textContent = number;
	 		sm.consumeEvent("NumberPress");
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
	if (sm.getStatus() == "TypingNumber2") {
			y = parseFloat(display.textContent);
			x = operate(lastOperator, x, y);
			lastOperator = operator;
		}
		else if (sm.getStatus() == "TypingOperator") {
			lastOperator = operator;
		}
		else if (sm.getStatus() == "TypingNumber1" || sm.getStatus() == "Ready" || sm.getStatus() == "DisplayingResult") {
			x = parseFloat(display.textContent);
			lastOperator = operator;
		}
		sm.consumeEvent("OperatorPress");
}

function equalPress() {
	if (sm.getStatus() == "TypingOperator") {
		display.textContent = String(x);
		resetVariables();
	}
	else if (sm.getStatus() == "TypingNumber2") {
		y = parseFloat(display.textContent);
		x = operate(lastOperator, x, y);
		display.textContent = String(x);
		resetVariables();
	}
	sm.consumeEvent("EqualPress");
}

function acPress() {
	resetVariables();
	display.textContent = "0";
	sm.consumeEvent("Reset");
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
		acPress();
	}
	else if (key == "<-" || key == "Backspace") {
		backspacePress();
	}
}

var sm = new StateMachine(states);
var display = document.querySelector("#display");
var buttons = document.querySelectorAll("button");
var lastOperator = null;
var x = 0;
var y = 0;

for (var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", buttonPress);
}

document.addEventListener("keydown", buttonPress);
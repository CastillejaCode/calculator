"use strict";

const displayUpper = document.querySelector(".display-upper");
const displayInput = document.querySelector(".display-input");
const displayOutput = document.querySelector(".display-output");

const btnOperator = document.querySelectorAll(".operator");
const btnClear = document.querySelector(".clear");
const btnDelete = document.querySelector(".delete");
const buttons = document.querySelectorAll(".button");
const btnEqual = document.querySelector(".equal");
const btnSquareroot = document.querySelector(".squareroot");

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;
const exponent = (x, y) => x ** y;
const squareroot = (x) => Math.sqrt(x);

const operate = (x, y, fx) => {
	if (fx === squareroot) return fx(x);
	else return fx(x, y);
};

let operation = "";
let term1;
let term2;
let operator;
let subOperation;
let answer = "";
let count = 0;

//////Functions//////
const checkError = function () {
	if (answer == "Infinity") {
		answer = "DIVIDE BY 0 ERROR";
		displayInput.textContent = `:(`;
		resetScreen();
	}
	if (answer.toString() == "NaN") {
		answer = "SYNTAX ERROR";
		displayInput.textContent = `:(`;
		resetScreen();
	}
};

const updateDisplay = function () {
	displayInput.textContent = operation;
	checkError();
	displayOutput.textContent = answer;
};

const resetScreen = function () {
	setTimeout(() => {
		operation = answer = "";
		updateDisplay();
	}, 1000);
};

const checkDecimal = function () {
	if (answer % 1 != 0) answer = Math.round(answer * 100) / 100;
};

/////////Event Handlers/////////

//Update display with each button input
buttons.forEach((e) =>
	e.addEventListener("click", (e) => {
		operation += e.target.value;
		updateDisplay();
	})
);

//Create first term with operator button
btnOperator.forEach((e) =>
	e.addEventListener("click", (e) => {
		//Allow adding answer to new number
		if (answer) {
			operation = answer + `${e.target.value}`;
			answer = "";
			updateDisplay();
		}

		//Allow using operator to find answer and continue equation
		if (operation.match(/[*^+/√-]/g).length > 1) {
			term2 = operation.replace(subOperation, "").replace(/[*^+/√-]/g, "");
			if (operation.match("√")) {
				term1 = operation.replace(/[\D]/g, "");
				if (operation.slice(-1) == "√") term1 = term1.slice(0, 1);
			}

			answer = operate(term1, term2, operator);
			checkDecimal();
			checkError();
			operation = answer + `${e.target.value}`;
			if (operation.slice(-1) == "√") operation = `${e.target.value}` + answer;
			answer = "";
			updateDisplay();
		}

		term1 = +operation.substring(0, operation.length - 1);
		if (e.target.value === "/") operator = divide;
		if (e.target.value === "*") operator = multiply;
		if (e.target.value === "-") operator = subtract;
		if (e.target.value === "+") operator = add;
		if (e.target.value === "^") operator = exponent;
		if (e.target.value === "√") operator = squareroot;

		//Used to create term2
		subOperation = operation;
	})
);

//Create equal button functionality
btnEqual.addEventListener("click", () => {
	term2 = Number(operation.replace(subOperation, ""));

	if (operation.match("√")) term1 = operation.replace("√", "");

	if (!operation.match(/[*^+/√-]/g)) {
		answer = "SYNTAX ERROR";
		resetScreen();
	} else answer = operate(term1, term2, operator);

	checkDecimal();
	updateDisplay();
});

btnClear.addEventListener("click", (e) => {
	operation = answer = "";
	updateDisplay();
});

btnDelete.addEventListener("click", (e) => {
	operation = operation.substring(0, operation.length - 1);
	updateDisplay();
});

//////End//////

//Potential keyabord support

// document.addEventListener("keydown", (e) => {
// 	console.log(e.key);
// 	if (!e.key.match(/[0-9]/g) && !e.key.match(/[*^+/√-]/g)) return;
// 	else operation += e.key;
// 	updateDisplay();
// });

// document.addEventListener("keydown", (e) => {
// 	if (e.key === "Backspace")
// 		operation = operation.substring(0, operation.length - 1);
// 	updateDisplay();
// });

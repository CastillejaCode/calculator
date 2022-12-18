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

const divideByZer0 = function () {
	if (answer == "Infinity") {
		answer = "DIVIDE BY 0 ERROR";
		displayInput.textContent = `:(`;
		resetScreen();
	}
};

const updateDisplay = function () {
	displayInput.textContent = operation;
	divideByZer0();
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

buttons.forEach((e) =>
	e.addEventListener("click", (e) => {
		// if (!answer) {
		// 	operation = answer = "";
		// 	updateDisplay();
		// }
		operation += e.target.value;
		updateDisplay();
	})
);

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
			divideByZer0();
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
		subOperation = operation;
	})
);

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

console.log(Math.round(9.856 * 100) / 100);
// const changeDisplay = function () {
// 	displayElement.textContent += this.textContent;
// 	display = displayElement.value = displayElement.textContent;
// };

// const clearDisplay = function () {
// 	displayElement.textContent = "";
// 	firstNumber = secondNumber = operator = answer = "";
// };

// const operateAnswer = function () {
// 	secondNumber = Number(
// 		display.replace(firstNumber, "", 1).replace(/[+/*-]/g, "")
// 	);
// 	console.log(secondNumber);

// 	if (operator === "+") answer = add(firstNumber, secondNumber);
// 	if (operator === "-") answer = subtract(firstNumber, secondNumber);
// 	if (operator === "*") answer = multiply(firstNumber, secondNumber);
// 	if (operator === "/") answer = divide(firstNumber, secondNumber).toFixed(1);

// 	count = 0;

// 	if (answer === "Infinity") {
// 		displayElement.textContent = `You can't divide by 0!`;
// 	} else displayElement.textContent = answer;
// };

// btns.forEach((e) => e.addEventListener("click", changeDisplay));
// // btns.forEach((e) => e.addEventListener("click", clearDisplay));

// btnClear.addEventListener("click", clearDisplay);

// btnOperator.forEach((e) =>
// 	e.addEventListener("click", function () {
// 		count++;
// 		if (count > 1) {
// 			operateAnswer();
// 			displayElement.textContent += this.textContent;
// 			firstNumber = answer;
// 			operator = this.textContent;
// 			count = 0;
// 		} else {
// 			firstNumber = display.replace(this.textContent, "");
// 			operator = this.textContent;
// 		}
// 	})
// );
// //When equal pressed, parse variables into operate fx

// btnEqual.addEventListener("click", operateAnswer);

// //After display, reset display when press another number

"use strict";

const displayUpper = document.querySelector(".display-upper");
const displayInput = document.querySelector(".display-input");
const displayOutput = document.querySelector(".display-output");
const btnOperator = document.querySelectorAll(".operator");

const btnClear = document.querySelector(".clear");
const btnDelete = document.querySelector(".delete");
const buttons = document.querySelectorAll(".button");
const btnEqual = document.querySelector(".equal");

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;
const exponent = (x, y) => x ** y;

const operate = (x, y, fx) => fx(x, y);

let operation = "";
let term1;
let term2;
let operator;
let subOperation;
let answer;
let count = 0;

const updateDisplay = function () {
	displayInput.textContent = operation;
	displayOutput.textContent = answer;
};

buttons.forEach((e) =>
	e.addEventListener("click", (e) => {
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
		console.log(operation);
		// if (operation.match(/[*^+/-]/g).length > 1 && !displayOutput.textContent) {
		// 	term2 = operation
		// 		.substring(0, operation.length - 1)
		// 		.replace(subOperation, "");
		// 	answer = operate(term1, term2, operator);
		// 	displayInput.textContent = operation = answer + `${e.target.value}`;
		// 	answer = "";
		// 	console.log(operation, answer);

		term1 = Number(operation.substring(0, operation.length - 1));
		if (e.target.value === "/") operator = divide;
		if (e.target.value === "*") operator = multiply;
		if (e.target.value === "-") operator = subtract;
		if (e.target.value === "+") operator = add;
		if (e.target.value === "^") operator = exponent;

		subOperation = operation;
	})
);

btnEqual.addEventListener("click", () => {
	term2 = Number(operation.replace(subOperation, ""));
	answer = operate(term1, term2, operator);

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

"use strict";

const displayElement = document.querySelector(".display");
const btnClear = document.querySelector(".clear");
const btns = document.querySelectorAll(".button");
const btnOperator = document.querySelectorAll(".operator");
const btnEqual = document.querySelector(".equal");

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

const operate = (x, y, fx) => fx(x, y);

let firstNumber;
let secondNumber;
let operator;
let display;
let answer;
let count = 0;

const changeDisplay = function () {
	displayElement.textContent += this.textContent;
	display = displayElement.value = displayElement.textContent;
};

const clearDisplay = function () {
	displayElement.textContent = "";
	firstNumber = secondNumber = operator = answer = "";
};

const operateAnswer = function () {
	secondNumber = Number(
		display.replace(firstNumber, "", 1).replace(/[+/*-]/g, "")
	);
	console.log(secondNumber);

	if (operator === "+") answer = add(firstNumber, secondNumber);
	if (operator === "-") answer = subtract(firstNumber, secondNumber);
	if (operator === "*") answer = multiply(firstNumber, secondNumber);
	if (operator === "/") answer = divide(firstNumber, secondNumber).toFixed(1);

	count = 0;

	if (answer === "Infinity") {
		displayElement.textContent = `You can't divide by 0!`;
	} else displayElement.textContent = answer;
};

btns.forEach((e) => e.addEventListener("click", changeDisplay));
// btns.forEach((e) => e.addEventListener("click", clearDisplay));

btnClear.addEventListener("click", clearDisplay);

btnOperator.forEach((e) =>
	e.addEventListener("click", function () {
		count++;
		if (count > 1) {
			operateAnswer();
			displayElement.textContent += this.textContent;
			firstNumber = answer;
			operator = this.textContent;
			count = 0;
		} else {
			firstNumber = display.replace(this.textContent, "");
			operator = this.textContent;
		}
	})
);
//When equal pressed, parse variables into operate fx

btnEqual.addEventListener("click", operateAnswer);

//After display, reset display when press another number

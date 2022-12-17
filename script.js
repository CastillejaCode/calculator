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

const changeDisplay = function () {
	displayElement.textContent += this.textContent;
	display = displayElement.value = displayElement.textContent;
};

const clearDisplay = function () {
	displayElement.textContent = "";
};

btns.forEach((e) => e.addEventListener("click", changeDisplay));
// btns.forEach((e) => e.addEventListener("click", clearDisplay));

btnClear.addEventListener("click", clearDisplay);

//Save first number to variable when operator pressed
let answer;
const operateAnswer = function () {
	secondNumber = +display.replace(firstNumber, "").replace(/[+-/*]/g, "");
	if (operator === "+") answer = add(firstNumber, secondNumber);
	if (operator === "-") answer = subtract(firstNumber, secondNumber);
	if (operator === "*") answer = multiply(firstNumber, secondNumber);
	if (operator === "/") answer = divide(firstNumber, secondNumber).toFixed(1);

	displayElement.textContent = answer;
};
btnOperator.forEach((e) =>
	e.addEventListener("click", function () {
		let count = display.match(/[+-/*]/g).length;
		if (count > 1) {
			operateAnswer();
			displayElement.textContent += this.textContent;
			firstNumber = answer;
			console.log(firstNumber);
			count = 0;
			operator = this.textContent;
		} else {
			firstNumber = +display.replace(this.textContent, "");
			operator = this.textContent;
		}
		// if(display.contains	)
	})
);
//When equal pressed, parse variables into operate fx

btnEqual.addEventListener("click", operateAnswer);

//After display, reset display when press another number

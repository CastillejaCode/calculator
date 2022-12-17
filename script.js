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
btnOperator.forEach((e) =>
	e.addEventListener("click", function () {
		firstNumber = +display.replace(e.textContent, "");
		operator = this.textContent;
	})
);
//When equal pressed, parse variables into operate fx
btnEqual.addEventListener("click", function () {
	secondNumber = +display.replace(firstNumber, "").replace(/[+-/*]/g, "");

	if (operator === "+") operator = add(firstNumber, secondNumber);
	if (operator === "-") operator = subtract(firstNumber, secondNumber);
	if (operator === "*") operator = multiply(firstNumber, secondNumber);
	if (operator === "/") operator = divide(firstNumber, secondNumber).toFixed(1);

	displayElement.textContent = operator;
	operator = false;
});

//After display, reset display when press another number

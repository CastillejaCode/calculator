"use strict";

const display = document.querySelector(".display");
const clear = document.querySelector(".clear");
const buttons = document.querySelectorAll(".button");

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

const operate = (x, y, fx) => fx(x, y);

buttons.forEach((e) =>
	e.addEventListener("click", function () {
		display.textContent += this.textContent;
		display.value = display.textContent;
		console.log(display.value);
	})
);

clear.addEventListener("click", function () {
	display.textContent = "";
});

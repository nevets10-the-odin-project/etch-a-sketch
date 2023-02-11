"use strict";

createGrid(16);

function createGrid(selectedSize) {
	const gridSize = selectedSize ** 2;

	const main = document.querySelector(".main");
	const currentContainer = document.querySelector(".container");
	const newContainer = document.createElement("div");
	newContainer.classList.add("container");
	newContainer.addEventListener("mouseover", changeBackground);

	for (let i = 1; i <= gridSize; i++) {
		const itemDiv = document.createElement("div");
		itemDiv.classList.add("item");

		newContainer.appendChild(itemDiv);
	}

	if (currentContainer) {
		newContainer.style.gridTemplateColumns = `repeat(${selectedSize}, 1fr)`;
		currentContainer.replaceWith(newContainer);
	} else {
		main.appendChild(newContainer);
	}
}

function changeBackground(e) {
	if (e.target.style.background)
		e.target.style.background = darken(e.target.style.background);
	e.target.style.background = `hsl(${getRandomHue()}, 100%, 50%)`;
}

function darken(currentColor) {
	const RGBArray = currentColor
		.replaceAll(" ", "")
		.slice(4, -1)
		.split(",")
		.map((value) => +value);

	const max = Math.max(...RGBArray);
	const min = Math.min(...RGBArray);
	const lightness = 0.5 * (max / 255) + 0.5 * (min / 255);
	const hue = getHueFromRGB(RGBArray, max, min);
	console.log(hue);
}

function getHueFromRGB(RGBArray, max, min) {
	const red = RGBArray[0];
	const green = RGBArray[1];
	const blue = RGBArray[2];
	const chroma = max - min;
	let hue = 0;

	if (red === max) {
		hue = (((green - blue) / chroma) % 6) * 60;
	} else if (green === max) {
		hue = ((blue - red) / chroma + 2) * 60;
	} else {
		hue = ((red - green) / chroma + 4) * 60;
	}

	return hue;
}

function getRandomHue() {
	return Math.floor(Math.random() * 360);
}

const resizeBtn = document.querySelector(".resize");
resizeBtn.addEventListener("click", showResizeDialog);

const resizeDialog = document.querySelector(".resize-dialog");

function showResizeDialog() {
	resizeDialog.showModal();
}

const resizeForm = document.querySelector(".resize-form");
const resizeInput = document.querySelector("#new-size");
resizeForm.addEventListener("submit", getNewSize);

function getNewSize() {
	const newSize = document.querySelector("#new-size");
	createGrid(+newSize.value);
}

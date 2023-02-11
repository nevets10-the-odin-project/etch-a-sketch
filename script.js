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
	if (e.target.style.background) {
		const hue = e.target.getAttribute("data-hue");
		const newLightness = +e.target.getAttribute("data-lightness") - 5;
		e.target.style.background = `hsl(${hue}, 100%, ${newLightness}%)`;
		e.target.setAttribute("data-lightness", newLightness);
	} else {
		const newHue = getRandomHue();
		e.target.style.background = `hsl(${newHue}, 100%, 50%)`;
		e.target.setAttribute("data-hue", newHue);
		e.target.setAttribute("data-lightness", 50);
	}
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

"use strict";

createGrid(16);

function createGrid(selectedSize) {
	const gridSize = selectedSize ** 2;

	const containerDiv = document.createElement("div");
	containerDiv.classList.add("container");
	containerDiv.addEventListener("mouseover", changeBackground);

	for (let i = 1; i <= gridSize; i++) {
		const itemDiv = document.createElement("div");
		itemDiv.classList.add("item");

		containerDiv.appendChild(itemDiv);
	}

	const body = document.querySelector("body");
	body.appendChild(containerDiv);
}

function changeBackground(e) {
	e.target.style.background = "black";
}

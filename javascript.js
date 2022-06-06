"use strict";

// Regular expression used for input validation
const regex = /^\d{1,3}$/;

let gridInput = getInput();

const grid = parseInt(gridInput);
const myScale = 960 / grid;


makeGrid(grid);



function makeGrid(scale) {
    const squaresWrap = document.querySelector('#squaresWrap');

    // Create <scale> columns
    for (let i = 0; i < scale; i++) {
        const colWrap = document.createElement('div');
        colWrap.classList.add('colWrap');
        squaresWrap.appendChild(colWrap);

        // Create <scale> squares in one column on each iteration
        for (let j = 0; j < scale; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            colWrap.appendChild(square);
            square.addEventListener("mouseenter", changeColor);
            square.style.height = myScale + "px";
            square.style.width = myScale + "px";
        }
    }


}

function changeColor(e) {
    e.target.classList.add('etched');
}

function validateInput(uInput) {
    if (!regex.test(uInput)) {
        alert("Please enter an integer between 1 and 100");
        return false;
    }

    if ((uInput < 1) || (uInput > 100)) {
        alert("Please enter an integer between 1 and 100");
        return false;
    }

    return true;
}

function removeGrid() {
    const remover = document.getElementById("squaresWrap");
    remover.remove();
}

// Reset the grid by deleting squaresWrap, re-creating it and putting it
// into squaresBox, asking for the new grid size, and calling makeGrid() again
function resetGrid() {
    removeGrid();
    const squaresBox = document.querySelector("#squaresBox");
    const squaresWrap = document.createElement('div');
    squaresWrap.setAttribute("id","squaresWrap");
    squaresBox.appendChild(squaresWrap);
    let newScale = getInput();
    makeGrid(newScale);
}

function getInput() {
    let myInput = 0;
    let isValid = false;

    do {
        myInput = prompt("Enter grid size");
        isValid = validateInput(myInput);
    } while (!isValid)

    return myInput;
}
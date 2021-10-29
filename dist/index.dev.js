"use strict";

require("./data/boards");

//vars
var timer;
var selectedNum;
var selectedTile;
var disableSelect;
var cells; // loaded only once but cant declare it as global const as it is populated later????

var userEntries = ""; //selectedGame=newBoard//make this dynamic

var sleep = function sleep(milliseconds) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, milliseconds);
  });
};

window.onload = function () {
  //Create blank table, format it and add listeners
  var cell;
  var table = document.getElementById("table");

  for (var i = 0; i < 81; i++) {
    //create 81 cells and add to table
    cell = document.createElement("p");
    cell.id = i;
    cell.innerHTML = " ";
    cell.classList.add("cell"); //add right and bottom border classes

    if ((i + 1) % 3 == 0) {
      cell.classList.add("cell--rightBorder");
    }

    if (i > 17 && i < 27 || i > 44 && i < 54) {
      cell.classList.add("cell--bottomBorder");
    }

    cell.addEventListener("click", handleCellClick);
    table.appendChild(cell);
  }

  newGame();
};

function loadGame() {
  var cells = document.getElementsByClassName("cell");

  for (var i = 0; i < cells.length; i++) {
    var cellValue = selectedGame[0].charAt(i);

    if (cellValue == "-") {
      cells[i].innerHTML = " ";
      cells[i].classList.remove("cell--fixedd");
    } else {
      cells[i].innerHTML = cellValue;
      cells[i].classList.add("cell--fixedd");
    }
  }

  var selectedCell = document.querySelector(".cell.cell--selected");

  if (selectedCell) {
    //if no cell is selected, select the curent one.
    selectedCell.classList.remove("cell--selected"); //clear selection 
  }

  userEntries = selectedGame[0]; //initialize board
}

function newGame() {
  //select random game from 0-9
  selectedGame = boards[Math.floor(Math.random() * 10)];
  loadGame();
}

function resetGame() {
  userEntries = selectedGame[0]; //initialize board

  loadGame();
}

function handleCellClick() {
  clickedCell = this; // console.log(clickedCell.classList);

  if (clickedCell.classList.value.includes("cell--fixedd")) {
    return;
  } //dont allow selection of fixed cells


  var selectedCell = document.querySelector(".cell.cell--selected");

  if (!selectedCell) {
    //if no cell is selected, select the curent one.
    clickedCell.classList.add("cell--selected");
    return;
  }

  selectedCell.classList.remove("cell--selected"); //clear selection  

  if (clickedCell.id != selectedCell.id) {
    //If there is a selected cell and some other cell is clicked, select this cell.        
    clickedCell.classList.add("cell--selected");
  }
}

function handleNumberClick(numClicked) {
  var selectedCell = document.querySelector(".cell.cell--selected");

  if (!selectedCell) {
    //if no cell is selected, do nothing.
    return;
  }

  if (validateUserEntry(numClicked.innerHTML, selectedCell.id)) {
    selectedCell.classList.remove("cell--selected"); //clear selection
    // if(selectedCell.classList.includes("cell--error"))

    selectedCell.classList.remove("cell--error");
    selectedCell.innerHTML = numClicked.innerHTML; //Add number value to selectedCell.innerHTML to selected cell  

    userEntries = userEntries.split('');
    userEntries[selectedCell.id] = numClicked.innerHTML; //add to useEntries array

    userEntries = userEntries.join(''); //check for game completion

    if (userEntries === selectedGame[1]) {
      console.log("Game completed!!");
    }
  } else {
    //entry is invalid
    selectedCell.innerHTML = numClicked.innerHTML; //Add number value to selectedCell.innerHTML to selected cell  

    selectedCell.classList.add("cell--error"); //display cell error
    // sleep(3000).then(() => console.log("waited 1 second!"))
    // selectedCell.innerHTML=" "//remove entry
    // selectedCell.classList.remove("cell--error");//clear error formatting

    selectedCell.classList.remove("cell--selected"); //clear selection
  }
}

function validateUserEntry(numberEntered, cellIndex) {
  if (numberEntered === selectedGame[1].charAt(cellIndex)) {
    console.log("validateUserEntry=true");
    return true;
  } else {
    console.log("validateUserEntry=false");
    return false;
  }
}
"use strict";

//load boards 
var easy = [//"6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
"68532917497148532623476185936257498154961873271829346582394651719785264345613729-", "685329174971485326234761859362574981549618732718293465823946517197852643456137298"];
var medium = ["--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--", "619472583243985617587316924158247369926531478734698152891754236365829741472163895"];
var hard = ["-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--", "712583694639714258845269173521436987367928415498175326184697532253841769976352841"]; //vars

var timer;
var selectedNum;
var selectedTile;
var disableSelect;
var cells; // loaded only once but cant declare it as global const as it is populated later????

var userEntries = "";
selectedGame = easy; //make this dynamic

window.onload = function () {
  //Create blank table
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
    table.appendChild(cell); // cell.onclick=cell.classList.add("cell--selected");
  }

  startGame();
};

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

  selectedCell.innerHTML = numClicked.innerHTML; //Add number value to selectedCell.innerHTML to selected cell

  selectedCell.classList.remove("cell--selected"); //clear selection

  userEntries = userEntries.split('');
  userEntries[selectedCell.id] = numClicked.innerHTML; //add to useEntries array

  userEntries = userEntries.join(''); // userEntries[selectedCell.id]= numClicked.innerHTML;//add to useEntries array

  console.log(userEntries);
  console.log(selectedGame[0]);
  console.log(userEntries === selectedGame[0]); //check for game completion

  if (userEntries === selectedGame[0]) {
    console.log("Game completed!!");
  }
}

function startGame() {
  var cells = document.getElementsByClassName("cell");

  for (var i = 0; i < cells.length; i++) {
    var cellValue = easy[0].charAt(i);

    if (cellValue == "-") {
      cells[i].innerHTML = " ";
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

  userEntries = easy[0]; //initialize board
}

function reset() {
  startGame();
}
"use strict";

//load boards 
var easy = ["6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------", "685329174971485326234761859362574981549618732718293465823946517197852643456137298"];
var medium = ["--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--", "619472583243985617587316924158247369926531478734698152891754236365829741472163895"];
var hard = ["-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--", "712583694639714258845269173521436987367928415498175326184697532253841769976352841"]; //vars

var timer;
var selectedNum;
var selectedTile;
var disableSelect;
var cells; // loaded only once but cant declare it as global const as it is populated later????

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

  cells = document.querySelectorAll(".cell");
  console.log("cells.length", cells.length); // startGame();//call this when start button is clicked.
};

function handleCellClick() {
  //if it is already selected, deselect it
  // let clickedCell=document.getElementById(cellID);
  clickedCell = this;
  var selectedCell = document.querySelector(".cell.cell--selected");

  if (!selectedCell) {
    //if no cell is selected, select the curent one.
    // console.log("in !selectedCell");
    clickedCell.classList.add("cell--selected"); // console.log(clickedCell.classList);

    return;
  }

  console.log("clickedCell.id", clickedCell.id);
  console.log("selectedCell.id", selectedCell.id);
  selectedCell.classList.remove("cell--selected"); //clear selection  

  if (clickedCell.id != selectedCell.id) {
    //If there is a selected cell and some other cell is clicked. clear selection and select this cell.        
    clickedCell.classList.add("cell--selected");
  }
}

function startGame() {
  console.log("In startGame()"); // console.log(document.getElementsByClassName("cell"));

  var cells = document.getElementsByClassName("cell"); // console.log(cells[0]);
  // console.log(cells[80]);
  // console.log(cells.length);

  for (var i = 0; i < cells.length; i++) {
    // cells.forEach((cell,index) => {
    var cellValue = easy[0].charAt(i);

    if (cellValue == "-") {
      cellValue = " ";
    }

    cells[i].innerHTML = cellValue; // console.log(cell.innerHTML);    
  }
}

function id(id) {
  return document.getElementById(id);
}